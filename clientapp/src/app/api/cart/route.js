import { NextResponse } from 'next/server';

export async function GET(request) {
    // Parse userID from query params
    const { searchParams } = new URL(request.url);

    const userID = searchParams.get('userID');

    // Get cookies from request
    const cartCookie = request.cookies.get(`cart_${userID}`);
    let cart = [];
    if (cartCookie) {
        try {
            cart = JSON.parse(cartCookie.value);
        } catch (e) {
            cart = [];
        }
    }

    return NextResponse.json({ cart });
} 