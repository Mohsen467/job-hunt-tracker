'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UsersIcon, 
  PlusIcon, 
  BriefcaseIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'All Contacts', href: '/contacts', icon: UsersIcon },
  { name: 'Add Contact', href: '/contacts/new', icon: PlusIcon },
  { name: 'Interviews', href: '/interviews', icon: BriefcaseIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-full bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">JT</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
        </div>
      </div>

      {/* Navigation */}
  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    } mr-3 h-5 w-5 transition-colors`}
                    aria-hidden="true"
                  />
                  {item.name}
                  {isActive && <span className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 mt-6">
          <div className="rounded-lg p-4 border border-blue-100 bg-blue-50">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Mohsen</p>
                <p className="text-xs text-gray-600">Game Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}