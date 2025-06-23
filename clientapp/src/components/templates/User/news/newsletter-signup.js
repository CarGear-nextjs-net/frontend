"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
            setEmail("")
        }, 1000)
    }

    return (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6">
            {!isSubmitted ? (
                <>
                    <div className="flex items-center mb-4">
                        <Mail className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="font-bold text-lg">Đăng ký nhận tin</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Nhận thông báo về các tin tức mới nhất và nổi bật nhất trong lĩnh vực công nghệ.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white"
                        />
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng ký"}
                        </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                        Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất kỳ lúc nào.
                    </p>
                </>
            ) : (
                <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Đăng ký thành công!</h3>
                    <p className="text-gray-600">
                        Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi những tin tức mới nhất đến email của bạn.
                    </p>
                </div>
            )}
        </div>
    )
}
