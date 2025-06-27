"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CategoryMenu({ categories = [] }) {
    const [visible, setVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const timeoutRef = useRef(null)
    const router = useRouter()
    const showMenu = () => {
        clearTimeout(timeoutRef.current)
        setVisible(true)
    }

    const hideMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(false)
        }, 200)
    }

    return (
        <div
            className="relative inline-block z-50 text-gray-800 dark:text-gray-200"
            onMouseEnter={showMenu}
            onMouseLeave={hideMenu}
        >
            {/* Nút hiển thị menu */}
            <Button
                variant="outlined"
                className={`py-2 border-none transition bg-transparent text-white cursor-pointer ${
                    visible ? "text-gray-900 bg-white " : ""
                }`}
            >
                <Menu size={20} className="mr-2" />
                <span>Danh mục</span>
            </Button>

            {/* Menu thả xuống */}
            {visible && (
                <div className="absolute top-full left-0 mt-4 w-[700px] flex bg-white rounded-md shadow-lg border overflow-hidden">
                    {/* Danh mục cha */}
                    <div className="w-64 bg-gray-50 border-r   overflow-y-auto">
                        {categories.map(({ id, name,icon }, index) => (
                            <div
                                key={id}
                                onMouseEnter={() => setActiveIndex(index)} // Khi rê chuột, cập nhật item đang active
                                className={`px-4  py-3 cursor-pointer hover:bg-red-50 ${
                                    activeIndex === index
                                        ? "bg-white border-l-4 border-red-600 text-red-600 font-medium"
                                        : "border-b border-gray-100"
                                }`}
                            >
                                {name}
                            </div>

                        ))}
                    </div>

                    {/* Danh mục con */}
                    <div className="flex-1 bg-white p-4 max-h-96 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-4">
                            {categories[activeIndex]?.children?.map(({ id, name, icon }) => (
                                <div key={id} className="text-center hover:text-red-600 text-sm cursor-pointer group" onClick={() => router.push(`/products?category=${id}`)}>
                                    {icon && (
                                        <div className="w-14 h-14 mx-auto mb-1 overflow-hidden rounded-full group-hover:border-red-600 group-hover:border-2 transition-all duration-200">
                                            <img src={icon || "/placeholder.svg"} alt={name} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <span className="group-hover:font-medium">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
