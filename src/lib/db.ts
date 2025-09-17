import { promises as fs } from 'fs';
import path from 'path';
import { 
  JobContact, 
  JobDatabase, 
  CreateJobContactDto,
  UpdateJobContactDto,
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
  Interaction,
  CreateInteractionDto,
  SearchOptions,
  ContactFilters,
  JobSearchAnalytics
} from '../types';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Utility function to generate unique IDs
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Database operations
export class JobContactsDB {
  private static async readDatabase(): Promise<JobDatabase> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.log('Database file not found, creating new one');
      const newDb: JobDatabase = {
        contacts: [],
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      };
      await this.writeDatabase(newDb);
      return newDb;
    }
  }

  private static async writeDatabase(data: JobDatabase): Promise<void> {
    data.lastUpdated = new Date().toISOString();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }

  // Contact operations
  static async getAllContacts(): Promise<JobContact[]> {
    const db = await this.readDatabase();
    return db.contacts.filter(contact => !contact.archived);
  }

  static async getContactById(id: string): Promise<JobContact | null> {
    const db = await this.readDatabase();
    return db.contacts.find(contact => contact.id === id) || null;
  }

  static async createContact(contactData: CreateJobContactDto): Promise<JobContact> {
    const db = await this.readDatabase();
    
    const newContact: JobContact = {
      ...contactData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interviews: [],
      interactions: [],
      attachments: []
    };

    db.contacts.push(newContact);
    await this.writeDatabase(db);
    
    return newContact;
  }

  static async updateContact(id: string, updates: Partial<UpdateJobContactDto>): Promise<JobContact | null> {
    const db = await this.readDatabase();
    const contactIndex = db.contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) return null;

    db.contacts[contactIndex] = {
      ...db.contacts[contactIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.writeDatabase(db);
    return db.contacts[contactIndex];
  }

  static async deleteContact(id: string): Promise<boolean> {
    const db = await this.readDatabase();
    const contactIndex = db.contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) return false;

    db.contacts.splice(contactIndex, 1);
    await this.writeDatabase(db);
    return true;
  }

  static async archiveContact(id: string): Promise<JobContact | null> {
    return this.updateContact(id, { archived: true });
  }

  // Interview operations
  static async addInterview(contactId: string, interviewData: CreateInterviewDto): Promise<Interview | null> {
    const db = await this.readDatabase();
    const contact = db.contacts.find(c => c.id === contactId);
    
    if (!contact) return null;

    const newInterview: Interview = {
      ...interviewData,
      id: generateId(),
      contactId,
      createdAt: new Date().toISOString()
    };

    contact.interviews.push(newInterview);
    contact.updatedAt = new Date().toISOString();
    
    await this.writeDatabase(db);
    return newInterview;
  }

  static async updateInterview(contactId: string, interviewId: string, updates: Partial<UpdateInterviewDto>): Promise<Interview | null> {
    const db = await this.readDatabase();
    const contact = db.contacts.find(c => c.id === contactId);
    
    if (!contact) return null;

    const interviewIndex = contact.interviews.findIndex(i => i.id === interviewId);
    if (interviewIndex === -1) return null;

    contact.interviews[interviewIndex] = {
      ...contact.interviews[interviewIndex],
      ...updates
    };
    
    contact.updatedAt = new Date().toISOString();
    await this.writeDatabase(db);
    return contact.interviews[interviewIndex];
  }

  // Interaction operations
  static async addInteraction(contactId: string, interactionData: CreateInteractionDto): Promise<Interaction | null> {
    const db = await this.readDatabase();
    const contact = db.contacts.find(c => c.id === contactId);
    
    if (!contact) return null;

    const newInteraction: Interaction = {
      ...interactionData,
      id: generateId(),
      contactId,
      createdAt: new Date().toISOString()
    };

    contact.interactions.push(newInteraction);
    contact.updatedAt = new Date().toISOString();
    
    await this.writeDatabase(db);
    return newInteraction;
  }

  // Search and filter operations
  static async searchContacts(options: SearchOptions = {}): Promise<JobContact[]> {
    const db = await this.readDatabase();
    let contacts = db.contacts.filter(contact => !contact.archived);

    // Apply text search
    if (options.query) {
      const query = options.query.toLowerCase();
      contacts = contacts.filter(contact => 
        contact.companyName.toLowerCase().includes(query) ||
        contact.position.toLowerCase().includes(query) ||
        contact.contactPerson?.toLowerCase().includes(query) ||
        contact.notes.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (options.filters) {
      contacts = this.applyFilters(contacts, options.filters);
    }

    // Apply sorting
    if (options.sortBy) {
      contacts.sort((a, b) => {
        const aVal = a[options.sortBy!];
        const bVal = b[options.sortBy!];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return options.sortOrder === 'desc' 
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        }
        
        return options.sortOrder === 'desc' 
          ? (bVal as any) - (aVal as any)
          : (aVal as any) - (bVal as any);
      });
    }

    // Apply pagination
    if (options.offset || options.limit) {
      const start = options.offset || 0;
      const end = options.limit ? start + options.limit : undefined;
      contacts = contacts.slice(start, end);
    }

    return contacts;
  }

  private static applyFilters(contacts: JobContact[], filters: ContactFilters): JobContact[] {
    return contacts.filter(contact => {
      if (filters.status && !filters.status.includes(contact.status)) return false;
      if (filters.priority && !filters.priority.includes(contact.priority)) return false;
      if (filters.workType && !filters.workType.includes(contact.workType)) return false;
      if (filters.contactMethod && !filters.contactMethod.includes(contact.contactMethod)) return false;
      
      if (filters.hasUpcomingFollowUp) {
        const hasFollowUp = contact.followUpDate && new Date(contact.followUpDate) >= new Date();
        if (!hasFollowUp) return false;
      }
      
      if (filters.dateRange) {
        const contactDate = new Date(contact.dateContacted);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (contactDate < startDate || contactDate > endDate) return false;
      }
      
      return true;
    });
  }

  // Analytics operations
  static async getAnalytics(): Promise<JobSearchAnalytics> {
    const db = await this.readDatabase();
    const activeContacts = db.contacts.filter(contact => !contact.archived);
    
    // Count contacts by status
    const contactsByStatus: Record<string, number> = {};
    activeContacts.forEach(contact => {
      contactsByStatus[contact.status] = (contactsByStatus[contact.status] || 0) + 1;
    });

    // Count contacts by priority
    const contactsByPriority: Record<string, number> = {};
    activeContacts.forEach(contact => {
      contactsByPriority[contact.priority] = (contactsByPriority[contact.priority] || 0) + 1;
    });

    // Calculate upcoming follow-ups
    const upcomingFollowUps = activeContacts.filter(contact => {
      return contact.followUpDate && new Date(contact.followUpDate) >= new Date();
    }).length;

    // Count interviews this week
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    const interviewsThisWeek = activeContacts.reduce((count, contact) => {
      return count + contact.interviews.filter(interview => {
        const interviewDate = new Date(interview.scheduledDate);
        return interviewDate >= new Date() && interviewDate <= oneWeekFromNow;
      }).length;
    }, 0);

    // Calculate average response time (placeholder)
    const averageResponseTime = 0; // TODO: Implement based on interaction history

    // Recent activity (last 7 days)
    const recentActivity: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = activeContacts.filter(contact => {
        const contactDate = contact.createdAt.split('T')[0];
        return contactDate === dateStr;
      }).length;
      
      recentActivity.push({ date: dateStr, count });
    }

    return {
      totalContacts: activeContacts.length,
      contactsByStatus: contactsByStatus as any,
      contactsByPriority: contactsByPriority as any,
      averageResponseTime,
      upcomingFollowUps,
      interviewsThisWeek,
      recentActivity
    };
  }

  // Utility operations
  static async getUpcomingFollowUps(days: number = 7): Promise<JobContact[]> {
    const db = await this.readDatabase();
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    
    return db.contacts.filter(contact => {
      if (contact.archived || !contact.followUpDate) return false;
      const followUpDate = new Date(contact.followUpDate);
      return followUpDate <= targetDate && followUpDate >= new Date();
    });
  }

  static async exportToCSV(): Promise<string> {
    const contacts = await this.getAllContacts();
    
    if (contacts.length === 0) return '';
    
    const headers = [
      'Company', 'Position', 'Contact Person', 'Email', 'Status', 
      'Priority', 'Date Contacted', 'Follow Up Date', 'Notes'
    ];
    
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        contact.companyName,
        contact.position,
        contact.contactPerson || '',
        contact.contactEmail || '',
        contact.status,
        contact.priority,
        contact.dateContacted,
        contact.followUpDate || '',
        contact.notes.replace(/,/g, ';') // Replace commas to avoid CSV issues
      ].join(','))
    ].join('\n');
    
    return csvContent;
  }
}