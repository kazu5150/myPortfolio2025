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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            <GradientText>Contact</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            プロジェクトのご相談やお仕事のご依頼、お気軽にお問い合わせください
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-display flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-[#00D9FF]" />
                お問い合わせフォーム
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      お名前 *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 focus:border-[#00D9FF] transition-colors"
                      placeholder="山田太郎"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      メールアドレス *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 focus:border-[#00D9FF] transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    件名 *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/20 focus:border-[#00D9FF] transition-colors"
                    placeholder="プロジェクトのご相談"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    メッセージ *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/5 border-white/20 focus:border-[#00D9FF] transition-colors resize-none"
                    placeholder="プロジェクトの詳細やご要望をお聞かせください..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] text-black font-semibold hover:shadow-glow transition-all duration-300"
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
              <h3 className="text-2xl font-bold mb-6 font-display">連絡先情報</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">メール</h4>
                    <p className="text-white/70">contact@example.com</p>
                    <p className="text-sm text-white/60 mt-1">24時間以内に返信いたします</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">電話</h4>
                    <p className="text-white/70">090-1234-5678</p>
                    <p className="text-sm text-white/60 mt-1">平日 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">所在地</h4>
                    <p className="text-white/70">東京都, 日本</p>
                    <p className="text-sm text-white/60 mt-1">リモートワーク対応可能</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-display">対応可能な業務</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-3"></div>
                  <span>Webアプリケーション開発</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-3"></div>
                  <span>AI機能の実装・統合</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-3"></div>
                  <span>データ可視化・分析ツール</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-3"></div>
                  <span>技術コンサルティング</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00D9FF] rounded-full mr-3"></div>
                  <span>プロトタイプ開発</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
