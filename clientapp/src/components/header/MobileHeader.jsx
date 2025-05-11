"use client"

import { useState, useEffect } from "react"
import { Search, Menu, Phone, MapPin, ChevronDown, ChevronRight, X, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import {usePathname} from "next/navigation";

export default function MobileHeader({ groups = [],visitedUrls=[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(true)
    const pathname = usePathname();
    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [mobileMenuOpen])

    return (
        <header className="w-full">
            {/* Promo banner */}
            {/*<div className="bg-red-600 text-white py-2 px-4 flex justify-between items-center">*/}
            {/*    <span className="text-yellow-300 font-bold">Ưu đãi đặc biệt!</span>*/}
            {/*    <button className="bg-white text-black rounded-full px-4 py-1 font-bold text-sm">XEM NGAY</button>*/}
            {/*</div>*/}

            {/* Main header */}
            <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-2">
                        <span className="text-xs text-gray-600">stana</span>
                    </div>
                    <button className="ml-2" onClick={() => setMobileMenuOpen(true)}>
                        <Menu className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Search bar */}
                <div className="flex-1 mx-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Bạn tìm gì..."
                            className="w-full py-2 bg-white px-4 pr-10 rounded-full text-black text-sm"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Search className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-2">
                    <button className="text-white">
                        <Phone className="h-5 w-5" />
                    </button>
                    <button className="text-white">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <nav className="bg-white text-black shadow-md overflow-x-auto">
                <div className="container mx-auto flex  items-center">
                    {visitedUrls.map(({title,url}, index) => (
                        <Link
                            key={index}
                            href={url}
                            className={`px-2 py-2 whitespace-nowrap hover:bg-gray-100 ${
                                pathname === url ? 'text-red-600' : 'text-gray-700'
                            }`}
                        >
                            {title}
                        </Link>
                    ))}
                </div>
            </nav>
            {/* Mobile menu overlay */}
            <Transition
                show={mobileMenuOpen}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-100 translate-x-[-100%]"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-[-100%]"
            >
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 z-50">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white h-full w-[85%] max-w-sm flex flex-col">
                        {/* Menu header */}
                        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-2">
                                    <span className="text-xs text-gray-600">stana</span>
                                </div>
                                <span className="text-xl font-bold text-white">CarGear</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        {/* Menu content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Login button */}
                            <Link
                                href="/login"
                                className="flex items-center justify-center border border-red-500 rounded-full mx-4 my-4 p-3 text-red-600"
                            >
                                <User className="h-5 w-5 mr-2" />
                                <span>Đăng nhập / Đăng ký</span>
                            </Link>

                            {/* Location */}
                            <div className="flex items-center justify-between px-6 py-3 border-b">
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-red-600 mr-2" />
                                    <span className="text-gray-800">Hồ Chí Minh</span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>

                            {/* Categories */}
                            <div className="border-b">
                                <HeadlessMenu as="div" className="w-full">
                                    <HeadlessMenu.Button
                                        onClick={() => setCategoryOpen(!categoryOpen)}
                                        className="flex items-center justify-between w-full px-6 py-4"
                                    >
                                        <span className="font-semibold text-gray-800">Danh mục sản phẩm</span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-gray-600 transition-transform ${categoryOpen ? "transform rotate-180" : ""}`}
                                        />
                                    </HeadlessMenu.Button>

                                    {categoryOpen && (
                                        <div className="pb-2">
                                            {groups && groups.length > 0 && groups.map((group, i) => (
                                                <Link key={i} href="/#" className="flex items-center justify-between px-6 py-3">
                                                    <span className="text-gray-800">{group.name}</span>
                                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </HeadlessMenu>
                            </div>

                            <div className={"flex flex-col"}>
                                {visitedUrls.map(({title,url}, index) => (
                                    <Link
                                        onClick={() => setMobileMenuOpen(false)}
                                        key={index}
                                        href={url}
                                        className={`px-2 py-2 whitespace-nowrap hover:bg-gray-100 ${
                                            pathname === url ? 'text-red-600' : 'text-gray-700'
                                        }`}
                                    >
                                        {title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>

        </header>
    )
}
