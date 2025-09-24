"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/context/CartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import { usePathname } from "next/navigation"; // ✅ NEW

export default function Navbar() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Context undefined");
  const { numberOfCartItem } = context;
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // ✅ current route

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  // helper to mark active links
  const linkClass = (path: string) =>
    `hover:text-emerald-500 transition-colors ${
      pathname === path ? "text-emerald-500" : "text-gray-500"
    }`;

  return (
    <nav className="bg-[#F8F9FA]">
      <div className="container w-[95%] lg:w-[80%] mx-auto p-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* ---------- LEFT ---------- */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-700 font-bold text-xl mr-6"
            >
              <i className="fa-solid fa-cart-shopping text-2xl text-emerald-500"></i>
              Freshcart
            </Link>

            <ul className="hidden lg:flex gap-6 font-semibold">
              <li>
                <Link href="/" className={linkClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className={linkClass("/products")}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className={linkClass("/categories")}>
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className={linkClass("/brands")}>
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* ---------- RIGHT ---------- */}
          <div className="flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden mr-3 text-gray-600 focus:outline-none transition-transform duration-300 hover:text-gray-500"
            >
              <i
                className={`fa-solid ${
                  open ? "fa-xmark rotate-180" : "fa-bars rotate-0"
                } text-xl transition-transform duration-300`}
              />
            </button>

            <ul className="hidden lg:flex gap-4 items-center font-semibold">
              {!session ? (
                <>
                  <li>
                    <Link href="/register" className={linkClass("/register")}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className={linkClass("/login")}>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <UserMenu name={session.user?.name} />
                  </li>
                  <li className="flex items-center">
                    <Link href="/cart" className={linkClass("/cart")}>
                      Cart
                    </Link>
                    {numberOfCartItem > 0 && (
                      <Badge className="h-5 min-w-5 rounded-full px-1 ms-2 font-mono tabular-nums bg-emerald-500">
                        {numberOfCartItem}
                      </Badge>
                    )}
                  </li>
                  <li className="flex items-center h-6">
                    <Separator orientation="vertical" />
                  </li>
                  <li>
                    <span
                      onClick={logout}
                      className="cursor-pointer text-gray-500 hover:text-emerald-500"
                    >
                      SignOut
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* ---------- Mobile Menu ---------- */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-2 font-semibold">
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className={linkClass("/products")}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className={linkClass("/categories")}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className={linkClass("/brands")}>
                Brands
              </Link>
            </li>
            <li className="flex items-center">
              <Separator orientation="horizontal" />
            </li>

            {!session ? (
              <>
                <li>
                  <Link href="/register" className={linkClass("/register")}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/login" className={linkClass("/login")}>
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-gray-500 font-semibold flex gap-1">
                  <span>Hi</span>
                  {session?.user.name}
                </li>
                <ul className="flex flex-col gap-2">
                  <ul className="flex gap-2 items-center">
                    <li>
                      <Link href="/profile" className={linkClass("/profile")}>
                        Profile
                      </Link>
                    </li>
                    <li className="flex items-center h-6">
                      <Separator orientation="vertical" />
                    </li>
                    <li>
                      <Link
                        href="/allorders"
                        className={linkClass("/allorders")}
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="flex items-center h-6">
                      <Separator orientation="vertical" />
                    </li>
                    <li>
                      <Link href="/wishlist" className={linkClass("/wishlist")}>
                        Wishlist
                      </Link>
                    </li>
                  </ul>
                  <li className="flex items-center h-1">
                    <Separator orientation="horizontal" />
                  </li>
                  <ul className="flex gap-3 justify-between">
                    <li className="flex items-center">
                      <Link href="/cart" className={linkClass("/cart")}>
                        Cart
                      </Link>
                      {numberOfCartItem > 0 && (
                        <Badge className="h-5 min-w-5 rounded-full px-1 ms-2 font-mono tabular-nums bg-emerald-500">
                          {numberOfCartItem}
                        </Badge>
                      )}
                    </li>
                    <li>
                      <span
                        onClick={logout}
                        className="cursor-pointer text-gray-500 hover:text-emerald-500"
                      >
                        SignOut
                      </span>
                    </li>
                  </ul>
                </ul>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
