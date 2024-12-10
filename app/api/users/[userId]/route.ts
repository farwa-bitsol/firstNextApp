import { NextResponse } from 'next/server';

const JSON_SERVER_URL = 'http://localhost:3000/users';

// Handle DELETE requests
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'Invalid user ID' },
                { status: 400 }
            );
        }

        const deleteResponse = await fetch(`${JSON_SERVER_URL}/${id}`, { method: 'DELETE' });

        if (!deleteResponse.ok) {
            throw new Error(`Failed to delete user with ID ${id}`);
        }

        return NextResponse.json({ message: `User ${id} deleted successfully` });
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json(
            { message: 'Failed to delete user', error: (error as Error).message },
            { status: 500 }
        );
    }
}
