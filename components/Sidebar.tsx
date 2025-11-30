"use client";

import type { Subscription } from "@/lib/mockData";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clapperboard,
  Clock3,
  GraduationCap,
  History,
  Home,
  ListVideo,
  PlaySquare,
  PlusSquare,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
  subscriptions?: Subscription[];
  hasUser?: boolean;
};

const primaryNav = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Shorts", icon: Clapperboard, href: "/shorts" },
  { label: "Subscriptions", icon: PlaySquare, href: "/feed/subscriptions" },
];

const youNav = [
  { label: "History", icon: History },
  { label: "Playlists", icon: ListVideo },
  { label: "Your videos", icon: PlusSquare },
  { label: "Your courses", icon: GraduationCap },
  { label: "Watch later", icon: Clock3 },
  { label: "Liked videos", icon: ThumbsUp },
];

const Sidebar = ({
  isOpen,
  isCollapsed,
  isMobile,
  onClose,
  subscriptions,
  hasUser,
}: SidebarProps) => {
  const [expanded, setExpanded] = useState(false);
  const collapsed = !isMobile && isCollapsed;
  const pathname = usePathname();

  const [fetchedSubscriptions, setFetchedSubscriptions] = useState<
    Subscription[]
  >(subscriptions ?? []);

  useEffect(() => {
    if (!hasUser) return;

    const fetchSubscriptions = async () => {
      try {
        const res = await fetch("/api/subscriptions/list");

        if (!res.ok) {
          console.error(
            "Failed to fetch YouTube subscriptions from API route",
            await res.text()
          );
          return;
        }

        const data = await res.json();
        const items = (data?.items ?? []) as Array<{
          snippet?: {
            title?: string;
            thumbnails?: {
              default?: { url?: string };
              high?: { url?: string };
            };
          };
        }>;

        const mapped: Subscription[] = items.map((item) => ({
          name: item.snippet?.title ?? "Unknown channel",
          avatar:
            item.snippet?.thumbnails?.default?.url ??
            item.snippet?.thumbnails?.high?.url ??
            "https://i.pravatar.cc/64?img=10",
          isLive: false,
        }));

        if (mapped.length > 0) {
          setFetchedSubscriptions(mapped);
        }
      } catch (error) {
        console.error(
          "Error fetching YouTube subscriptions from API route",
          error
        );
      }
    };

    void fetchSubscriptions();
  }, [hasUser]);

  const primaryItems = useMemo(
    () =>
      hasUser
        ? primaryNav
        : primaryNav.filter(
            (item) => item.label === "Home" || item.label === "Shorts"
          ),
    [hasUser]
  );

  const visibleSubscriptions = useMemo(
    () => (expanded ? fetchedSubscriptions : fetchedSubscriptions.slice(0, 7)),
    [expanded, fetchedSubscriptions]
  );

  const navContent = (
    <div className="flex h-full flex-col overflow-hidden ">
      <div className="sidebar-scrollbar flex-1 overflow-y-auto px-2 py-4">
        <nav className="flex flex-col gap-2">
          {primaryItems.map((item) => (
            <SidebarButton
              key={item.label}
              label={item.label}
              Icon={item.icon}
              isActive={pathname === item.href}
              isCollapsed={collapsed}
              href={item.href}
            />
          ))}
        </nav>

        {hasUser && (
          <>
            <Separator isCollapsed={collapsed} />

            <SectionLabel isCollapsed={collapsed} label="You" />
            <nav className="mt-2 flex flex-col gap-1">
              {youNav.map((item) => (
                <SidebarButton
                  key={item.label}
                  label={item.label}
                  Icon={item.icon}
                  isCollapsed={collapsed}
                />
              ))}
            </nav>

            <Separator isCollapsed={collapsed} />

            <SectionLabel isCollapsed={collapsed} label="Subscriptions" />
            <div className="mt-2 flex flex-col gap-1">
              {visibleSubscriptions.map((sub) => (
                <button
                  key={sub.name}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${
                    collapsed ? "justify-center" : ""
                  }`}
                  aria-label={collapsed ? sub.name : undefined}
                >
                  <Image
                    src={sub.avatar}
                    alt={sub.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                    unoptimized
                  />
                  <div
                    className={`flex flex-1 items-center text-left text-[13px] ${
                      collapsed ? "sr-only" : ""
                    }`}
                  >
                    <span className="truncate">{sub.name}</span>
                    {sub.isLive && (
                      <span className="ml-2 rounded-full bg-red-600 px-2 text-[10px] font-semibold uppercase">
                        Live
                      </span>
                    )}
                  </div>
                </button>
              ))}
              <button
                type="button"
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 ${
                  collapsed ? "justify-center" : ""
                }`}
                onClick={() => setExpanded((prev) => !prev)}
                aria-label="Toggle subscriptions"
              >
                <ChevronDown
                  className={`h-5 w-5 text-white/70 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
                <span className={collapsed ? "sr-only" : ""}>
                  {expanded ? "Show less" : "Show more"}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="px-3 pb-4 text-[11px] text-white/50">
        {!collapsed && (
          <p>© {new Date().getFullYear()} YouTube Clone • Built with Next.js</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="sticky top-14 hidden h-[calc(100vh-56px)] shrink-0 overflow-hidden border-r border-white/5 bg-[#0f0f0f] lg:flex"
        aria-label="Sidebar"
      >
        {navContent}
      </motion.aside>

      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-label="Close sidebar"
            />
            <motion.aside
              className="fixed bottom-0 left-0 z-50 h-[calc(100vh-56px)] w-[240px] bg-[#0f0f0f]"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

type SidebarButtonProps = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  isActive?: boolean;
  isCollapsed: boolean;
  href?: string;
};

const SidebarButton = ({
  label,
  Icon,
  isActive,
  isCollapsed,
  href,
}: SidebarButtonProps) => (
  <>
    {href ? (
      <Link
        href={href}
        aria-label={isCollapsed ? label : undefined}
        className={`flex w-full items-center gap-4 rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/10"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className="h-5 w-5" />
        <span className={isCollapsed ? "sr-only" : "whitespace-nowrap"}>
          {label}
        </span>
      </Link>
    ) : (
      <button
        type="button"
        aria-label={isCollapsed ? label : undefined}
        className={`flex w-full items-center gap-4 rounded-xl px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/10"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className="h-5 w-5" />
        <span className={isCollapsed ? "sr-only" : "whitespace-nowrap"}>
          {label}
        </span>
      </button>
    )}
  </>
);

const SectionLabel = ({
  label,
  isCollapsed,
}: {
  label: string;
  isCollapsed: boolean;
}) => (
  <p
    className={`px-3 text-[12px] font-semibold uppercase tracking-wide text-white/50 ${
      isCollapsed ? "sr-only" : ""
    }`}
  >
    {label}
  </p>
);

const Separator = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div
    className={`my-3 border-t border-white/5 ${
      isCollapsed ? "mx-auto w-10" : ""
    }`}
  />
);

export default Sidebar;
