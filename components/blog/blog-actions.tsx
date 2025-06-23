'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreVertical, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { deleteBlogPost, updateBlogPost } from "@/lib/database"
import { BlogPost } from "@/lib/supabase"

interface BlogActionsProps {
  post: BlogPost
  onUpdate?: () => void
}

export function BlogActions({ post, onUpdate }: BlogActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `「${post.title}」を削除してもよろしいですか？この操作は取り消せません。`
    )
    
    if (!confirmed) return

    setIsDeleting(true)
    try {
      await deleteBlogPost(post.id)
      if (onUpdate) {
        onUpdate()
      } else {
        router.push('/blog')
      }
    } catch (error) {
      console.error('削除に失敗:', error)
      alert('記事の削除に失敗しました。')
    } finally {
      setIsDeleting(false)
    }
  }

  const togglePublished = async () => {
    setIsUpdating(true)
    try {
      await updateBlogPost(post.id, {
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null
      })
      if (onUpdate) {
        onUpdate()
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('公開状態の変更に失敗:', error)
      alert('公開状態の変更に失敗しました。')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-dark-800 border-white/20">
        <DropdownMenuItem asChild>
          <Link href={`/blog/${post.slug}/edit`} className="flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            編集
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={togglePublished}
          disabled={isUpdating}
        >
          {post.published ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              非公開にする
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              公開する
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem 
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-white/60 focus:text-white/80"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? '削除中...' : '削除'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}