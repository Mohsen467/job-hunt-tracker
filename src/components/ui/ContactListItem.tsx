import Link from 'next/link';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { EyeIcon, PencilIcon, TrashIcon, BuildingOfficeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { JobContact } from '@/types';
import { motion } from 'framer-motion';
import React from 'react';
import './ContactListItem.css';

export function ContactListItem({ contact, onDelete }: { contact: JobContact; onDelete: (id: string) => void }) {
  const handleDelete = () => onDelete(contact.id);

  return (
    <motion.div className="contact-card" whileHover={{ scale: 1.02 }}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden h-full">
        <div className="p-6 flex flex-col h-full min-h-[260px]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {contact.companyName}
              </h3>
              <p className="text-gray-600 font-medium">{contact.positionTitle}</p>
              {contact.contactName && (
                <p className="text-sm text-gray-500 mt-1">Contact: {contact.contactName}</p>
              )}
            </div>
            <StatusBadge color={contact.status}>{contact.status}</StatusBadge>
          </div>
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
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{contact.interviews?.length || 0} interviews</span>
            <span>{contact.interactions?.length || 0} interactions</span>
          </div>
          <div className="mt-auto">
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
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 hover:border-red-200"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${getStatusProgress(contact.status)}%` }}
          />
        </div>
      </Card>
    </motion.div>
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
