"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SubscriptionsFeedPage() {
  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
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
          <div className="flex h-full flex-col items-center justify-center text-center text-white/80">
            <h1 className="mb-2 text-2xl font-semibold">Subscriptions</h1>
            <p className="max-w-md text-sm text-white/60">
              Your latest videos from channels you&apos;re subscribed to will
              appear here.
            </p>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
