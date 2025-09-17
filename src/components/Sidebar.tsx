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
    <div className="flex flex-col w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">JT</span>
          </div>
          <h1 className="text-xl font-bold text-white">Job Tracker</h1>
        </div>
      </div>

      {/* Navigation */}
  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-2">
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
                  } group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    } mr-3 h-5 w-5 transition-colors duration-200`}
                    aria-hidden="true"
                  />
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 mt-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-200">Mohsen</p>
                <p className="text-xs text-gray-400">Game Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}