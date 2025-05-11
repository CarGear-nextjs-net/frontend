"use client"
import useMediaQuery from "@/hooks/useMediaQuery"
import MobileHeader from "@/components/header/MobileHeader"
import DesktopHeader from "@/components/header/DesktopHeader"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header({ data }) {
    const groups = data.groups
    const headerRef = useRef(null)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [isSticky, setIsSticky] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const isMobile = useMediaQuery("(max-width: 767px)")
    const pathname = usePathname()

    const visitedUrls = [
        { title: "Trang chủ", url: "/" },
        { title: "Giới thiệu", url: "/about" },
        { title: "Tin tức", url: "/news" },
        { title: "Sản phẩm", url: "/products" },
    ]

    // Các trang cần bật sticky
    const stickyEnabledPaths = ["/", "/about", "/news"]
    const isStickyEnabled = stickyEnabledPaths.includes(pathname)

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.getBoundingClientRect().height
            setHeaderHeight(height)
        }
    }, [])

    const handleScroll = () => {
        if (!isStickyEnabled) return // Không xử lý scroll nếu không áp dụng

        const currentScrollY = window.scrollY

        if (currentScrollY > headerHeight) {
            setIsSticky(true)
            setIsVisible(true)
        } else {
            setIsSticky(false)
        }
        setLastScrollY(currentScrollY)
    }

    useEffect(() => {
        if (isStickyEnabled) {
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollY, isStickyEnabled])

    return (
        <div
            ref={headerRef}
            className={`w-full transition-all duration-300 ease-in-out z-[9999]
                ${isSticky ? "fixed left-0 right-0 shadow-md" : "relative"} 
                ${isVisible ? "top-0" : "-translate-y-full"}`}
        >
            {!isMobile ? (
                <DesktopHeader groups={groups} visitedUrls={visitedUrls} />
            ) : (
                <MobileHeader groups={groups} visitedUrls={visitedUrls} />
            )}
        </div>
    )
}
