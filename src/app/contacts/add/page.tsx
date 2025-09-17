'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AddContactPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const totalSteps = 3;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (stepNumber) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.positionTitle.trim()) newErrors.positionTitle = 'Position title is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      case 2:
        if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = 'Please enter a valid email address';
        }
        break;
      case 3:
        // No required fields in step 3
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          dateAdded: new Date().toISOString(),
          interviews: [],
          interactions: [],
          attachments: []
        })
      });

      if (response.ok) {
        router.push('/contacts');
      } else {
        throw new Error('Failed to create contact');
      }
    } catch (error) {
      console.error('Error creating contact:', error);
      alert('Failed to create contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <motion.div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              stepNum <= step
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 text-gray-300'
            }`}
            animate={{
              scale: stepNum === step ? 1.1 : 1,
              backgroundColor: stepNum <= step ? '#2563eb' : '#ffffff'
            }}
            transition={{ duration: 0.2 }}
          >
            {stepNum < step ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <span className="text-sm font-medium">{stepNum}</span>
            )}
          </motion.div>
          {stepNum < 3 && (
            <div className={`w-16 h-0.5 mx-2 ${stepNum < step ? 'bg-blue-600' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <BuildingOfficeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Company & Position Details</h2>
        <p className="text-gray-600 mt-2">Tell us about the opportunity you&apos;re pursuing</p>
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
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <UserPlusIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
        <p className="text-gray-600 mt-2">Add contact details and important links</p>
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
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <DocumentTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>
        <p className="text-gray-600 mt-2">Complete your contact record with extra information</p>
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900">Add New Job Contact</h1>
          <p className="text-gray-600 mt-2">
            Create a comprehensive record for your job application
          </p>
        </motion.div>

        {/* Form Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <form onSubmit={handleSubmit} className="p-8">
            {renderStepIndicator()}
            
            <div className="min-h-[500px]">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <div>
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    size="lg"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating...
                      </div>
                    ) : (
                      'Create Contact'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}