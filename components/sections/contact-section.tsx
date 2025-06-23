"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl modern-heading font-display mb-6">
            <span className="gradient-text">Contact</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light tracking-wide">
            <span className="gradient-text-secondary font-medium">プロジェクトのご相談</span>やお仕事のご依頼、お気軽にお問い合わせください
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl modern-heading-thin font-display flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-500" />
                <span className="gradient-text-primary">お問い合わせフォーム</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-light mb-2 gradient-text-primary">
                      お名前 *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gradient-to-r from-white/[0.03] to-white/[0.05] border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300"
                      placeholder="山田太郎"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-light mb-2 gradient-text-primary">
                      メールアドレス *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gradient-to-r from-white/[0.03] to-white/[0.05] border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-light mb-2 gradient-text-primary">
                    件名 *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-gradient-to-r from-white/[0.03] to-white/[0.05] border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300"
                    placeholder="プロジェクトのご相談"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-2 gradient-text-primary">
                    メッセージ *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gradient-to-r from-white/[0.03] to-white/[0.05] border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 resize-none transition-all duration-300"
                    placeholder="プロジェクトの詳細やご要望をお聞かせください..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-semibold hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  メッセージを送信
                </Button>
              </form>
            </CardContent>
          </GlassCard>

          {/* Contact Info */}
          <div className="space-y-8">
            <GlassCard className="p-8">
              <h3 className="text-2xl modern-heading-thin mb-6 font-display gradient-text-primary">連絡先情報</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-light mb-1 gradient-text">メール</h4>
                    <p className="text-white/60">contact@example.com</p>
                    <p className="text-sm text-white/60 mt-1">24時間以内に返信いたします</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-light mb-1 gradient-text">電話</h4>
                    <p className="text-white/60">090-1234-5678</p>
                    <p className="text-sm text-white/60 mt-1">平日 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-light mb-1 gradient-text">所在地</h4>
                    <p className="text-white/60">東京都, 日本</p>
                    <p className="text-sm text-white/60 mt-1">リモートワーク対応可能</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-2xl modern-heading-thin mb-6 font-display gradient-text-primary">対応可能な業務</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                  <span className="text-white/80">Webアプリケーション開発</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mr-3"></div>
                  <span className="text-white/80">AI機能の実装・統合</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mr-3"></div>
                  <span className="text-white/80">データ可視化・分析ツール</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                  <span className="text-white/80">技術コンサルティング</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mr-3"></div>
                  <span className="text-white/80">プロトタイプ開発</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
