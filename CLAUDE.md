# AI Portfolio Project - Claude Code Context

## Project Overview
This is a Next.js-based AI portfolio website for showcasing programming learning progress and technical skills. The site serves as a platform for transitioning from side projects to professional development work, featuring comprehensive learning analytics and experimental project showcase.

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (planned)
- **Deployment**: Vercel

## Project Structure
```
ai-portfolio/
├── app/                        # Next.js App Router
│   ├── blog/                  # Blog pages and management
│   ├── dashboard/             # Admin dashboard
│   │   └── experiments/       # Experimental projects management
│   ├── experiments/           # Experimental projects showcase
│   │   ├── [id]/             # Dynamic project detail pages
│   │   ├── new/              # New project creation
│   │   └── page.tsx          # Projects listing
│   ├── learning/             # Learning record management
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with suppressHydrationWarning
│   └── page.tsx              # Homepage
├── components/
│   ├── ui/                   # shadcn/ui components + custom UI
│   ├── layout/               # Layout components (header, footer)
│   └── sections/             # Page sections and features
├── hooks/                    # Custom React hooks
├── lib/                      # Database operations and utilities
├── supabase/                 # Database schemas and migrations
└── styles/                   # Additional styles
```

## Key Features

### 1. **Public Pages**:
   - **Homepage**: Hero, about, learning visualization, portfolio, contact
   - **Learning Journey**: Interactive learning analytics with graphs and heatmaps
   - **Experimental Projects**: Showcase of learning projects and prototypes
   - **Project Details**: Individual project pages with progress tracking
   - **Blog**: Technical articles and learning reflections
   - **Contact**: Business inquiry form

### 2. **Learning Analytics**:
   - **Weekly Study Hours**: Bar chart visualization
   - **Technology Distribution**: Progress bars for different tech stacks
   - **Daily Learning Trends**: Recent activity visualization
   - **Statistics Cards**: Total hours, record count, project count, skills
   - **Real-time Data**: Supabase integration with 19+ learning records

### 3. **Experimental Projects System**:
   - **Project Showcase**: Cards with status, progress, and technology badges
   - **Detailed Views**: 3-tab layout (Overview, Progress & Learning, Resources)
   - **Project Creation**: Comprehensive form with dynamic fields
   - **CRUD Operations**: Full create, read, update, delete functionality
   - **Filtering**: By category (Web, Mobile, AI, Game, Tool, Other) and status
   - **Progress Tracking**: Visual progress bars and completion metrics

### 4. **Admin Dashboard** (Development ready):
   - Learning record management
   - Experimental project management with full editing capabilities
   - Blog post creation and editing
   - Contact message handling

### 5. **Data Management**:
   - **learning_records**: Daily study logs with hours and technologies
   - **experimental_projects**: Learning projects with progress tracking
   - **projects**: Portfolio items with tech stacks and links
   - **skills**: Technology proficiency tracking
   - **blog_posts**: Technical articles
   - **contact_messages**: Business inquiries

## Design System
- **Theme**: Dark, modern, professional with glassmorphism effects
- **Colors**: Deep blacks, cyber blue (#00D9FF), violet (#7C3AED)
- **Typography**: Inter for body text, JetBrains Mono for code
- **Effects**: Glassmorphism cards, gradient text, subtle animations, hover effects
- **Components**: Custom glass cards, gradient backgrounds, progress indicators

## Development Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server (runs on port 3001 if 3000 is occupied)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Database Schema (Supabase)

### Core Tables:
- **learning_records**: Daily learning activities with duration and technologies
- **experimental_projects**: Learning projects with status, progress, goals, and challenges
- **projects**: Portfolio projects with tech stacks and external links
- **skills**: Technology proficiency tracking
- **blog_posts**: Technical articles and learning reflections
- **contact_messages**: Business inquiries and project requests

### Key Features:
- Row Level Security (RLS) policies configured
- Automatic updated_at timestamps
- UUID primary keys
- Array fields for technologies, goals, and challenges
- Public/private visibility controls

## Current Implementation Status ✅

### Completed Features:
- ✅ **Full Next.js 14 setup** with App Router and TypeScript
- ✅ **Complete UI system** with shadcn/ui and custom components
- ✅ **Supabase integration** with working CRUD operations
- ✅ **Learning analytics** with interactive charts and visualizations
- ✅ **Experimental projects** showcase with filtering and detailed views
- ✅ **Project creation** system with dynamic forms
- ✅ **Responsive design** with glassmorphism effects
- ✅ **Hydration error resolution** with suppressHydrationWarning
- ✅ **Database schemas** and sample data
- ✅ **RLS policies** configured for development environment

### Working Features:
- Homepage with all sections functional
- Learning data visualization with real database data
- Project listing with category and status filters
- Individual project detail pages with 3-tab layout
- New project creation with comprehensive forms
- Admin dashboard for project management

## Development Environment Setup

### Database Setup:
1. Execute `supabase/experimental-projects-schema.sql` in Supabase SQL Editor
2. Run `supabase/fix-rls-policies-experimental.sql` for development permissions
3. Sample data will be automatically inserted

### Environment Variables (.env.local):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://qnhohjwmprtnbvtrwzkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Known Issues & Solutions
- **Hydration Errors**: Resolved using `suppressHydrationWarning` in layout.tsx
- **Browser Extensions**: Some extensions may interfere with rendering
- **RLS Policies**: Development environment uses permissive policies

## Security Considerations
- Supabase Row Level Security (RLS) implemented
- Development policies allow full access (to be tightened for production)
- Input sanitization for XSS prevention
- HTTPS and secure headers in place
- UUID-based primary keys for security

## Future Enhancement Opportunities
1. **Authentication System**: Implement user registration and login
2. **Image Uploads**: Add project thumbnails and screenshots
3. **Search & Tagging**: Enhanced filtering and search capabilities
4. **Progress Automation**: Git integration for automatic progress updates
5. **Social Features**: Likes, comments, and sharing functionality
6. **Performance**: Implement caching and optimization
7. **PWA Features**: Offline support and mobile app capabilities

This portfolio successfully demonstrates technical skills while providing a comprehensive platform for showcasing learning progress and experimental projects.