import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
    const jwt = request.cookies.get('jwt');
    
    console.log(jwt)
    console.log("middleware");
    const session = await auth();
    console.log(session);
    const path = request.nextUrl.pathname;

    if (path === '/dashboard') {
        return NextResponse.next();
    }

    if (!session) {
        console.log(`Redirecting unauthenticated user from ${path} to /login`);
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    

    if (session.user && !jwt?.value) {
        console.log("done")
        const username = session.user.name;
        const email = session.user.email;

        try {
            const apiUrl = "http://localhost:3000/api/signindj";
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    mode: 'google',
                }),
            });

            if (!response.ok) {
                console.error("Error in POST request:", response.statusText);
            }
        } catch (error) {
            console.error("Error in middleware POST request:", error);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/dashboard',
        '/problems',
        '/problem/[id]',
        '/',
    ],
    exclude: ['/api/:path*'], // Exclude API routes
};

