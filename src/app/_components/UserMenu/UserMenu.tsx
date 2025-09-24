import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function UserMenu({ name }: { name?: string }) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-500 font-semibold bg-transparent flex gap-1">
              <span>Hi</span>
              {name}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <NavigationMenuLink asChild className="w-[120px]">
                <Link href="/profile">Profile</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className="w-[120px]">
                <Link href="/allorders">Orders</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className="w-[120px]">
                <Link href="/wishlist">Wishlist</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
