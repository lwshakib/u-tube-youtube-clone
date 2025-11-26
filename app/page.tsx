"use client";

import FilterChips from "@/components/FilterChips";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import { filters, subscriptions, videos } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
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
    <div className="min-h-screen overflow-x-hidden bg-[#0f0f0f] text-white">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex min-h-screen w-full pt-14">
        <Sidebar
          isOpen={isMobile ? sidebarOpen : true}
          isCollapsed={sidebarCollapsed}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
          subscriptions={subscriptions}
        />

        <motion.main
          layout
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="min-w-0 flex-1 px-4 pb-12 sm:px-6 lg:px-10"
        >
          <div className="sticky top-14 z-20 border-b border-white/5 bg-[#0f0f0f] pb-2">
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
        </motion.main>
      </div>
    </div>
  );
}
