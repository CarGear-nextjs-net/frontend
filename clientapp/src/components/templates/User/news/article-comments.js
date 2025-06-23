"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Flag } from "lucide-react"

// Giả lập dữ liệu bình luận
const COMMENTS = [
    {
        id: "comment-1",
        author: {
            name: "Trần Văn Bình",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
            "Bài viết rất hay và cung cấp nhiều thông tin hữu ích. Tôi đang rất quan tâm đến các cơ hội hợp tác công nghệ này.",
        createdAt: "2023-06-15T09:30:00Z",
        likes: 12,
        replies: [
            {
                id: "reply-1",
                author: {
                    name: "Lê Thị Hương",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content: "Đồng ý với bạn. Tôi nghĩ đây là cơ hội tốt cho các doanh nghiệp công nghệ Việt Nam.",
                createdAt: "2023-06-15T10:15:00Z",
                likes: 5,
            },
        ],
    },
    {
        id: "comment-2",
        author: {
            name: "Phạm Minh Đức",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
            "Tôi muốn biết thêm về các điều kiện để doanh nghiệp nhỏ có thể tham gia vào các dự án hợp tác này. Có ai có thông tin không?",
        createdAt: "2023-06-15T11:45:00Z",
        likes: 8,
        replies: [],
    },
]

export default function ArticleComments({ articleId }) {
    const [comments, setComments] = useState(COMMENTS)
    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState(null)
    const [replyContent, setReplyContent] = useState("")

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const comment = {
            id: `comment-${Date.now()}`,
            author: {
                name: "Người dùng",
                avatar: "/placeholder.svg?height=40&width=40",
            },
            content: newComment,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
        }

        setComments([comment, ...comments])
        setNewComment("")
    }

    const handleSubmitReply = (commentId) => {
        if (!replyContent.trim()) return

        const reply = {
            id: `reply-${Date.now()}`,
            author: {
                name: "Người dùng",
                avatar: "/placeholder.svg?height=40&width=40",
            },
            content: replyContent,
            createdAt: new Date().toISOString(),
            likes: 0,
        }

        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, reply],
                }
            }
            return comment
        })

        setComments(updatedComments)
        setReplyContent("")
        setReplyingTo(null)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("vi-VN", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        }).format(date)
    }

    return (
        <div className="space-y-6">
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
                <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <Textarea
                            placeholder="Viết bình luận của bạn..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="mb-2 min-h-[100px]"
                        />
                        <Button type="submit" className="bg-red-600 hover:bg-red-700">
                            Gửi bình luận
                        </Button>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-6">
                        {/* Comment */}
                        <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium">{comment.author.name}</h4>
                                    <time className="text-xs text-gray-500">{formatDate(comment.createdAt)}</time>
                                </div>
                                <p className="text-gray-700 mb-3">{comment.content}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <button className="flex items-center text-gray-500 hover:text-red-600">
                                        <ThumbsUp className="h-4 w-4 mr-1" />
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button
                                        className="flex items-center text-gray-500 hover:text-red-600"
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                    >
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>Trả lời</span>
                                    </button>
                                    <button className="flex items-center text-gray-500 hover:text-red-600">
                                        <Flag className="h-4 w-4 mr-1" />
                                        <span>Báo cáo</span>
                                    </button>
                                </div>

                                {/* Reply Form */}
                                {replyingTo === comment.id && (
                                    <div className="mt-4 flex gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <Textarea
                                                placeholder={`Trả lời ${comment.author.name}...`}
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                className="mb-2 min-h-[80px]"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <Button type="button" variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                                    Hủy
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="bg-red-600 hover:bg-red-700"
                                                    onClick={() => handleSubmitReply(comment.id)}
                                                >
                                                    Gửi
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                    <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                                                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h5 className="font-medium text-sm">{reply.author.name}</h5>
                                                        <time className="text-xs text-gray-500">{formatDate(reply.createdAt)}</time>
                                                    </div>
                                                    <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                                    <div className="flex items-center gap-4 text-xs">
                                                        <button className="flex items-center text-gray-500 hover:text-red-600">
                                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                                            <span>{reply.likes}</span>
                                                        </button>
                                                        <button className="flex items-center text-gray-500 hover:text-red-600">
                                                            <Flag className="h-3 w-3 mr-1" />
                                                            <span>Báo cáo</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
