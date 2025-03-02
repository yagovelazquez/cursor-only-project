import React from 'react';
import { ClipboardIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { ApiKey } from '@/app/services/apiKeyService';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  revealedKeys: Set<string>;
  maskApiKey: (key: string) => string;
  onToggleKeyVisibility: (keyId: string) => void;
  onEditKey: (key: ApiKey) => void;
  onDeleteKey: (id: string) => void;
}

const ApiKeysTable: React.FC<ApiKeysTableProps> = ({
  apiKeys,
  revealedKeys,
  maskApiKey,
  onToggleKeyVisibility,
  onEditKey,
  onDeleteKey
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-500 text-sm border-b">
          <th className="pb-4 font-medium">NAME</th>
          <th className="pb-4 font-medium">TYPE</th>
          <th className="pb-4 font-medium">USAGE</th>
          <th className="pb-4 font-medium">KEY</th>
          <th className="pb-4 font-medium text-right">OPTIONS</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {apiKeys.map((key) => (
          <tr key={key.id} className="text-sm">
            <td className="py-4">{key.name}</td>
            <td className="py-4">
              <span className="px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                {key.type}
              </span>
            </td>
            <td className="py-4">{key.usage}</td>
            <td className="py-4 font-mono text-gray-600">
              {revealedKeys.has(key.id) ? key.key : maskApiKey(key.key)}
            </td>
            <td className="py-4">
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => onToggleKeyVisibility(key.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title={revealedKeys.has(key.id) ? "Hide key" : "Show key"}
                >
                  {revealedKeys.has(key.id) ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(key.key);
                    toast.success('API key copied to clipboard');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Copy to clipboard"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEditKey(key)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Edit key"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteKey(key.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Delete key"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApiKeysTable; 