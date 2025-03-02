import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface CreateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (keyData: { name: string; type: string; limit: number | null }) => void;
}

const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({ isOpen, onClose, onCreateKey }) => {
  const [newKeyName, setNewKeyName] = useState('');
  const [keyType, setKeyType] = useState('Development');
  const [hasLimit, setHasLimit] = useState(false);
  const [limit, setLimit] = useState('1000');

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    
    onCreateKey({
      name: newKeyName,
      type: keyType,
      limit: hasLimit ? parseInt(limit) : null
    });
    
    // Reset form
    setNewKeyName('');
    setKeyType('Development');
    setHasLimit(false);
    setLimit('1000');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900 mb-4">
                  Create a new API key
                </Dialog.Title>
                <p className="text-sm text-gray-600 mb-6">
                  Enter a name and limit for the new API key.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Name — <span className="text-gray-500">A unique name to identify this key</span>
                    </label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="Key Name"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Type — <span className="text-gray-500">Choose the environment for this key</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed">
                        <div className="w-8 h-8 flex items-center justify-center">
                          🚀
                        </div>
                        <div>
                          <div className="font-medium">Production</div>
                          <div className="text-sm text-gray-500">Rate limited to 1,000 requests/minute</div>
                        </div>
                      </div>
                      
                      <div 
                        className="flex items-center gap-4 p-4 rounded-lg border border-blue-500 bg-blue-50 cursor-pointer"
                        onClick={() => setKeyType('Development')}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          <code className="text-xl">&lt;/&gt;</code>
                        </div>
                        <div>
                          <div className="font-medium">Development</div>
                          <div className="text-sm text-gray-500">Rate limited to 100 requests/minute</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hasLimit}
                        onChange={(e) => setHasLimit(e.target.checked)}
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Limit monthly usage*</span>
                    </label>
                    {hasLimit && (
                      <input
                        type="number"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateApiKeyModal; 