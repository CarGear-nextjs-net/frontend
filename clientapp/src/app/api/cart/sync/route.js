import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('userID');
  if (!userID) return NextResponse.json({ error: 'Missing userID' }, { status: 400 });

  // Gọi về BE gốc
  const beRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/cart/${userID}`);
  let data = { cart: [] };
  if (beRes.ok) {
    const text = await beRes.text();
    try {
      data = text ? JSON.parse(text) : { cart: [] };
    } catch (e) {
      data = { cart: [] };
    }
  } else {
    data = { cart: [] };
  }
  
  // Lưu vào cookie FE
  const response = NextResponse.json({ cart: data || [] });

  response.cookies.set(`cart_${userID}`, JSON.stringify(data || []), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
} 