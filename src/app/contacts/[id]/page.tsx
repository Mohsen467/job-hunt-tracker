'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  LinkIcon,
  EnvelopeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { JobContact } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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

//

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [contact, setContact] = useState<JobContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'interactions' | 'attachments'>('overview');

  useEffect(() => {
    const run = async () => {
      if (!params?.id) return;
      try {
        const response = await fetch(`/api/contacts/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setContact(data.contact);
        } else {
          throw new Error('Contact not found');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
        router.push('/contacts');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [params?.id, router]);

  const handleDelete = async () => {
    if (!contact || !confirm('Are you sure you want to delete this contact?')) return;

    try {
      await fetch(`/api/contacts/${contact.id}`, { method: 'DELETE' });
      router.push('/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer Accepted':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Follow-up Needed':
        return <ExclamationCircleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'interview': return 'bg-yellow-400';
      case 'application': return 'bg-blue-400';
      case 'follow-up': return 'bg-orange-400';
      case 'offer': return 'bg-green-400';
      case 'rejection': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-64 mb-6"></div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Contact not found</h3>
            <Link href="/contacts">
              <Button>Back to Contacts</Button>
            </Link>
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
          <Link href="/contacts" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Contacts
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{contact.companyName}</h1>
                <p className="text-xl text-gray-600 mt-1">{contact.positionTitle}</p>
                <div className="flex items-center gap-4 mt-2">
                  {getStatusIcon(contact.status)}
                  <Badge color={statusColors[contact.status as keyof typeof statusColors]}>
                    {contact.status}
                  </Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">Added {formatDate(contact.dateAdded)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href={`/contacts/${contact.id}/edit`}>
                <Button variant="outline">
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 hover:border-red-200"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BuildingOfficeIcon },
                { id: 'interviews', name: 'Interviews', icon: CalendarDaysIcon },
                { id: 'interactions', name: 'Interactions', icon: ChatBubbleLeftRightIcon },
                { id: 'attachments', name: 'Attachments', icon: DocumentArrowDownIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'interviews' | 'interactions')}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">{contact.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-gray-900">{contact.department || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Salary Range</p>
                        <p className="text-gray-900">{contact.salaryRange || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Work Type</p>
                        <p className="text-gray-900">{contact.workType || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {contact.notes && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-gray-600 whitespace-pre-wrap">{contact.notes}</p>
                    </div>
                  )}
                </Card>

                {/* Links */}
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
                  <div className="space-y-3">
                    {contact.companyWebsite && (
                      <a
                        href={contact.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-blue-600 hover:text-blue-800"
                      >
                        <LinkIcon className="h-5 w-5" />
                        Company Website
                      </a>
                    )}
                    {contact.jobPostingUrl && (
                      <a
                        href={contact.jobPostingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-blue-600 hover:text-blue-800"
                      >
                        <LinkIcon className="h-5 w-5" />
                        Job Posting
                      </a>
                    )}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {contact.contactName && (
                      <div className="flex items-center gap-3">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Contact Person</p>
                          <p className="text-gray-900">{contact.contactName}</p>
                        </div>
                      </div>
                    )}
                    
                    {contact.contactEmail && (
                      <div className="flex items-center gap-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a
                            href={`mailto:${contact.contactEmail}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {contact.contactEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    {contact.contactPhone && (
                      <div className="flex items-center gap-3">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <a
                            href={`tel:${contact.contactPhone}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {contact.contactPhone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Interviews</span>
                      <span className="font-semibold text-gray-900">
                        {contact.interviews?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Interactions</span>
                      <span className="font-semibold text-gray-900">
                        {contact.interactions?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Attachments</span>
                      <span className="font-semibold text-gray-900">
                        {contact.attachments?.length || 0}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Interview History</h3>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Interview
                </Button>
              </div>
              
              {contact.interviews && contact.interviews.length > 0 ? (
                <div className="space-y-4">
                  {contact.interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {interview.round} Interview
                        </h4>
                        <Badge color={interview.status === 'Completed' ? 'green' : 'yellow'}>
                          {interview.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(interview.scheduledDate)}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {interview.type}
                        </div>
                        <div>
                          <span className="font-medium">Interviewer:</span> {interview.interviewerName || 'TBD'}
                        </div>
                      </div>
                      {interview.notes && (
                        <p className="mt-2 text-gray-600 text-sm">{interview.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarDaysIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
                  <p className="text-gray-600 mb-4">
                    Keep track of your interview rounds and feedback here.
                  </p>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Schedule First Interview
                  </Button>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'interactions' && (
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Interaction Timeline</h3>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Interaction
                </Button>
              </div>
              
              {contact.interactions && contact.interactions.length > 0 ? (
                <div className="space-y-4">
                  {contact.interactions.map((interaction, index) => (
                    <div
                      key={interaction.id}
                      className="flex gap-4 relative"
                    >
                      {index < contact.interactions!.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        getTimelineColor(interaction.type.toLowerCase())
                      }`}>
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{interaction.type}</h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(interaction.date)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{interaction.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No interactions yet</h3>
                  <p className="text-gray-600 mb-4">
                    Track all your communications and activities for this opportunity.
                  </p>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add First Interaction
                  </Button>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'attachments' && (
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
              
              <div className="text-center py-8">
                <DocumentArrowDownIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No attachments yet</h3>
                <p className="text-gray-600 mb-4">
                  Upload resumes, cover letters, and other relevant documents.
                </p>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload First File
                </Button>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}