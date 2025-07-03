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

const NavigationMenuComponent = ({ menu, className = "" }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu className={cn("flex gap-4 h-full [&_div]:w-full", className)}>
      <NavigationMenuList className="justify-normal flex flex-col">
        {menu.map((item, index) => (
          <NavigationMenuItem key={item.label} className={cn("relative w-[200px] w-full cursor-pointer")}>
            {item.children && item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    " hover:!text-white cursor-pointer hover:bg-red-500 hover:font-semibold data-[state=open]:bg-red-500  data-[state=open]:!text-white data-[state=open]:font-bold !rounded-none w-full",
                 
                  )}
                  isNotShowIcon={false}
                >
                  <span className="line-clamp-1 text-current"> {item.label} </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-full top-0 z-50 w-fit !rounded-none min-w-144 min-h-96">
                  <ul className="grid grid-cols-4">
                    {item.children.map((child) => (
                      <li key={child.label} className="col-span-1">
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href || "#"}
                            className="relative block px-3 py-2  hover:!text-red-500 hover:font-semibold transition text-center h-[2.5rem] !rounded-none line-clamp-1"
                          >
                            <span className="line-clamp-1 text-current">{child.label}</span>
                            <ChevronRight className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-[#cccccc]" />
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
                    "px-3 py-2 !rounded-none hover:bg-red-500 hover:!text-white hover:font-semibold transition flex justify-center items-center w-full",

                  )}
                >
                  <span className="line-clamp-1 text-current"> {item.label}</span>
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
