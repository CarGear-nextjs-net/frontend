"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { GoogleButton } from "@/components/GoogleButton"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin")
            return
        }

        try {
            setIsLoading(true)
            // Đây là nơi bạn sẽ gọi API đăng nhập thực tế
            console.log("Đăng nhập với:", { email, password })

            // Giả lập đăng nhập thành công
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Chuyển hướng sau khi đăng nhập thành công
            // window.location.href = "/dashboard"
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Button variant="link" className="p-0 h-auto text-xs">
                        Quên mật khẩu?
                    </Button>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Hoặc tiếp tục với</span>
                </div>
            </div>

            <GoogleButton text="Đăng nhập với Google" />
        </form>
    )
}
