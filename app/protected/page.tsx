'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';

// Function to validate API key with our backend
const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });
    
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};

export default function ProtectedPage() {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    
    const checkApiKey = async () => {
      const apiKey = sessionStorage.getItem('tempApiKey');
      
      if (!apiKey) {
        if (isMounted) {
          toast.error('No API key found. Please enter your API key first.');
          router.push('/playground');
        }
        return;
      }
      
      try {
        const isValid = await validateApiKey(apiKey);
        
        if (!isMounted) return;
        
        if (isValid) {
          toast.success('Valid API key! Welcome to the protected area.');
          setIsValid(true);
        } else {
          toast.error('Invalid API key. Please try again with a valid key.');
          router.push('/playground');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error validating API key:', error);
          toast.error('Error validating API key. Please try again.');
          router.push('/playground');
        }
      } finally {
        if (isMounted) {
          setIsValidating(false);
        }
      }
    };
    
    checkApiKey();
    
    // Cleanup function to prevent state updates and toasts after unmounting
    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {isValidating ? (
          <div className="container mx-auto max-w-2xl py-12 px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Validating API Key...</h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        ) : isValid ? (
          <div className="container mx-auto max-w-2xl py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Protected Playground</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to the API Playground</h2>
              <p className="text-gray-600 mb-6">
                You now have access to the protected playground environment.
                Here you can test API endpoints and explore the available features.
              </p>
              
              {/* Add your playground content here */}
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  This is where your API playground interface would go.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
} 