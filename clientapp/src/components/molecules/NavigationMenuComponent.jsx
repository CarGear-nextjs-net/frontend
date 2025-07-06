"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const NavigationMenuComponent = ({ menu, className = "" }) => {

  return (
    <NavigationMenu className={cn("relative flex gap-4 h-full [&_div]:w-full z-50", className)}>
      <NavigationMenuList className="justify-start items-start flex flex-col max-h-[500px] overflow-y-auto overflow-x-hidden">
        {menu.map((item) => (
          <NavigationMenuItem key={item.id} className={cn(" w-[200px] w-full cursor-pointer ")}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    " hover:!text-red-500 cursor-pointer data-[state=open]:!text-red-500 !rounded-none w-full",
                    "justify-between items-center"
                  )}
                  isNotShowIcon={false}
                >
                  <span className="line-clamp-1 w-full text-left"> {item.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#cccccc]" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-full top-0 z-50 w-fit !rounded-none min-w-200 h-100">
                  <ul className="grid grid-cols-6">
                    {item.children.map((child) => (
                      <li key={child.id} className="col-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href || "#"}
                            className="relative group flex flex-col items-center justify-center block px-3 py-2 hover:bg-white hover:!text-red-500 hover:underline text-center !rounded-none line-clamp-1"
                          >
                            <Image src={"/placeholder.svg"} alt={child.name} width={40} height={40} className='rounded-full' />
                            <span className="line-clamp-1 text-current text-sm mt-2">{child.name}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "px-3 py-2 !rounded-none hover:!text-red-500 transition flex justify-center items-center w-full",
 "justify-start"
                  )}
                >
                  <span className="line-clamp-1 text-current"> {item.name}</span>
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

NavigationMenuComponent.displayName = "NavigationMenuComponent";

export default NavigationMenuComponent;
