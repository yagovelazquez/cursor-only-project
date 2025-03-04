import React from 'react';

const ContactSupport: React.FC = () => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <p className="text-gray-600">
        Have any questions, feedback or need support? We&apos;d love to hear from you!
      </p>
      <button className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
        Contact us
      </button>
    </div>
  );
};

export default ContactSupport; 