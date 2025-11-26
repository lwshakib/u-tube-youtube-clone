"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FilterChips from "@/components/FilterChips";
import VideoCard from "@/components/VideoCard";
import { filters, subscriptions, videos } from "@/lib/mockData";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
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
    [activeFilter],
  );

  const gridClass = sidebarCollapsed
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
      return;
    }
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex min-h-screen pt-14">
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
          className="flex-1 px-4 pb-12 sm:px-6 lg:px-10"
        >
          <div className="sticky top-14 z-20 border-b border-white/5 bg-[#0f0f0f] pb-2">
            <FilterChips
              chips={filters}
              activeChip={activeFilter}
              onSelect={setActiveFilter}
            />
          </div>

          <section
            className={`mt-6 grid gap-x-4 gap-y-10 ${gridClass}`}
            aria-label="Video feed"
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
