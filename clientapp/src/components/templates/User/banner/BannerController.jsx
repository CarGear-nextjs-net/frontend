"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
export default function BannerController({ blogs = [] }) {
    const featuredBlogs = blogs.filter((b) => b.isFeatured)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (featuredBlogs.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === featuredBlogs.length - 1 ? 0 : prevIndex + 1))
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [featuredBlogs.length])

    // Navigation functions
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredBlogs.length - 1 : prevIndex - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === featuredBlogs.length - 1 ? 0 : prevIndex + 1))
    }

    if (featuredBlogs.length === 0) return null

    return (
        <div className="w-[1000px] relative z-10 pt-[36px] h-full">
            {/* Carousel container */}
            <div className="relative w-full h-full">
                {featuredBlogs.map((blog, index) => (
                    <div
                        key={blog.articleId}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        {/* Image */}
                        <Image src={`/api/images/${blog.image}`} fill alt={blog.title} className="object-cover w-full h-full" />

                        {/* <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/70 to-transparent text-white z-10">
                            <div className="container mx-auto">
                                <h1 className="text-2xl md:text-4xl font-bold mb-2">{blog.title}</h1>
                                <p className="text-base md:text-xl">{blog.summary}</p>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            {featuredBlogs.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Indicators */}
            {featuredBlogs.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {featuredBlogs.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
