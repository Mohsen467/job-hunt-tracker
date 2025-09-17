// Core data types for the Job Hunt Progress Tracker

export interface JobContact {
  id: string;
  companyName: string;
  positionTitle: string;
  department?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  companyWebsite?: string;
  jobPostingUrl?: string;
  salaryRange?: string;
  location: string;
  workType: WorkType;
  applicationDeadline?: string;
  dateAdded: string;
  status: JobStatus;
  priority: Priority;
  notes?: string;
  
  // Related data
  interviews?: Interview[];
  interactions?: Interaction[];
  attachments?: Attachment[];
}

export interface Interview {
  id: string;
  round: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  scheduledDate: string;
  interviewerName?: string;
  interviewerTitle?: string;
  notes?: string;
  feedback?: string;
}

export interface Interaction {
  id: string;
  date: string;
  type: string;
  notes: string;
}

export interface Attachment {
  id: string;
  contactId: string;
  name: string;
  type: AttachmentType;
  url?: string;
  notes?: string;
  createdAt: string;
}

// Enums and types
export type ContactMethod = 
  | 'LinkedIn' 
  | 'Email' 
  | 'Referral' 
  | 'Job Board' 
  | 'Direct' 
  | 'Other';

export type WorkType = 
  | 'Remote' 
  | 'Hybrid' 
  | 'On-site' 
  | 'Negotiable';

export type JobStatus = 
  | 'To Contact'
  | 'Contacted'
  | 'Interview Scheduled'
  | 'Interviewed'
  | 'Follow-up Needed'
  | 'Offer Received'
  | 'Offer Accepted'
  | 'Rejected'
  | 'Archived';

export type Priority = 'High' | 'Medium' | 'Low';

export type InterviewType = 
  | 'Phone Screen' 
  | 'Technical' 
  | 'Behavioral' 
  | 'Final' 
  | 'Panel' 
  | 'Culture Fit'
  | 'Portfolio Review'
  | 'Other';

export type InterviewStatus = 
  | 'Scheduled' 
  | 'Completed' 
  | 'Cancelled' 
  | 'Rescheduled'
  | 'No Show';

export type InteractionType = 
  | 'Initial Contact' 
  | 'Follow-up' 
  | 'Interview' 
  | 'Email' 
  | 'Call' 
  | 'Meeting'
  | 'Application Submitted'
  | 'Rejection'
  | 'Offer';

export type AttachmentType = 
  | 'CV' 
  | 'Cover Letter' 
  | 'Portfolio' 
  | 'Certificate'
  | 'Other';

// Database structure
export interface JobDatabase {
  contacts: JobContact[];
  lastUpdated: string;
  version: string;
}

// Form and API types
export type CreateJobContactDto = Omit<JobContact, 'id' | 'createdAt' | 'updatedAt' | 'interviews' | 'interactions' | 'attachments'>;
export type UpdateJobContactDto = Partial<CreateJobContactDto> & { id: string };

export type CreateInterviewDto = Omit<Interview, 'id' | 'createdAt'>;
export type UpdateInterviewDto = Partial<CreateInterviewDto> & { id: string };

export type CreateInteractionDto = Omit<Interaction, 'id' | 'createdAt'>;

// Filter and search types
export interface ContactFilters {
  status?: JobStatus[];
  priority?: Priority[];
  workType?: WorkType[];
  contactMethod?: ContactMethod[];
  hasUpcomingFollowUp?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchOptions {
  query?: string;
  filters?: ContactFilters;
  sortBy?: keyof JobContact;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Analytics types
export interface JobSearchAnalytics {
  totalContacts: number;
  contactsByStatus: Record<JobStatus, number>;
  contactsByPriority: Record<Priority, number>;
  averageResponseTime: number;
  upcomingFollowUps: number;
  interviewsThisWeek: number;
  recentActivity: {
    date: string;
    count: number;
  }[];
}