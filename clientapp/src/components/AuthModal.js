"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthTabs } from "@/components/login/AuthTabs"
import { Button } from "@/components/ui/button"
import {User} from "lucide-react";

export default function AuthModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outlined" color="primary">
                    <User className="h-5 w-5 mr-1" />
                    <span>Đăng nhập</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 border-none bg-transparent z-[1000]">
                <AuthTabs />
            </DialogContent>
        </Dialog>
    )
}
