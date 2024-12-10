import { NextResponse } from 'next/server';

const JSON_SERVER_URL = 'http://localhost:3000/users';

// Handle GET requests
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const _page = searchParams.get('_page') || '1';
        const _limit = searchParams.get('_limit') || '4';


        const response = await fetch(`${JSON_SERVER_URL}?_page=${_page}&_limit=${_limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const paginatedUsers = await response.json();
        return NextResponse.json(paginatedUsers);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json(
            { message: 'Failed to fetch users', error: (error as Error).message },
            { status: 500 }
        );
    }
}

// Handle POST requests
export async function POST(req: Request) {
    try {
        const newUser = await req.json();

        const response = await fetch(JSON_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const createdUser = await response.json();
        return NextResponse.json(createdUser, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { message: 'Failed to create user', error: (error as Error).message },
            { status: 500 }
        );
    }
}
