// Core data types for the Job Hunt Progress Tracker

export interface JobContact {
  id: string;
  companyName: string;
  contactPerson?: string;
  contactEmail?: string;
  contactMethod: ContactMethod;
  position: string;
  jobPostingUrl?: string;
  salaryRange?: string;
  location: string;
  workType: WorkType;
  applicationDeadline?: string;
  dateContacted: string;
  lastContactDate: string;
  status: JobStatus;
  followUpDate?: string;
  priority: Priority;
  notes: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Related data
  interviews: Interview[];
  interactions: Interaction[];
  attachments: Attachment[];
}

export interface Interview {
  id: string;
  contactId: string;
  type: InterviewType;
  scheduledDate: string;
  duration?: number; // minutes
  interviewers: string[];
  status: InterviewStatus;
  notes: string;
  feedback?: string;
  nextSteps?: string;
  createdAt: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  date: string;
  type: InteractionType;
  description: string;
  outcome?: string;
  nextAction?: string;
  createdAt: string;
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
  | 'Application Sent' 
  | 'Waiting Reply'
  | 'Phone Screen Scheduled'
  | 'Phone Screen Completed'
  | 'Interview Scheduled'
  | 'Interview Completed'
  | 'Final Interview'
  | 'Offer Received'
  | 'Offer Negotiating'
  | 'Offer Accepted'
  | 'Rejected'
  | 'Withdrawn'
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