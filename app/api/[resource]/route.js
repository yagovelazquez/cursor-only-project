import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Fetch all items from a table
export async function GET(request, { params }) {
  const { resource } = params;
  
  try {
    const { data, error } = await supabase
      .from(resource)
      .select('*');
      
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create a new item
export async function POST(request, { params }) {
  const { resource } = params;
  const body = await request.json();
  
  try {
    const { data, error } = await supabase
      .from(resource)
      .insert(body)
      .select();
      
    if (error) throw error;
    
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error(`Error creating ${resource}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 