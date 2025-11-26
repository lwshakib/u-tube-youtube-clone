"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, MoreVertical } from "lucide-react";
import type { Video } from "@/lib/mockData";
import { formatUploadedAt, formatViews } from "@/lib/utils";

type VideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: VideoCardProps) => (
  <article className="flex flex-col gap-3">
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative aspect-video overflow-hidden rounded-2xl bg-[#1f1f1f]"
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        unoptimized
      />
      <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-xs font-semibold text-white">
        {video.duration}
      </span>
    </motion.div>

    <div className="flex gap-3">
      <Image
        src={video.channel.avatar}
        alt={video.channel.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        unoptimized
      />
      <div className="flex-1">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-white">
          {video.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-white/60">
          <span>{video.channel.name}</span>
          {video.channel.verified && (
            <CheckCircle2 className="h-4 w-4 text-white/60" />
          )}
        </div>
        <p className="text-xs text-white/60">
          {formatViews(video.views)} views • {formatUploadedAt(video.uploadedAt)}
        </p>
      </div>
      <button
        type="button"
        aria-label="More options"
        className="text-white/70 hover:text-white"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  </article>
);

export default VideoCard;


