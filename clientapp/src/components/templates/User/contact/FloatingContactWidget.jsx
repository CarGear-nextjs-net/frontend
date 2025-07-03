"use client"

import { useState } from "react"
import { MessageCircle, Phone, ChevronDown } from "lucide-react"
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton"

export default function FloatingContactWidget() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const contactOptions = [
        {
            id: "messenger",
            name: "Messenger",
            icon: <MessageCircle size={24} />,
            color: "#0084FF",
            link: "https://m.me/yourpageusername",
        },
        {
            id: "zalo",
            name: "Zalo",
            icon: (
                <span className="font-bold text-sm leading-none">Zalo</span>
            ),
            color: "#0068FF",
            link: "https://zalo.me/yourphonenumber",
        },
        {
            id: "phone",
            name: "Call Us",
            icon: <Phone size={24} />,
            color: "#25D366",
            link: "tel:+84123456789",
        },
    ]

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            <div>
                <ScrollToTopButton />
            </div>

            {!isCollapsed &&
                contactOptions.map((option) => (
                    <a
                        key={option.id}
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={option.name}
                        className="rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform duration-200"
                        style={{ backgroundColor: option.color }}
                    >
                        {option.icon}
                    </a>
                ))}

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand contact options" : "Collapse contact options"}
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md border-0 transition-all duration-200 ${
                    isCollapsed ? "bg-green-500 text-white" : "bg-white text-green-500"
                }`}
            >
                {isCollapsed ? <Phone size={16} /> : <ChevronDown size={16} />}
            </button>
        </div>
    )
}
