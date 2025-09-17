# Job Hunt Progress Tracker - Copilot Instructions

This Next.js application helps track job applications, contacts, interviews, and follow-ups for job seekers in the game development industry.

## Package Manager
- Use pnpm for all dependency management and scripts
- Do not use npm or yarn
- Install dependencies: `pnpm install`

## Project Structure
- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and data management
- `/src/types` - TypeScript type definitions
- `/data` - Local JSON data storage

## Key Patterns
- Uses local JSON files for data persistence via JobContactsDB class
- TypeScript interfaces for comprehensive type safety
- Tailwind CSS for styling with responsive design
- App Router for routing and API endpoints
- RESTful API design with proper error handling

## Data Models
- JobContact: Main entity with interviews, interactions, and attachments
- Interview: Tracks multiple interview rounds per contact
- Interaction: Records all communications and activities
- Comprehensive status tracking from "To Contact" to "Offer Accepted"

## API Endpoints
- `GET /api/contacts` - List/search contacts with filters
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/[id]` - Get specific contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact

## Development Workflow
- Run `pnpm dev` for development server (http://localhost:3000)
- Data persisted in `/data/contacts.json`
- TypeScript strict mode enabled
- Real-time data operations through API routes

## Code Quality & Build Process ⚠️ IMPORTANT
Use pnpm for all scripts.

**ALWAYS run build and lint validation after making code changes:**
1. Run `pnpm build` to check for TypeScript compilation errors
2. Run `pnpm lint` to verify code quality and style
3. Fix any errors or warnings before completing work
4. Ensure the application compiles successfully before submitting changes

**Build validation is REQUIRED for every code change to maintain production readiness.**

## Current Status: Foundation Complete ✅
- [x] Next.js workspace with TypeScript and Tailwind
- [x] Complete data models and types
- [x] JSON-based data persistence layer
- [x] RESTful API endpoints
- [x] Development server running
- [x] Build and lint validation working
- [ ] UI components and pages
- [ ] Contact management interface
- [ ] Interview tracking features
- [ ] Dashboard and analytics