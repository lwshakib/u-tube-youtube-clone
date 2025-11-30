"use client";

import FilterChips from "@/components/FilterChips";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import { filters, videos } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      const mobile = width < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
      if (mobile) {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredVideos = useMemo(
    () =>
      activeFilter === "All"
        ? videos
        : videos.filter((video) => video.tags.includes(activeFilter)),
    [activeFilter]
  );

  const gridColumns = useMemo(() => {
    if (viewportWidth === 0) {
      return sidebarCollapsed ? 2 : 1;
    }

    if (viewportWidth >= 1280) {
      return sidebarCollapsed ? 5 : 4;
    }

    if (viewportWidth >= 1024) {
      return sidebarCollapsed ? 4 : 3;
    }

    if (viewportWidth >= 768) {
      return sidebarCollapsed ? 4 : 3;
    }

    if (viewportWidth >= 600) {
      return 2;
    }

    return 1;
  }, [viewportWidth, sidebarCollapsed]);

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
      return;
    }
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0f0f0f] text-white">
      <Header onMenuClick={handleMenuClick} user={session?.user ?? null} />
      <div className="flex h-full w-full pt-14">
        <Sidebar
          isOpen={isMobile ? sidebarOpen : true}
          isCollapsed={sidebarCollapsed}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
          hasUser={!!session?.user}
        />

        <motion.main
          layout
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="min-w-0 flex-1 overflow-y-auto px-4 pb-12 sm:px-6 lg:px-10"
          style={{ height: "calc(100vh - 56px)" }}
        >
          {session?.user ? (
            <>
              <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0f0f0f] pb-2">
                <FilterChips
                  chips={filters}
                  activeChip={activeFilter}
                  onSelect={setActiveFilter}
                />
              </div>

              <section
                className="mt-6 grid gap-x-4 gap-y-10"
                aria-label="Video feed"
                style={{
                  gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                }}
              >
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </section>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-white/80">
              <h2 className="mb-2 text-xl font-semibold">
                Try searching to get started
              </h2>
              <p className="max-w-md text-sm text-white/60">
                Start watching videos to help us build a feed of videos
                you&apos;ll love.
              </p>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
