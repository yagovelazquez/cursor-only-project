import { NextResponse } from 'next/server';

export async function GET() {
  // Implement fetching keys from your database
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  const body = await request.json();
  // Implement creating a new key in your database
  const newKey = {
    id: Math.random().toString(36).slice(2, 11),
    name: body.name,
    key: `sk_${Math.random().toString(36).slice(2, 34)}`,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json(newKey);
}
