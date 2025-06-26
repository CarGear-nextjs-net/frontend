"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "h-16 flex items-center px-4 border-b border-gray-200",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <Link href="/manager" className="font-bold text-xl">
            Admin
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                          pathname === item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          collapsed ? "justify-center" : "justify-between"
                        )}
                        onClick={() => item.subItems && !collapsed && toggleMenu(item.title)}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                        {!collapsed && item.subItems && (
                          <span>
                            {openMenus[item.title] ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </span>
                        )}
                      </Link>

                      {/* Submenu */}
                      {!collapsed && item.subItems && openMenus[item.title] && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.subItems.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={cn(
                                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                                  pathname === sub.href
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                  collapsed ? "justify-center" : "justify-between"
                                )}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full flex items-center text-red-600 hover:text-red-700 hover:bg-red-50",
                  collapsed ? "justify-center" : ""
                )}
              >
                <LogOut size={18} />
                {!collapsed && <span className="ml-2">Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}

const navItems = [
  {
    title: "Dashboard",
    href: "/manager",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Products",
    href: "/manager/products",
    icon: <Package size={20} />,
    subItems: [
      {
        title: "All Products",
        href: "/manager/products",
      },
      {
        title: "Add New",
        href: "/manager/products/create",
      },
      {
        title: "Categories",
        href: "/manager/categories",
      },
    ],
  },
  {
    title: "Orders",
    href: "/manager/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    title: "Customers",
    href: "/manager/customers",
    icon: <Users size={20} />,
  },
  // {
  //     title: "Reports",
  //     href: "/manager/reports",
  //     icon: <BarChart3 size={20} />,
  // },
  {
    title: "Content",
    href: "/manager/content",
    icon: <FileText size={20} />,
  },
  // {
  //     title: "Settings",
  //     href: "/manager/settings",
  //     icon: <Settings size={20} />,
  // },
];
