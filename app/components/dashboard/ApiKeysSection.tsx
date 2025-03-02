import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ApiKey } from '@/app/services/apiKeyService';
import ApiKeysTable from './ApiKeysTable';
import CreateApiKeyModal from './CreateApiKeyModal';
import EditApiKeyModal from './EditApiKeyModal';

interface ApiKeysSectionProps {
  apiKeys: ApiKey[];
  revealedKeys: Set<string>;
  maskApiKey: (key: string) => string;
  onToggleKeyVisibility: (keyId: string) => void;
  onCreateKey: (keyData: { name: string; type: string; limit: number | null }) => void;
  onUpdateKey: (id: string, keyData: { name: string; type: string; limit: number | null }) => void;
  onDeleteKey: (id: string) => void;
}

const ApiKeysSection: React.FC<ApiKeysSectionProps> = ({
  apiKeys,
  revealedKeys,
  maskApiKey,
  onToggleKeyVisibility,
  onCreateKey,
  onUpdateKey,
  onDeleteKey
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  const handleOpenEditModal = (key: ApiKey) => {
    setEditingKey(key);
    setIsEditModalOpen(true);
  };

  const handleUpdateKey = (id: string, keyData: { name: string; type: string; limit: number | null }) => {
    onUpdateKey(id, keyData);
    setIsEditModalOpen(false);
  };

  const handleCreateKey = (keyData: { name: string; type: string; limit: number | null }) => {
    onCreateKey(keyData);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
          title="Create new API key"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6">
          The key is used to authenticate your requests to the <a href="#" className="text-blue-600 hover:underline">Research API</a>. 
          To learn more, see the <a href="#" className="text-blue-600 hover:underline">documentation</a> page.
        </p>

        <ApiKeysTable
          apiKeys={apiKeys}
          revealedKeys={revealedKeys}
          maskApiKey={maskApiKey}
          onToggleKeyVisibility={onToggleKeyVisibility}
          onEditKey={handleOpenEditModal}
          onDeleteKey={onDeleteKey}
        />
      </div>

      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateKey={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        apiKey={editingKey}
        onUpdateKey={handleUpdateKey}
      />
    </div>
  );
};

export default ApiKeysSection; 