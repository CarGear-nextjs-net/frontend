"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function TableOfContents({ toc }) {
    const [activeId, setActiveId] = useState("")
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "0px 0px -80% 0px" },
        )

        toc.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            toc.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [toc])

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div
                className="flex items-center justify-between font-medium mb-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>Mục lục</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
            </div>

            {isOpen && (
                <nav className="text-sm">
                    <ul className="space-y-1">
                        {toc.map((item) => (
                            <li key={item.id} className={`${item.level > 1 ? "ml-3" : ""}`}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block py-1 border-l-2 pl-2 hover:text-red-600 transition-colors ${
                                        activeId === item.id ? "border-red-600 text-red-600 font-medium" : "border-transparent"
                                    }`}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    )
}
