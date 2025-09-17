# Job Hunt Progress Tracker

A comprehensive Next.js application for tracking job applications, contacts, interviews, and follow-ups, specifically designed for game development professionals.

## Features

- **Contact Management**: Track companies, positions, and contact persons
- **Interview Tracking**: Multi-stage interview process with notes and feedback
- **Status Management**: Comprehensive job application status tracking
- **Priority System**: Organize contacts by priority level
- **Search & Filter**: Find contacts quickly with advanced filtering
- **Analytics**: Job search progress insights and metrics
- **Export**: CSV export for backup and external analysis

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Local JSON files
- **Development**: Node.js, npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-hunt-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── api/            # Backend API endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utility functions and data management
│   │   └── db.ts          # JSON-based database operations
│   └── types/             # TypeScript type definitions
│       └── index.ts       # Main type definitions
├── data/                  # Local JSON data storage
│   └── contacts.json      # Job contacts data
├── .github/               # GitHub configuration
│   └── copilot-instructions.md
└── README.md
```

## API Endpoints

- `GET /api/contacts` - List/search contacts with filters
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/[id]` - Get specific contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact

## Data Models

### JobContact
Main entity containing company info, contact details, status, and related interviews/interactions.

### Interview
Tracks multiple interview rounds per contact with scheduling, notes, and outcomes.

### Interaction
Records all communications and activities with detailed history.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Define types in `src/types/index.ts`
2. Add database operations in `src/lib/db.ts`
3. Create API endpoints in `src/app/api/`
4. Build UI components in `src/components/`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Mohsen Sadeghi**  
Senior Unreal Engine Developer & Gameplay Programmer  
Website: [MohsenSadeghi.com](https://www.MohsenSadeghi.com)  
LinkedIn: [dev-mohsen-sadeghi](https://www.linkedin.com/in/dev-mohsen-sadeghi/)

---

Built with ❤️ for game developers seeking their next opportunity.