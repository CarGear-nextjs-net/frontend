"use client";
import DesktopHeader from "@/components/templates/Layout/header/DesktopHeader";
import MobileHeader from "@/components/templates/Layout/header/MobileHeader";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useUserProfileStore } from "@/stores";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header({ data }) {
  const categories = data.categories;
  const headerRef = useRef(null);
  const { userStore } = useUserProfileStore();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();
  const visitedUrls = [
    { title: "Giới thiệu", url: "/about" },
    { title: "Tin tức", url: "/blogs" },
    { title: "Chính sách", url: "/policies" },
  ];

  // Các trang cần bật sticky
  const stickyEnabledPaths = ["/", "/about", "/news"];
  const isStickyEnabled = stickyEnabledPaths.includes(pathname);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.getBoundingClientRect().height;
      setHeaderHeight(height);
    }
  }, []);

  useEffect(() => {
    if (userStore?.customerId) {
      fetch(`/api/cart/sync?userID=${userStore.customerId}`);
    }
  }, [userStore]);

  const handleScroll = () => {
    if (!isStickyEnabled) return; // Không xử lý scroll nếu không áp dụng

    const currentScrollY = window.scrollY;

    if (currentScrollY > headerHeight) {
      setIsSticky(true);
      setIsVisible(true);
    } else {
      setIsSticky(false);
    }
    setLastScrollY(currentScrollY);
  };
  useEffect(() => {
    // Reset state khi pathname thay đổi (chuyển trang)
    setIsSticky(false);
    setIsVisible(true);
    setLastScrollY(0);

    // Scroll lên đầu trang nếu cần
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (isStickyEnabled) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY, isStickyEnabled]);

  return (
    <div
      ref={headerRef}
      className={`w-full transition-all duration-300 ease-in-out z-[9999]
                ${isSticky ? "fixed left-0 right-0 shadow-md" : "relative"} 
                ${isVisible ? "top-0" : "-translate-y-full"}`}
    >
      {!isMobile ? (
        <DesktopHeader categories={categories} visitedUrls={visitedUrls} />
      ) : (
        <MobileHeader categories={categories} visitedUrls={visitedUrls} />
      )}
    </div>
  );
}
