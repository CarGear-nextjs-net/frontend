"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Blogs({ title = "Tin tức", blogs }) {
    const containerRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const [itemWidth, setItemWidth] = useState(280) // default width

    const updateItemWidth = () => {
        const container = containerRef.current
        if (container) {
            const width = container.clientWidth
            let itemsPerRow = 4
            if (width < 1024) itemsPerRow = 3
            if (width < 768) itemsPerRow = 2

            const gap = 16 // 1rem gap
            const totalGap = gap * (itemsPerRow - 1)
            const calculatedWidth = Math.floor((width - totalGap) / itemsPerRow)

            setItemWidth(calculatedWidth)
        }
    }

    const checkScrollability = () => {
        const container = containerRef.current
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
        }
    }

    const scroll = (direction) => {
        const container = containerRef.current
        if (container) {
            const scrollAmount = container.clientWidth * 0.8
            if (direction === "left") {
                container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            updateItemWidth()
            checkScrollability()
            container.addEventListener("scroll", checkScrollability)

            const resizeObserver = new ResizeObserver(() => {
                updateItemWidth()
                checkScrollability()
            })

            resizeObserver.observe(container)

            return () => {
                container.removeEventListener("scroll", checkScrollability)
                resizeObserver.disconnect()
            }
        }
    }, [])

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <div className="h-px bg-gray-200 w-full"></div>
            </div>

            <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-transparent text-dark flex items-center justify-center transition-opacity duration-300 ${
                        !canScrollLeft ? "cursor-not-allowed" : ""
                    } ${isHovering ? "opacity-100" : "opacity-0"}`}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft className={`w-6 h-6 ${!canScrollLeft ? "opacity-50" : ""}`} />
                </button>

                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {blogs.map(({id,title,image,slug},index) => (
                        <div
                            key={index}
                            style={{ width: `${itemWidth}px` }}
                            className="flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-white"
                        >
                            <Link href={`/news/${slug}`} className="block">
                                <div className="relative h-[200px] w-full bg-gray-100">
                                    {/* <Image
                                        src={image || "/placeholder.svg"}
                                        alt={title || "new"}
                                        fill
                                        className="object-cover"
                                    /> */}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-center font-medium text-sm mb-3 min-h-[40px] line-clamp-2">
                                        {title || "title"}
                                    </h3>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full text-dark bg-transparent flex items-center justify-center  transition-opacity duration-300 ${
                        !canScrollRight ? "cursor-not-allowed" : ""
                    } ${isHovering ? "opacity-100" : "opacity-0"}`}
                    disabled={!canScrollRight}
                >
                    <ChevronRight className={`w-6 h-6 ${!canScrollRight ? "opacity-50" : ""}`} />
                </button>
            </div>
        </div>
    )
}
