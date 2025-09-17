'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  UserPlusIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

const workTypes = ['Remote', 'Hybrid', 'On-site'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = [
  'To Contact',
  'Contacted', 
  'Interview Scheduled',
  'Interviewed',
  'Follow-up Needed',
  'Offer Received',
  'Offer Accepted',
  'Rejected',
  'Archived'
];

interface FormData {
  companyName: string;
  positionTitle: string;
  department: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyWebsite: string;
  jobPostingUrl: string;
  location: string;
  workType: string;
  salaryRange: string;
  priority: string;
  status: string;
  applicationDeadline: string;
  notes: string;
}

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    positionTitle: '',
    department: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    jobPostingUrl: '',
    location: '',
    workType: 'Remote',
    salaryRange: '',
    priority: 'Medium',
    status: 'To Contact',
    applicationDeadline: '',
    notes: ''
  });

  useEffect(() => {
    const run = async () => {
      if (!params?.id) return;
      try {
        const response = await fetch(`/api/contacts/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          const contact = data.contact;
          setFormData({
            companyName: contact.companyName || '',
            positionTitle: contact.positionTitle || '',
            department: contact.department || '',
            contactName: contact.contactName || '',
            contactEmail: contact.contactEmail || '',
            contactPhone: contact.contactPhone || '',
            companyWebsite: contact.companyWebsite || '',
            jobPostingUrl: contact.jobPostingUrl || '',
            location: contact.location || '',
            workType: contact.workType || 'Remote',
            salaryRange: contact.salaryRange || '',
            priority: contact.priority || 'Medium',
            status: contact.status || 'To Contact',
            applicationDeadline: contact.applicationDeadline || '',
            notes: contact.notes || ''
          });
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

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.positionTitle.trim()) newErrors.positionTitle = 'Position title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/contacts/${params?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push(`/contacts/${params?.id}`);
      } else {
        throw new Error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-64 mb-6"></div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href={`/contacts/${params?.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Contact
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <UserPlusIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Contact</h1>
              <p className="text-gray-600 mt-2">
                Update your contact information and job details
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Company & Position Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Company & Position Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        value={formData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                        placeholder="e.g. Epic Games"
                        className={`pl-10 ${errors.companyName ? 'border-red-300' : ''}`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position Title *
                    </label>
                    <div className="relative">
                      <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        value={formData.positionTitle}
                        onChange={(e) => updateField('positionTitle', e.target.value)}
                        placeholder="e.g. Senior Unreal Engine Developer"
                        className={`pl-10 ${errors.positionTitle ? 'border-red-300' : ''}`}
                      />
                    </div>
                    {errors.positionTitle && (
                      <p className="mt-1 text-sm text-red-600">{errors.positionTitle}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <Input
                      value={formData.department}
                      onChange={(e) => updateField('department', e.target.value)}
                      placeholder="e.g. Engineering, Game Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        placeholder="e.g. Los Angeles, CA"
                        className={`pl-10 ${errors.location ? 'border-red-300' : ''}`}
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Type
                    </label>
                    <select
                      value={formData.workType}
                      onChange={(e) => updateField('workType', e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {workTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => updateField('priority', e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <UserPlusIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <Input
                      value={formData.contactName}
                      onChange={(e) => updateField('contactName', e.target.value)}
                      placeholder="e.g. Sarah Johnson"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => updateField('contactEmail', e.target.value)}
                        placeholder="e.g. sarah.johnson@company.com"
                        className={`pl-10 ${errors.contactEmail ? 'border-red-300' : ''}`}
                      />
                    </div>
                    {errors.contactEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => updateField('contactPhone', e.target.value)}
                        placeholder="e.g. (555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="url"
                        value={formData.companyWebsite}
                        onChange={(e) => updateField('companyWebsite', e.target.value)}
                        placeholder="e.g. https://company.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Posting URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="url"
                        value={formData.jobPostingUrl}
                        onChange={(e) => updateField('jobPostingUrl', e.target.value)}
                        placeholder="e.g. https://careers.company.com/jobs/123"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        value={formData.salaryRange}
                        onChange={(e) => updateField('salaryRange', e.target.value)}
                        placeholder="e.g. $120k - $150k"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => updateField('applicationDeadline', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      rows={4}
                      placeholder="Add any additional notes, requirements, or thoughts about this opportunity..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <Link href={`/contacts/${params?.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Updating...
                  </div>
                ) : (
                  <>
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Update Contact
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}