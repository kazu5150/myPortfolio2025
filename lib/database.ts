import { supabase } from './supabase'
import type { LearningRecord, Project, Skill, BlogPost, ContactMessage } from './supabase'

// 学習記録関連の操作
export async function getLearningRecords(userId: string) {
  const { data, error } = await supabase
    .from('learning_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) throw error
  return data as LearningRecord[]
}

export async function createLearningRecord(record: Omit<LearningRecord, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('learning_records')
    .insert([record])
    .select()
    .single()

  if (error) throw error
  return data as LearningRecord
}

export async function updateLearningRecord(id: string, updates: Partial<LearningRecord>) {
  const { data, error } = await supabase
    .from('learning_records')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as LearningRecord
}

export async function deleteLearningRecord(id: string) {
  const { error } = await supabase
    .from('learning_records')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// プロジェクト関連の操作
export async function getProjects(includeUnpublished = false) {
  let query = supabase.from('projects').select('*')
  
  if (!includeUnpublished) {
    query = query.not('published_at', 'is', null)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .not('published_at', 'is', null)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// スキル関連の操作
export async function getSkills(userId?: string) {
  let query = supabase.from('skills').select('*')
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  const { data, error } = await query.order('level', { ascending: false })

  if (error) throw error
  return data as Skill[]
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('skills')
    .insert([skill])
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function updateSkill(id: string, updates: Partial<Skill>) {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function deleteSkill(id: string) {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ブログ記事関連の操作
export async function getBlogPosts(includeUnpublished = false) {
  let query = supabase.from('blog_posts').select('*')
  
  if (!includeUnpublished) {
    query = query.eq('published', true)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  console.log('createBlogPost実行開始:', post)
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single()

  console.log('Supabaseレスポンス:', { data, error })
  
  if (error) {
    console.error('Supabaseエラー詳細:')
    console.error('- message:', error.message)
    console.error('- details:', error.details)
    console.error('- hint:', error.hint)
    console.error('- code:', error.code)
    console.error('- 完全なエラーオブジェクト:', error)
    throw new Error(`Supabaseエラー: ${error.message}`)
  }
  
  return data as BlogPost
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPost
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// お問い合わせ関連の操作
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ContactMessage[]
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ ...message, status: 'unread' }])
    .select()
    .single()

  if (error) throw error
  return data as ContactMessage
}

export async function updateContactMessageStatus(id: string, status: ContactMessage['status']) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as ContactMessage
}

// 統計データの取得
export async function getLearningStats(userId: string) {
  // 総学習時間
  const { data: totalHours, error: hoursError } = await supabase
    .from('learning_records')
    .select('duration')
    .eq('user_id', userId)

  if (hoursError) throw hoursError

  const totalMinutes = totalHours?.reduce((sum, record) => sum + record.duration, 0) || 0
  const totalHoursCalculated = Math.round(totalMinutes / 60)

  // 学習記録数
  const { count: recordCount, error: countError } = await supabase
    .from('learning_records')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (countError) throw countError

  // 完了プロジェクト数
  const { count: projectCount, error: projectError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .not('published_at', 'is', null)

  if (projectError) throw projectError

  // 習得技術数
  const { count: skillCount, error: skillError } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (skillError) throw skillError

  return {
    totalHours: totalHoursCalculated,
    recordCount: recordCount || 0,
    projectCount: projectCount || 0,
    skillCount: skillCount || 0
  }
}