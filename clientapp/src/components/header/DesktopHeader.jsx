'use client'
import {Menu, Phone, Search, ShoppingCart, User} from "lucide-react";
import CategoryMenu from "@/components/categories/CategoryMenu";
import Link from "next/link";
import { useState} from "react";
import {Button} from "@/components/ui/button.jsx"
import {usePathname} from "next/navigation";
import AuthModal from "@/components/AuthModal";

export default function DesktopHeader({categories=[],visitedUrls = []}) {
    const pathname = usePathname();
    return (
        <header className={`w-full `}>
            {/*<div className="bg-red-600 text-white py-2 px-4">*/}
            {/*    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">*/}
            {/*        <div className="flex items-center mb-2 md:mb-0">*/}
            {/*            <span className="text-yellow-300 font-bold mr-2">Mua online VƯỢT TRỘI</span>*/}
            {/*            <span className="text-white">DỊCH VỤ</span>*/}
            {/*        </div>*/}
            {/*        <div className="flex flex-wrap items-center justify-center">*/}
            {/*            <span className="text-yellow-300 font-bold mr-2">Ưu đãi đặc biệt!</span>*/}
            {/*            <span className="text-white">Ghế phòng họp - Bàn làm việc</span>*/}
            {/*            <Button className="bg-blue-500 text-white rounded-full px-4 py-1 ml-4 font-bold">ƯU ĐÃI SỐC!</Button>*/}
            {/*            <Button className="bg-white text-black rounded-full px-4 py-1 ml-2 font-bold">XEM NGAY</Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Main navigation  */}
            <div className="bg-red-600 text-white py-3 px-4 border-t border-red-500 sticky">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-3 md:mb-0">
                        <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-2">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="object-contain text-xs rounded-3xl text-gray-600"
                            />
                        </div>
                        <span className="text-yellow-300 text-xl font-bold">CarGear</span>

                    </div>
                    <CategoryMenu categories={categories} />
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-xl mx-4 w-full mb-3 md:mb-0">
                        <input type="text" placeholder="Bạn tìm gì..." className="w-full py-2 px-4 rounded-full text-black bg-white" />
                        <Button
                            variant={"outline-none"}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Search className="h-5 w-5 text-gray-500" />
                        </Button>
                    </div>

                    {/* Contact and account */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-1" />
                            <span>0974841508</span>
                        </div>
                        <div className="flex items-center">
                            <AuthModal/>
                        </div>
                        <div className="flex items-center">
                            <ShoppingCart className="h-5 w-5 mr-1" />
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary navigation */}
            <nav className="bg-white text-black shadow-md overflow-x-auto">
                <div className="container mx-auto flex justify-center items-center">
                    {visitedUrls && visitedUrls.map(({ title, url }, index) => (
                        <Link
                            key={index}
                            href={url}
                            className={`px-2 py-2 whitespace-nowrap hover:bg-gray-100 ${
                                pathname === url ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-700'
                            }`}
                        >
                            {title}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}