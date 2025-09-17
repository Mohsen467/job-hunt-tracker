import fs from 'fs/promises';
import path from 'path';
import { JobContact } from '@/types';

interface Database {
  contacts: JobContact[];
  lastUpdated: string;
  version: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export class JobContactsDB {
  // Database operations
  static async readDatabase(): Promise<Database> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      // If file doesn't exist, create empty database
      const emptyDb: Database = {
        contacts: [],
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      };
      await this.saveDatabase(emptyDb);
      return emptyDb;
    }
  }

  static async saveDatabase(data: Database): Promise<void> {
    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }

  // Contact operations
  static async getAllContacts(): Promise<JobContact[]> {
    const db = await this.readDatabase();
    return db.contacts;
  }

  static async getContactById(id: string): Promise<JobContact | null> {
    const db = await this.readDatabase();
    return db.contacts.find(contact => contact.id === id) || null;
  }

  static async createContact(contactData: Partial<JobContact>): Promise<JobContact> {
    const db = await this.readDatabase();
    
    const newContact: JobContact = {
      id: `contact-${Date.now()}`,
      companyName: contactData.companyName || '',
      positionTitle: contactData.positionTitle || '',
      department: contactData.department,
      location: contactData.location || '',
      workType: contactData.workType || 'Remote',
      status: contactData.status || 'To Contact',
      priority: contactData.priority || 'Medium',
      contactName: contactData.contactName,
      contactEmail: contactData.contactEmail,
      contactPhone: contactData.contactPhone,
      companyWebsite: contactData.companyWebsite,
      jobPostingUrl: contactData.jobPostingUrl,
      salaryRange: contactData.salaryRange,
      applicationDeadline: contactData.applicationDeadline,
      dateAdded: new Date().toISOString(),
      notes: contactData.notes,
      interviews: [],
      interactions: [],
      attachments: []
    };

    db.contacts.push(newContact);
    db.lastUpdated = new Date().toISOString();
    
    await this.saveDatabase(db);
    return newContact;
  }

  static async updateContact(id: string, updates: Partial<JobContact>): Promise<JobContact | null> {
    const db = await this.readDatabase();
    const contactIndex = db.contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      return null;
    }

    db.contacts[contactIndex] = { ...db.contacts[contactIndex], ...updates };
    db.lastUpdated = new Date().toISOString();
    
    await this.saveDatabase(db);
    return db.contacts[contactIndex];
  }

  static async deleteContact(id: string): Promise<boolean> {
    const db = await this.readDatabase();
    const initialLength = db.contacts.length;
    
    db.contacts = db.contacts.filter(contact => contact.id !== id);
    
    if (db.contacts.length < initialLength) {
      db.lastUpdated = new Date().toISOString();
      await this.saveDatabase(db);
      return true;
    }
    
    return false;
  }

  // Search and filter contacts
  static async searchContacts(query: string, filters?: { status?: string }): Promise<JobContact[]> {
    const db = await this.readDatabase();
    let contacts = db.contacts;

    // Apply text search
    if (query) {
      const searchTerm = query.toLowerCase();
      contacts = contacts.filter(contact => 
        contact.companyName.toLowerCase().includes(searchTerm) ||
        contact.positionTitle.toLowerCase().includes(searchTerm) ||
        contact.contactName?.toLowerCase().includes(searchTerm) ||
        contact.location.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters
    if (filters?.status && filters.status !== 'all') {
      contacts = contacts.filter(contact => contact.status === filters.status);
    }

    return contacts;
  }

  // Get analytics data
  static async getAnalytics() {
    const db = await this.readDatabase();
    const contacts = db.contacts;
    
    const statusCounts = contacts.reduce((acc: Record<string, number>, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalContacts: contacts.length,
      contactsByStatus: statusCounts,
      totalInterviews: contacts.reduce((sum, contact) => sum + (contact.interviews?.length || 0), 0),
      totalInteractions: contacts.reduce((sum, contact) => sum + (contact.interactions?.length || 0), 0)
    };
  }
}