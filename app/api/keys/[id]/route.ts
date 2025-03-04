import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Your get logic here
  
  return NextResponse.json({ id });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Your delete logic here
  
  return NextResponse.json({ success: true });
} 