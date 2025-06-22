import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 型定義
export interface LearningRecord {
  id: string
  title: string
  description?: string
  category: string
  duration: number
  technologies: string[]
  date: string
  image_url?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  live_url?: string
  github_url?: string
  featured: boolean
  published_at?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  tags: string[]
  published: boolean
  published_at?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface ExperimentalProject {
  id: string
  user_id: string
  title: string
  description?: string
  short_description?: string
  status: 'planning' | 'developing' | 'testing' | 'completed' | 'paused'
  category: 'web' | 'mobile' | 'ai' | 'game' | 'tool' | 'other'
  technologies: string[]
  start_date: string
  last_updated: string
  github_url?: string
  demo_url?: string
  thumbnail_url?: string
  learning_goals: string[]
  challenges: string[]
  progress: number
  is_public: boolean
  created_at: string
  updated_at: string
}