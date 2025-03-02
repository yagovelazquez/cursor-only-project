import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('validate-key route called');
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json({ valid: false, message: 'API key is required' }, { status: 400 });
    }
    console.log(apiKey)
    
    // Create a Supabase client

    
    // Query the database to check if the API key exists
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();
    console.log(data,error)
    
    if (error) {
      console.error('Error validating API key:', error);
      
      // Check if the error is because no rows were found (invalid API key)
      if (error.code === 'PGRST116') {
        return NextResponse.json({ valid: false, message: 'Invalid API key' }, { status: 401 });
      }
      
      // For other errors, return 500
      return NextResponse.json({ valid: false, message: 'Error validating API key' }, { status: 500 });
    }
    
    // If data exists, the API key is valid
    return NextResponse.json({ valid: !!data, message: data ? 'Valid API key' : 'Invalid API key' });
    
  } catch (error) {
    console.error('Error in validate-key route:', error);
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
  }
} 