"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Header } from "@/components/layout/header"
import { Plus, Edit, Trash2, BarChart3, BookOpen, FolderOpen, MessageSquare, Settings } from "lucide-react"

// Mock data
const dashboardStats = {
  totalLearningHours: 1247,
  totalProjects: 23,
  totalBlogPosts: 15,
  totalMessages: 8,
}

const recentActivities = [
  { type: "learning", title: "Next.js 14 App Router学習", time: "2時間前" },
  { type: "project", title: "ポートフォリオサイト更新", time: "5時間前" },
  { type: "blog", title: "TypeScript記事投稿", time: "1日前" },
  { type: "message", title: "新しいお問い合わせ", time: "2日前" },
]

export default function DashboardPage() {
  const [isAddingRecord, setIsAddingRecord] = useState(false)

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2">
                <GradientText>Dashboard</GradientText>
              </h1>
              <p className="text-lg md:text-xl text-white/70">学習記録とコンテンツの管理</p>
            </div>
            <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  新規追加
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-100 border-white/20">
                <DialogHeader>
                  <DialogTitle>学習記録を追加</DialogTitle>
                  <DialogDescription>今日の学習内容を記録してください</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="学習内容のタイトル" className="bg-white/5 border-white/20" />
                  <Textarea placeholder="詳細な説明..." className="bg-white/5 border-white/20" />
                  <Input placeholder="学習時間（分）" type="number" className="bg-white/5 border-white/20" />
                  <Input placeholder="使用技術（カンマ区切り）" className="bg-white/5 border-white/20" />
                  <div className="flex gap-2">
                    <Button className="bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black flex-1">保存</Button>
                    <Button variant="outline" onClick={() => setIsAddingRecord(false)} className="border-white/20">
                      キャンセル
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-[#00D9FF] mx-auto mb-3" />
              <div className="text-2xl font-bold font-display mb-1">{dashboardStats.totalLearningHours}h</div>
              <div className="text-sm text-white/60">総学習時間</div>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <FolderOpen className="w-8 h-8 text-[#7C3AED] mx-auto mb-3" />
              <div className="text-2xl font-bold font-display mb-1">{dashboardStats.totalProjects}</div>
              <div className="text-sm text-white/60">プロジェクト数</div>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
              <div className="text-2xl font-bold font-display mb-1">{dashboardStats.totalBlogPosts}</div>
              <div className="text-sm text-white/60">ブログ記事</div>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-[#F59E0B] mx-auto mb-3" />
              <div className="text-2xl font-bold font-display mb-1">{dashboardStats.totalMessages}</div>
              <div className="text-sm text-white/60">未読メッセージ</div>
            </GlassCard>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="learning" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white/5">
                  <TabsTrigger value="learning">学習記録</TabsTrigger>
                  <TabsTrigger value="projects">プロジェクト</TabsTrigger>
                  <TabsTrigger value="blog">ブログ</TabsTrigger>
                  <TabsTrigger value="messages">メッセージ</TabsTrigger>
                </TabsList>

                <TabsContent value="learning" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-display">最近の学習記録</h3>
                    <Button variant="outline" size="sm" className="border-white/20">
                      すべて表示
                    </Button>
                  </div>
                  {/* Learning records would be mapped here */}
                  <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Next.js 14 App Router</h4>
                        <p className="text-sm text-white/70 mb-3">
                          新しいApp Routerの機能を学習し、実際のプロジェクトに適用
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="secondary">Next.js</Badge>
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">TypeScript</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-white/60">学習時間: 3時間 • 2024-01-15</div>
                  </GlassCard>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-display">プロジェクト管理</h3>
                    <Button variant="outline" size="sm" className="border-white/20">
                      新規作成
                    </Button>
                  </div>
                  <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">AIポートフォリオサイト</h4>
                        <p className="text-sm text-white/70 mb-3">現在のポートフォリオサイト - 進行中</p>
                        <Progress value={85} className="mb-3" />
                        <div className="flex gap-2">
                          <Badge variant="secondary">Next.js</Badge>
                          <Badge variant="secondary">TypeScript</Badge>
                          <Badge variant="secondary">Tailwind</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                <TabsContent value="blog" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-display">ブログ記事管理</h3>
                    <Button variant="outline" size="sm" className="border-white/20">
                      新規作成
                    </Button>
                  </div>
                  <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Next.js 14 App Routerで学ぶモダンWeb開発</h4>
                        <p className="text-sm text-white/70 mb-3">公開済み • 2024-01-15</p>
                        <div className="flex gap-2">
                          <Badge variant="secondary">Next.js</Badge>
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">Web Development</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                <TabsContent value="messages" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-display">お問い合わせ管理</h3>
                    <Button variant="outline" size="sm" className="border-white/20">
                      すべて既読
                    </Button>
                  </div>
                  <GlassCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Webアプリ開発のご相談</h4>
                        <p className="text-sm text-white/70 mb-3">山田太郎様 • example@email.com</p>
                        <p className="text-sm text-white/60">ECサイトの開発についてご相談があります...</p>
                      </div>
                      <Badge variant="destructive">未読</Badge>
                    </div>
                    <div className="text-sm text-white/60">2024-01-15 14:30</div>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold font-display mb-4">最近のアクティビティ</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#00D9FF] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-white/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Quick Actions */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold font-display mb-4">クイックアクション</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <Plus className="w-4 h-4 mr-2" />
                    学習記録追加
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    新規プロジェクト
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <BookOpen className="w-4 h-4 mr-2" />
                    ブログ記事作成
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <Settings className="w-4 h-4 mr-2" />
                    設定
                  </Button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
