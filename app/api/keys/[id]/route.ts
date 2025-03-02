import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Implement deleting the key from your database
  return NextResponse.json({ success: true });
} 