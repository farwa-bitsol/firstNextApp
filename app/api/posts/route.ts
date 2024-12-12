import { NextResponse } from 'next/server';

const JSON_SERVER_URL = 'http://localhost:3000/postData';

export async function GET(req: Request) {
    try {
        const response = await fetch(`${JSON_SERVER_URL}`);

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const paginatedUsers = await response.json();
        return NextResponse.json(paginatedUsers);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json(
            { message: 'Failed to fetch posts', error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const newPost = await req.json();

        const response = await fetch(JSON_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const createdPost = await response.json();
        return NextResponse.json(createdPost, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { message: 'Failed to create post', error: (error as Error).message },
            { status: 500 }
        );
    }
}