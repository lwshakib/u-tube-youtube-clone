"use client";

import Image from "next/image";
import { Bell, Menu, Mic, Plus, Search } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/5 bg-[#0f0f0f]/90 backdrop-blur-lg">
      <div className="flex h-14 items-center gap-4 px-3 sm:px-6">
        <div className="flex items-center gap-3">
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
              <span className="text-[11px] font-normal text-[#aaa]">BD</span>
            </div>
          </div>
        </div>

        <form className="ml-auto flex flex-1 items-center gap-2 sm:ml-0 sm:max-w-2xl">
          <div className="flex flex-1 items-center overflow-hidden rounded-full border border-[#303030] bg-[#181818]">
            <input
              type="search"
              aria-label="Search"
              placeholder="Search"
              className="flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#aaa]"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="flex h-10 w-14 items-center justify-center border-l border-[#303030] bg-[#222222] text-white hover:bg-[#2f2f2f]"
            >
              <Search size={18} />
            </button>
          </div>
          <button
            type="button"
            aria-label="Search with voice"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white hover:bg-white/10"
          >
            <Mic size={18} />
          </button>
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 md:flex"
          >
            <Plus size={18} />
            Create
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white hover:bg-white/10"
          >
            <Bell size={18} />
          </button>
          <Image
            src="https://i.pravatar.cc/64?img=10"
            alt="Profile avatar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            unoptimized
          />
        </div>
      </div>
    </header>
  );
};

export default Header;


