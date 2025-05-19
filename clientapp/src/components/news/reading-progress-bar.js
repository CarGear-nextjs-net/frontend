"use client"

import { useState, useEffect } from "react"

export default function ReadingProgressBar() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercentage = (scrollTop / scrollHeight) * 100
            setWidth(scrollPercentage)
        }

        window.addEventListener("scroll", updateProgress)
        return () => window.removeEventListener("scroll", updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
            <div className="h-full bg-red-600 transition-all duration-150" style={{ width: `${width}%` }} />
        </div>
    )
}
