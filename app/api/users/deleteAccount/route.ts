import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/config';
import User from '@/models/userModel';

connect();

export async function DELETE(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const deletedUser = await User.delete({
            where: {
                id: userId
            }
        });

        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const response = NextResponse.json(
            { message: `User ${userId} deleted successfully` }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            });

        return response
    } catch (error: any) {
        console.error('DELETE Error:', error);
        return NextResponse.json(
            { message: 'Failed to delete user', error: error.message || error },
            { status: 500 }
        );
    }
}
