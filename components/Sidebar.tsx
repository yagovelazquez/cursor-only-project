'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

export default function Sidebar({ user = { name: 'Yago Velazquez' } }: SidebarProps) {
  const pathname = usePathname();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { name: 'Overview', href: '/dashboards', icon: HomeIcon },
    { 
      name: 'My Account', 
      href: '/account', 
      icon: UserIcon,
      hasDropdown: true,
      isOpen: isAccountOpen,
      toggle: () => setIsAccountOpen(!isAccountOpen),
      subItems: [
        { name: 'Profile', href: '/account/profile' },
        { name: 'Billing', href: '/account/billing' },
        { name: 'API Keys', href: '/account/api-keys' },
      ]
    },
    { name: 'Research Assistant', href: '/assistant', icon: BeakerIcon },
    { name: 'Research Reports', href: '/reports', icon: DocumentTextIcon },
    { name: 'API Playground', href: '/playground', icon: CodeBracketIcon },
    { 
      name: 'Documentation', 
      href: 'https://docs.example.com', 
      icon: DocumentIcon,
      isExternal: true 
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <path d="M12 6L7 12H11L10 18L15 12H11L12 6Z" fill="#4F46E5" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6L7 12H11L10 18L15 12H11L12 6Z" fill="url(#paint0_linear)" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="7" y1="6" x2="15" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5"/>
                  <stop offset="0.5" stopColor="#E11D48"/>
                  <stop offset="1" stopColor="#FBBF24"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="7" y1="6" x2="15" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5"/>
                  <stop offset="0.5" stopColor="#E11D48"/>
                  <stop offset="1" stopColor="#FBBF24"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800">App Cursor</span>
        </Link>
      </div>

      {/* Account Selector */}
      <div className="p-4 border-b border-gray-100">
        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-700">Personal</span>
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === item.href 
                    ? 'text-blue-600 bg-blue-50 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                onClick={item.toggle ? (e) => {
                  e.preventDefault();
                  item.toggle?.();
                } : undefined}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.isExternal && (
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-auto" />
                )}
                {item.hasDropdown && (
                  <ChevronDownIcon 
                    className={`h-4 w-4 ml-auto transition-transform ${
                      item.isOpen ? 'transform rotate-180' : ''
                    }`} 
                  />
                )}
              </Link>
              
              {/* Dropdown items */}
              {item.hasDropdown && item.isOpen && (
                <ul className="mt-1 ml-8 space-y-1">
                  {item.subItems?.map((subItem) => (
                    <li key={subItem.name}>
                      <Link 
                        href={subItem.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          pathname === subItem.href 
                            ? 'text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={32} 
                height={32} 
                className="rounded-full"
              />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user.name}
            </p>
          </div>
          <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 