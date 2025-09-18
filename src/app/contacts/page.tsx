"use client";
import { JobContact } from '@/types';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Listbox } from '@headlessui/react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { ContactListItem } from '@/components/ui/ContactListItem';

const statusColors = {
  'To Contact': 'blue',
  'Contacted': 'yellow',
  'Interview Scheduled': 'purple',
  'Interviewed': 'indigo',
  'Follow-up Needed': 'orange',
  'Offer Received': 'green',
  'Offer Accepted': 'emerald',
  'Rejected': 'red',
  'Archived': 'slate',
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Redesigning the contacts list page
// Adding filters, search functionality, and list/grid card layouts

const ContactsListPage = () => {
  const [contacts, setContacts] = useState<JobContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<JobContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    ...Object.keys(statusColors).map((status) => ({ value: status, label: status }))
  ];
  // const [sortBy, setSortBy] = useState<'date' | 'company' | 'position'>('date');

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortContacts = useCallback(() => {
    const filtered = contacts.filter(contact => {
      const matchesSearch = 
        contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter]);

  useEffect(() => { fetchContacts(); }, []);
  useEffect(() => { filterAndSortContacts(); }, [filterAndSortContacts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // const getStatusBadgeColor = (status: string) => statusColors[status as keyof typeof statusColors] || 'gray';
  // const getNextAction = (contact: JobContact) => {
  //   switch (contact.status) {
  //     case 'To Contact': return 'Send initial contact';
  //     case 'Contacted': return 'Wait for response';
  //     case 'Interview Scheduled': return 'Prepare for interview';
  //     case 'Interviewed': return 'Send thank you note';
  //     case 'Follow-up Needed': return 'Follow up with contact';
  //     default: return 'No action needed';
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg z-20 lg:sticky lg:top-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-20">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Listbox value={statusFilter} onChange={setStatusFilter}>
              <div className="relative z-30">
                <Listbox.Button className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                  {statusOptions.find((o) => o.value === statusFilter)?.label}
                </Listbox.Button>
                <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {statusOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </Card>

        {/* Contacts Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredContacts.map((contact) => (
              <motion.div key={contact.id} variants={itemVariants} layout>
                <ContactListItem
                  contact={contact}
                  onDelete={() => handleDelete(contact.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredContacts.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EmptyState
              title={contacts.length === 0 ? 'No contacts yet' : 'No contacts found'}
              description={
                contacts.length === 0
                  ? 'Start tracking your job applications by adding your first contact.'
                  : 'Try adjusting your search or filter criteria.'
              }
              actionHref={contacts.length === 0 ? '/contacts/add' : undefined}
              actionLabel={contacts.length === 0 ? 'Add Your First Contact' : undefined}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactsListPage;

// function getStatusProgress(status: string): number {
//   const progressMap = {
//     'To Contact': 10,
//     'Contacted': 25,
//     'Interview Scheduled': 50,
//     'Interviewed': 70,
//     'Follow-up Needed': 60,
//     'Offer Received': 90,
//     'Offer Accepted': 100,
//     'Rejected': 0,
//     'Archived': 0
//   };
//   return progressMap[status as keyof typeof progressMap] || 0;
// }
