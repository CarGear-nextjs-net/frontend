"use client"

import { useState } from "react"
import { ThumbsUp, Heart, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ArticleReactions({ articleId }) {
    const [reactions, setReactions] = useState({
        likes: 156,
        loves: 89,
        bookmarks: 42,
    })

    const [userReactions, setUserReactions] = useState({
        liked: false,
        loved: false,
        bookmarked: false,
    })

    const handleReaction = (type) => {
        setUserReactions((prev) => {
            const newState = { ...prev }
            newState[type] = !prev[type]

            setReactions((prevReactions) => {
                const newReactions = { ...prevReactions }
                if (newState[type]) {
                    newReactions[`${type}s`]++
                } else {
                    newReactions[`${type}s`]--
                }
                return newReactions
            })

            return newState
        })
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${userReactions.liked ? "text-blue-600" : "text-gray-600"}`}
                    onClick={() => handleReaction("liked")}
                >
                    <ThumbsUp className={`h-5 w-5 ${userReactions.liked ? "fill-blue-600" : ""}`} />
                    <span>{reactions.likes}</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${userReactions.loved ? "text-red-600" : "text-gray-600"}`}
                    onClick={() => handleReaction("loved")}
                >
                    <Heart className={`h-5 w-5 ${userReactions.loved ? "fill-red-600" : ""}`} />
                    <span>{reactions.loves}</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${userReactions.bookmarked ? "text-yellow-600" : "text-gray-600"}`}
                    onClick={() => handleReaction("bookmarked")}
                >
                    <Bookmark className={`h-5 w-5 ${userReactions.bookmarked ? "fill-yellow-600" : ""}`} />
                    <span>{reactions.bookmarks}</span>
                </Button>
            </div>

            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                <Share2 className="h-5 w-5" />
                <span>Chia sẻ</span>
            </Button>
        </div>
    )
}
