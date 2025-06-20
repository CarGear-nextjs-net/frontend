"use client"

import { useState } from "react"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"
import {useRouter} from "next/navigation";

export default function Header({user}) {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const router = useRouter()
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
            {/* Mobile Menu Button */}
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="pl-8 bg-gray-50 border-gray-200 focus:bg-white" />
            </div>

            {/* Right Side Actions */}
            <div className="ml-auto flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-500">
                    <Bell size={20} />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"  className="rounded-full">
                            <User size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async ()=>{
                                localStorage.removeItem("user-profile");
                                localStorage.removeItem("accessToken");
                                router.push("/auth/logout")
                            }}
                            className="text-red-600"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    )
}
