import { NextRequest, NextResponse } from 'next/server';
import { JobContactsDB } from '../../../lib/db';
import { SearchOptions, ContactFilters } from '../../../types';

// GET /api/contacts - Get all contacts with optional search/filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const searchOptions: SearchOptions = {
      query: searchParams.get('q') || undefined,
      sortBy: searchParams.get('sortBy') as any || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
    };

    // Parse filters from query params
    const filters: ContactFilters = {};
    if (searchParams.get('status')) {
      filters.status = searchParams.get('status')!.split(',') as any;
    }
    if (searchParams.get('priority')) {
      filters.priority = searchParams.get('priority')!.split(',') as any;
    }
    if (searchParams.get('workType')) {
      filters.workType = searchParams.get('workType')!.split(',') as any;
    }

    if (Object.keys(filters).length > 0) {
      searchOptions.filters = filters;
    }

    const contacts = await JobContactsDB.searchContacts(searchOptions);
    
    return NextResponse.json({ 
      success: true, 
      data: contacts,
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
    
    // Basic validation
    if (!body.companyName || !body.position || !body.status) {
      return NextResponse.json(
        { success: false, error: 'Company name, position, and status are required' },
        { status: 400 }
      );
    }

    const newContact = await JobContactsDB.createContact(body);
    
    return NextResponse.json({ 
      success: true, 
      data: newContact 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}