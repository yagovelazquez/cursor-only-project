import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Fetch a specific item
export async function GET(request, { params }) {
  const { resource, id } = params;
  
  try {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${resource} ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update a specific item
export async function PUT(request, { params }) {
  const { resource, id } = params;
  const body = await request.json();
  
  try {
    const { data, error } = await supabase
      .from(resource)
      .update(body)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    if (data.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error(`Error updating ${resource} ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Remove a specific item
export async function DELETE(request, { params }) {
  const { resource, id } = params;
  
  try {
    const { error } = await supabase
      .from(resource)
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${resource} ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 