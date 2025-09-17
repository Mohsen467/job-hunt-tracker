'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 px-4 pb-4">
              <Sidebar />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop layout */}
      <div className="flex">
        <div className="hidden lg:block lg:shrink-0">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>

        <div className="flex-1 flex min-w-0 flex-col">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
