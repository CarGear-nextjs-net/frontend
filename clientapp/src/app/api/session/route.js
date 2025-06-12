// app/api/session/route.js (hoặc route.ts)
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { token, userRole } = await request.json();

    const response = NextResponse.json({ success: true });

    // Set HttpOnly cookie for session token
    response.cookies.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });

    // Set user role cookie
    response.cookies.set('user_role', userRole, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ success: true, message: 'Logged out' });

    // Xóa session_token
    response.cookies.set('session_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,  // Đặt maxAge = 0 để cookie bị xóa
    });

    // Xóa user_role
    response.cookies.set('user_role', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,  // Đặt maxAge = 0 để cookie bị xóa
    });

    return response;
}