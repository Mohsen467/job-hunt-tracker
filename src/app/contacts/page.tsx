'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { JobContact } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';

const statusColors = {
  'To Contact': 'gray',
  'Contacted': 'blue',
  'Interview Scheduled': 'yellow',
  'Interviewed': 'purple',
  'Follow-up Needed': 'orange',
  'Offer Received': 'green',
  'Offer Accepted': 'emerald',
  'Rejected': 'red',
  'Archived': 'slate'
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<JobContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<JobContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'position'>('date');

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

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'company':
          return a.companyName.localeCompare(b.companyName);
        case 'position':
          return a.positionTitle.localeCompare(b.positionTitle);
        case 'date':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterAndSortContacts();
  }, [filterAndSortContacts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || 'gray';
  };

  const getNextAction = (contact: JobContact) => {
    switch (contact.status) {
      case 'To Contact':
        return 'Send initial contact';
      case 'Contacted':
        return 'Wait for response';
      case 'Interview Scheduled':
        return 'Prepare for interview';
      case 'Interviewed':
        return 'Send thank you note';
      case 'Follow-up Needed':
        return 'Follow up with contact';
      default:
        return 'No action needed';
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
                Job Contacts
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your job applications and track progress
              </p>
            </div>
            <Link href="/contacts/add">
              <Button size="lg" className="shadow-lg">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Contact
              </Button>
            </Link>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {Object.keys(statusColors).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'company' | 'position')}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="company">Sort by Company</option>
                <option value="position">Sort by Position</option>
              </select>

              <div className="flex items-center text-sm text-gray-500">
                <FunnelIcon className="h-4 w-4 mr-2" />
                {filteredContacts.length} of {contacts.length} contacts
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contacts Grid */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredContacts.map((contact) => (
              <motion.div key={contact.id} variants={itemVariants} layout>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                          {contact.companyName}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {contact.positionTitle}
                        </p>
                        {contact.contactName && (
                          <p className="text-sm text-gray-500 mt-1">
                            Contact: {contact.contactName}
                          </p>
                        )}
                      </div>
                      <StatusBadge color={getStatusBadgeColor(contact.status)}>
                        {contact.status}
                      </StatusBadge>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                        {contact.department || 'N/A'}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        {new Date(contact.dateAdded).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Next Action */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Next Action:
                      </p>
                      <p className="text-sm text-blue-600">
                        {getNextAction(contact)}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>
                        {contact.interviews?.length || 0} interviews
                      </span>
                      <span>
                        {contact.interactions?.length || 0} interactions
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link href={`/contacts/${contact.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/contacts/${contact.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:bg-red-50 hover:border-red-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 bg-gray-100">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                      style={{
                        width: `${getStatusProgress(contact.status)}%`
                      }}
                    />
                  </div>
                </Card>
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
}

function getStatusProgress(status: string): number {
  const progressMap = {
    'To Contact': 10,
    'Contacted': 25,
    'Interview Scheduled': 50,
    'Interviewed': 70,
    'Follow-up Needed': 60,
    'Offer Received': 90,
    'Offer Accepted': 100,
    'Rejected': 0,
    'Archived': 0
  };
  return progressMap[status as keyof typeof progressMap] || 0;
}