// app/not-found.jsx
"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
    const prevUrl = '/'
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Ooops...</h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Page not found</h2>
                    </div>
                    <p className="text-gray-600 max-w-md">
                        Trang bạn đang tìm kiếm không tồn tại. Quay lại trang trước nhé!
                    </p>
                    <Link
                        href={prevUrl || "/public"}
                        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-full transition-colors"
                    >
                        Go Back
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                <div className="relative">
                    <div className="relative z-10">
                        <div className="flex justify-end">
                            <div className="bg-gray-800 text-white p-4 rounded-lg inline-block mb-4">
                                <h2 className="text-6xl font-bold">404</h2>
                                <p className="text-lg">Page not found</p>
                            </div>
                        </div>
                        <Image
                            src={"/404.jpg"}
                            alt="404 illustration"
                            width={600}
                            height={400}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-20 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-70"></div>
                        <div className="absolute bottom-10 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-70"></div>
                        <div className="absolute top-40 left-0 w-16 h-16 bg-pink-200 rounded-full opacity-70"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
