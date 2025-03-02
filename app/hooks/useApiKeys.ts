import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import createApiKeyService, { ApiKey, ApiKeyCreateData, ApiKeyUpdateData } from '@/app/services/apiKeyService';
import { useSupabase } from '@/lib/supabase/client';

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  
  // Get the Supabase client
  const supabase = useSupabase();
  
  // Create the API key service with the Supabase client
  const apiKeyService = createApiKeyService(supabase);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (keyData: ApiKeyCreateData) => {
    try {
      const newKey = await apiKeyService.createApiKey(keyData);
      if (newKey) {
        setApiKeys([...apiKeys, newKey]);
        toast.success('API key created successfully');
        return newKey;
      }
    } catch (error) {
      console.error('Error creating API key:', error);
      toast.error('Failed to create API key');
      return null;
    }
  };

  const updateApiKey = async (id: string, keyData: ApiKeyUpdateData) => {
    try {
      const updatedKey = await apiKeyService.updateApiKey(id, keyData);
      if (updatedKey) {
        setApiKeys(apiKeys.map(key => key.id === id ? updatedKey : key));
        toast.success('API key updated successfully');
        return updatedKey;
      }
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error('Failed to update API key');
      return null;
    }
  };

  const deleteApiKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return false;

    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.success('API key deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key');
      return false;
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setRevealedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskApiKey = (key: string) => {
    const prefix = "yago_dev_";
    if (!key.startsWith(prefix)) {
      return '•'.repeat(key.length); // Mask entire key if prefix not found
    }
    const randomPart = key.slice(prefix.length);
    return `${prefix}${'•'.repeat(randomPart.length)}`;
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    apiKeys,
    loading,
    revealedKeys,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyVisibility,
    maskApiKey
  };
} 