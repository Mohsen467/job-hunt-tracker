'use client';

import { motion } from 'framer-motion';
import { BellIcon, Cog6ToothIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from './ui/Button';

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onOpenSidebar}
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back, Mohsen! 👋
              </h2>
              <p className="text-sm text-gray-500 hidden sm:block">
                Let&apos;s find your next amazing opportunity in game development
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Quick stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>0 Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span>0 Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>0 Interviews</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Cog6ToothIcon className="h-5 w-5" />
              </Button>

              {/* Profile */}
              <div className="flex items-center ml-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}