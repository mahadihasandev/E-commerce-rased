"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LogOut, Package2, ChevronDown, LogIn } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import OrderLogButton from "./OrderLogButton";
import { ORDER_QUERY_RESULT } from "@/types";

interface AuthNavProps {
  initialOrders?: ORDER_QUERY_RESULT | null;
}

export const AuthNav: React.FC<AuthNavProps> = ({ initialOrders = [] }) => {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isSignedIn, logout } = useAuth();

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />
    );
  }

  if (isSignedIn && user) {
    const initials = user.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "U";

    return (
      <div className="flex items-center gap-3" ref={dropdownRef}>
        <OrderLogButton order={initialOrders} />

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="User menu"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-shop_light_blue text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {initials}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
              {user.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <Link
                  href="/order"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-shop_light_blue transition-colors"
                >
                  <Package2 className="w-4 h-4 text-slate-400" />
                  My Orders
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-1.5 text-xs font-semibold text-shop_dark_blue hover:text-shop_light_blue hoverEffect py-1.5 px-3 rounded-xl border border-slate-200 hover:border-shop_light_blue transition-all"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </Link>
  );
};

export default AuthNav;
