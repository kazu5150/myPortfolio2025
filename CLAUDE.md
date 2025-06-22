# AI Portfolio Project - Claude Code Context

## Project Overview
This is a Next.js-based AI portfolio website for showcasing programming learning progress and technical skills. The site serves as a platform for transitioning from side projects to professional development work.

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Project Structure
```
ai-portfolio/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── dashboard/         # Admin dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (header, footer)
│   └── sections/          # Page sections (hero, about, portfolio, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── styles/                # Additional styles
```

## Key Features
1. **Public Pages**:
   - Portfolio showcase with project cards
   - Learning progress tracking and visualization
   - Blog for technical articles
   - Contact form for business inquiries

2. **Admin Dashboard** (Authentication required):
   - Learning record management
   - Project/portfolio management
   - Blog post creation and editing
   - Contact message handling

3. **Data Management**:
   - Learning records (daily study logs with hours and technologies)
   - Projects (portfolio items with tech stacks and links)
   - Skills (proficiency levels for different technologies)
   - Blog posts (technical articles and learning reflections)
   - Contact messages (inquiries and project requests)

## Design System
- **Theme**: Dark, modern, professional
- **Colors**: Deep blacks, cyber blue (#00D9FF), violet (#7C3AED)
- **Typography**: Inter for body text, JetBrains Mono for code
- **Effects**: Glassmorphism, subtle animations, neon glows

## Development Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Database Schema (Supabase)
Key tables include:
- `learning_records` - Daily learning activities
- `projects` - Portfolio projects with tech stacks
- `skills` - Technology proficiency tracking
- `blog_posts` - Technical articles
- `contact_messages` - Business inquiries

## Current Implementation Status
The project appears to be in early development with:
- Basic Next.js structure in place
- shadcn/ui components installed
- Layout components (header, footer) created
- Main sections (hero, about, portfolio, contact, learning stats) defined
- Theme provider configured

## Development Priorities
1. Implement Supabase integration for data management
2. Create admin dashboard for content management
3. Build learning record tracking functionality
4. Develop portfolio project showcase
5. Add authentication system
6. Implement blog functionality
7. Optimize for performance and SEO

## Security Considerations
- Use Supabase Row Level Security (RLS) for data protection
- Implement proper authentication and authorization
- Sanitize user inputs for XSS prevention
- Use HTTPS and secure headers
- Implement rate limiting for forms

This portfolio aims to demonstrate technical skills while providing a platform for professional growth and client acquisition.