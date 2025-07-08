"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AuthTabs } from "@/components/templates/Auth/login/AuthTabs"
import { Button } from "@/components/ui/button"
import {User} from "lucide-react";

export default function AuthModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outlined" color="primary" className='cursor-pointer'>
                    <User className="h-5 w-5 mr-1" />
                    <span>Đăng nhập</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent z-[1000]">
                <DialogTitle className="hidden">Auth Modal</DialogTitle>
                <AuthTabs setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}
