import { NextRequest, NextResponse } from 'next/server';
import { JobContactsDB } from '../../../lib/db';

// GET /api/contacts - Get all contacts with optional search and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status') || 'all';

    const contacts = await JobContactsDB.searchContacts(query, { status });
    
    return NextResponse.json({ 
      success: true, 
      contacts: contacts,
      count: contacts.length 
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const contact = await JobContactsDB.createContact(body);
    
    return NextResponse.json({
      success: true,
      contact
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}