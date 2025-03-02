'use client';

import React from 'react';
import useApiKeys from '@/app/hooks/useApiKeys';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';
import CurrentPlanCard from '@/app/components/dashboard/CurrentPlanCard';
import ApiKeysSection from '@/app/components/dashboard/ApiKeysSection';
import ContactSupport from '@/app/components/dashboard/ContactSupport';

export default function DashboardPage() {
  const {
    apiKeys,
    loading,
    revealedKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    toggleKeyVisibility,
    maskApiKey
  } = useApiKeys();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader />
        <CurrentPlanCard />
        
        <ApiKeysSection
          apiKeys={apiKeys}
          revealedKeys={revealedKeys}
          maskApiKey={maskApiKey}
          onToggleKeyVisibility={toggleKeyVisibility}
          onCreateKey={createApiKey}
          onUpdateKey={updateApiKey}
          onDeleteKey={deleteApiKey}
        />
        
        <ContactSupport />
      </div>
    </div>
  );
} 