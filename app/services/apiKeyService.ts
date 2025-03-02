export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  type: string;
  usage: string;
  limit: number | null;
}

export interface ApiKeyCreateData {
  name: string;
  type: string;
  limit: number | null;
}

export interface ApiKeyUpdateData {
  name: string;
  type: string;
  limit: number | null;
}

// We'll create a service factory that takes the supabase client as an argument
const createApiKeyService = (supabase: any) => ({
  async fetchApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*');
    
    if (error) throw error;
    
    return data || [];
  },

  async createApiKey(keyData: ApiKeyCreateData) {
    // Generate a random string of 10 characters
    const randomChars = Array.from(crypto.getRandomValues(new Uint8Array(10)))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 10);
    
    // Add the prefix to the random characters
    const apiKey = `yago_dev_${randomChars}`;
    
    const newKeyData = {
      ...keyData,
      key: apiKey,
      usage: '0',
    };
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKeyData])
      .select();
    
    if (error) throw error;
    
    return data?.[0];
  },

  async updateApiKey(id: string, keyData: ApiKeyUpdateData) {
    const { data, error } = await supabase
      .from('api_keys')
      .update(keyData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    return data?.[0];
  },

  async deleteApiKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return true;
  }
});

export default createApiKeyService; 