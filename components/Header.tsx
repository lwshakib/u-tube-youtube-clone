"use client";

import {
  ArrowLeft,
  Bell,
  Menu,
  Mic,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import type { User } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

type HeaderProps = {
  onMenuClick: () => void;
  user?: User | null;
};

const Header = ({ onMenuClick, user }: HeaderProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && showMobileSearch) {
        setShowMobileSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileSearch]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/5 bg-[#0f0f0f]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full items-center gap-3 px-3 sm:px-6">
        {!showMobileSearch ? (
          <>
            <div className="flex w-[150px] flex-shrink-0 items-center gap-3 sm:w-[180px]">
              <button
                type="button"
                aria-label="Toggle sidebar"
                onClick={onMenuClick}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
              >
                <Menu size={22} />
              </button>
              <div className="flex items-center gap-1">
                <FaYoutube className="h-6 w-8 text-[#ff0000]" />
                <div className="flex items-end gap-1 text-base font-semibold tracking-tight">
                  <span>YouTube</span>
                  <span className="text-[11px] font-normal text-[#aaa]">
                    BD
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
              <form
                className="flex w-full max-w-[620px] items-center gap-2"
                role="search"
              >
                <div className="group flex w-full items-center overflow-hidden rounded-full border border-[#303030] bg-[#121212] focus-within:border-[#3ea6ff]">
                  <input
                    type="search"
                    aria-label="Search"
                    placeholder="Search"
                    className="flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#aaa]"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="flex h-10 w-16 items-center justify-center border-l border-[#303030] bg-[#222222] text-white transition-colors hover:bg-[#2f2f2f]"
                  >
                    <Search size={20} />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Search with voice"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#222222] text-white transition-colors hover:bg-white/20"
                >
                  <Mic size={18} />
                </button>
              </form>
            </div>

            <div className="flex flex-1 items-center justify-end gap-1 sm:w-[200px] sm:flex-none sm:gap-2">
              <button
                type="button"
                aria-label="Open search"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white transition-colors hover:bg-white/15 md:hidden"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                aria-label="Voice search"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white transition-colors hover:bg-white/15 md:hidden"
              >
                <Mic size={20} />
              </button>
              {user ? (
                <>
                  <button
                    type="button"
                    aria-label="Create"
                    className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 md:flex"
                  >
                    <Plus size={18} />
                    Create
                  </button>
                  <button
                    type="button"
                    aria-label="Notifications"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white transition-colors hover:bg-white/15"
                  >
                    <Bell size={20} />
                  </button>
                  <Image
                    src={user.image ?? "https://i.pravatar.cc/64?img=10"}
                    alt={user.name ?? "Profile avatar"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                    unoptimized
                  />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <UserRound size={18} />
                  Sign in
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex w-full items-center gap-2 sm:hidden">
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setShowMobileSearch(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Search with voice"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white transition-colors hover:bg-white/15"
            >
              <Mic size={18} />
            </button>
            <div className="flex flex-1 items-center overflow-hidden rounded-full border border-[#303030] bg-[#121212]">
              <input
                type="search"
                aria-label="Search"
                placeholder="Search YouTube"
                autoFocus
                className="flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#aaa]"
              />
              <button
                type="button"
                aria-label="Submit search"
                className="flex h-10 w-12 items-center justify-center border-l border-[#303030] bg-[#222222] text-white transition-colors hover:bg-[#2f2f2f]"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
