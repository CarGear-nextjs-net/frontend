"use client"

import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ShareButtons({ className = "" }) {
    const shareUrl = typeof window !== "undefined" ? window.location.href : ""

    const handleShare = (platform) => {
        let shareLink = ""

        switch (platform) {
            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                break
            case "twitter":
                shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
                break
            case "linkedin":
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                break
            case "copy":
                navigator.clipboard.writeText(shareUrl)
                toast.success("Đã sao chép liên kết vào clipboard")
                return
        }

        if (shareLink) {
            window.open(shareLink, "_blank", "width=600,height=400")
        }
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <h4 className="font-medium text-sm mb-2">Chia sẻ bài viết</h4>
            <div className="flex flex-col gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="justify-start bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                    onClick={() => handleShare("facebook")}
                >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="justify-start bg-sky-50 text-sky-600 hover:bg-sky-100 border-sky-200"
                    onClick={() => handleShare("twitter")}
                >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    onClick={() => handleShare("linkedin")}
                >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                </Button>

                <Button variant="outline" size="sm" className="justify-start" onClick={() => handleShare("copy")}>
                    <Link className="h-4 w-4 mr-2" />
                    Sao chép liên kết
                </Button>
            </div>
        </div>
    )
}
