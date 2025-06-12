"use client";
import {
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  User2Icon,
} from "lucide-react";
import CategoryMenu from "@/components/categories/CategoryMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button.jsx";
import { redirect, usePathname, useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMemo } from "react";

export default function DesktopHeader({ categories = [], visitedUrls = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const userData = useMemo(() => {
    if (typeof window != undefined) {
      return JSON.parse(localStorage.getItem("user-profile"));
    }
    return null;
  }, [localStorage.getItem("user-profile")]);
  return (
    <header className={`w-full `}>
      {/* Main navigation  */}
      <div className="bg-red-600 text-white py-3 px-4 border-t border-red-500 sticky">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div
            className="flex items-center mb-3 md:mb-0  cursor-pointer"
            onClick={() => router.push("/")}
          >
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
            <input
              type="text"
              placeholder="Bạn tìm gì..."
              className="w-full py-2 px-4 rounded-full text-black bg-white"
            />
            <Button
              variant={"outline-none"}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
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
              {userData?.id ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex gap-2 cursor-pointer"
                    >
                      <User2Icon />
                      <div>{userData?.username}</div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-[99999]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {userData?.roleId === 1 && (
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/manager");
                        }}
                        className="cursor-pointer"
                      >
                        Manager
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="cursor-pointer">
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        localStorage.removeItem("user-profile");
                        localStorage.removeItem("accessToken");
                        router.push("/auth/logout");
                      }}
                      className="text-red-600 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <AuthModal />
              )}
            </div>
            <div className="flex items-center cursor-pointer">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Giỏ hàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      <nav className="bg-white text-black shadow-md overflow-x-auto">
        <div className="container mx-auto flex justify-center items-center">
          {visitedUrls &&
            visitedUrls.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className={`px-2 py-2 whitespace-nowrap hover:bg-gray-100 ${
                  pathname === url
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-700"
                }`}
              >
                {title}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}
