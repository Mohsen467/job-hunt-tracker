# 🎯 Job Hunt Progress Tracker

A **stunning, professional-grade** Next.js application for tracking job applications, contacts, interviews, and follow-ups. Designed specifically for game development professionals seeking their next opportunity.

## ✨ Features

### 🎨 **Beautiful, Modern UI**
- Professional gradient backgrounds and glass-morphism design
- Smooth animations and micro-interactions with Framer Motion
- Responsive design that works perfectly on all devices
- Professional component library with consistent design system

### 📋 **Comprehensive Contact Management**
- Track companies, positions, departments, and contact persons
- Rich contact details with email, phone, and social links
- Priority system to focus on your most important opportunities
- Status tracking from initial contact to offer acceptance

### 🎤 **Interview Tracking System**
- Multi-stage interview process management
- Detailed notes and feedback for each round
- Interview timeline and progress visualization
- Interviewer contact information and follow-up tracking

### 💬 **Interaction Timeline**
- Complete history of all communications
- Email, phone call, and meeting tracking
- Professional interaction categorization
- Visual timeline with beautiful progress indicators

### 🔍 **Advanced Search & Filtering**
- Real-time search across all contact fields
- Filter by status, priority, company, and more
- Smart sorting options (date, company, position)
- Instant results with smooth animations

### 📊 **Analytics Dashboard**
- Visual progress tracking with animated charts
- Application funnel analysis
- Response rate insights
- Success metrics and goal tracking

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v3.4 with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Heroicons for consistent iconography
- **UI Components**: Custom component library with variants
- **Data Storage**: Local JSON files for privacy
- **Development**: Modern Node.js with ESLint and TypeScript

## 🎮 Perfect for Game Developers

This application includes **realistic sample data** from top game development companies:

- **Epic Games** - Unreal Engine Developer position
- **Rockstar Games** - Gameplay Programmer role  
- **Ubisoft** - Senior Game Programmer (Assassin's Creed)
- **Unity Technologies** - Engine Developer position
- **Naughty Dog** - Rendering Programmer role
- **Valve Corporation** - Software Engineer (Steam Platform)

Each sample includes realistic interview rounds, interactions, and status progression!

## 🏃‍♂️ Quick Start

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