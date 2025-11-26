export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  views: number;
  uploadedAt: string;
  duration: string;
  tags: string[];
};

export type Subscription = {
  name: string;
  avatar: string;
  isLive: boolean;
};

export const filters = [
  "All",
  "APIs",
  "AI",
  "Security hackers",
  "Gaming",
  "Variable (math)",
  "C++",
  "Live",
  "Study Skills",
  "Colleges",
  "Functions",
  "Physics",
  "Recently uploaded",
  "Watched",
  "New to you",
];

export const subscriptions: Subscription[] = [
  {
    name: "TEDx Talks",
    avatar: "https://i.pravatar.cc/64?img=12",
    isLive: false,
  },
  {
    name: "3Blue1Brown",
    avatar: "https://i.pravatar.cc/64?img=33",
    isLive: true,
  },
  {
    name: "Academic English",
    avatar: "https://i.pravatar.cc/64?img=47",
    isLive: false,
  },
  {
    name: "Math & Science Nerds",
    avatar: "https://i.pravatar.cc/64?img=18",
    isLive: false,
  },
  {
    name: "Code Consistency",
    avatar: "https://i.pravatar.cc/64?img=54",
    isLive: false,
  },
  {
    name: "Chai aur Code",
    avatar: "https://i.pravatar.cc/64?img=23",
    isLive: true,
  },
  {
    name: "Focusphere",
    avatar: "https://i.pravatar.cc/64?img=41",
    isLive: false,
  },
  {
    name: "Hasan Study Wave",
    avatar: "https://i.pravatar.cc/64?img=9",
    isLive: false,
  },
  {
    name: "Sony AATH",
    avatar: "https://i.pravatar.cc/64?img=61",
    isLive: false,
  },
  {
    name: "Web Prodigies",
    avatar: "https://i.pravatar.cc/64?img=65",
    isLive: true,
  },
];

export const videos: Video[] = [
  {
    id: "nextjs-fullstack",
    title: "Build a full stack project with NextJS, NextAuth, Imagekit and MongoDB",
    thumbnail: "https://i.ytimg.com/vi/Zq5fmkHpvDk/maxresdefault.jpg",
    channel: {
      name: "Chai aur Code",
      avatar: "https://i.pravatar.cc/64?img=21",
      verified: true,
    },
    views: 199000,
    uploadedAt: "2024-05-12T09:00:00.000Z",
    duration: "3:36:58",
    tags: ["AI", "APIs", "Recently uploaded"],
  },
  {
    id: "streamyard-clone",
    title: "I Built StreamYard Clone | Code Along - Live Streaming RTMP Application",
    thumbnail: "https://i.ytimg.com/vi/JfdQkO6gQ0w/maxresdefault.jpg",
    channel: {
      name: "Piyush Garg",
      avatar: "https://i.pravatar.cc/64?img=3",
      verified: true,
    },
    views: 29000,
    uploadedAt: "2023-11-18T12:00:00.000Z",
    duration: "36:25",
    tags: ["Live", "APIs", "New to you"],
  },
  {
    id: "oneshot-revision",
    title: "ONESHOT REVISION সরল রেখা | College Admission Bootcamp",
    thumbnail: "https://i.ytimg.com/vi/4E3S0mAJQnE/maxresdefault.jpg",
    channel: {
      name: "Math & Science Nerds",
      avatar: "https://i.pravatar.cc/64?img=8",
      verified: true,
    },
    views: 973000,
    uploadedAt: "2023-09-02T07:30:00.000Z",
    duration: "4:11:18",
    tags: ["Study Skills", "Colleges", "Watched"],
  },
  {
    id: "focus-coding",
    title: "Deep Focus Coding Music: Chillstep for Coding, Work & Study",
    thumbnail: "https://i.ytimg.com/vi/7NOSDKb0HlU/maxresdefault.jpg",
    channel: {
      name: "Focusphere",
      avatar: "https://i.pravatar.cc/64?img=38",
      verified: false,
    },
    views: 284000,
    uploadedAt: "2024-03-06T18:00:00.000Z",
    duration: "1:00:01",
    tags: ["Study Skills", "Watched"],
  },
  {
    id: "saas-code-editor",
    title: "Build a SaaS Code Editor with Next.js 15 - React.js Full Stack VSCode",
    thumbnail: "https://i.ytimg.com/vi/qi7f7KXrLV8/maxresdefault.jpg",
    channel: {
      name: "Codesistency",
      avatar: "https://i.pravatar.cc/64?img=28",
      verified: true,
    },
    views: 88000,
    uploadedAt: "2024-02-14T15:45:00.000Z",
    duration: "6:20:48",
    tags: ["AI", "APIs", "Functions"],
  },
  {
    id: "earn-1000usd",
    title: "কোন কোর্স না কিনেই মাসে $1000 USD আয় কিভাবে সম্ভব?",
    thumbnail: "https://i.ytimg.com/vi/Pdofek7nM-A/maxresdefault.jpg",
    channel: {
      name: "Khalid Farhan",
      avatar: "https://i.pravatar.cc/64?img=13",
      verified: true,
    },
    views: 113000,
    uploadedAt: "2024-11-15T11:15:00.000Z",
    duration: "18:26",
    tags: ["Recently uploaded", "New to you"],
  },
  {
    id: "build-vercel",
    title: "Build Your Own X - I build Vercel in public",
    thumbnail: "https://i.ytimg.com/vi/SGRyQpX9u28/maxresdefault.jpg",
    channel: {
      name: "Piyush Garg",
      avatar: "https://i.pravatar.cc/64?img=3",
      verified: true,
    },
    views: 51000,
    uploadedAt: "2024-08-01T10:20:00.000Z",
    duration: "25:10",
    tags: ["APIs", "AI", "Functions"],
  },
  {
    id: "not-gate-bangla",
    title: "HSC ICT Chapter 3 Part 30 | NOT Gate Full Explanation in Bangla",
    thumbnail: "https://i.ytimg.com/vi/_2s9a1GN9e8/maxresdefault.jpg",
    channel: {
      name: "Fisoha Study Home",
      avatar: "https://i.pravatar.cc/64?img=45",
      verified: false,
    },
    views: 4100,
    uploadedAt: "2024-12-01T05:00:00.000Z",
    duration: "5:04",
    tags: ["Variable (math)", "Study Skills"],
  },
  {
    id: "number-system",
    title: "Number System || Chapter 3 || Mahmudul Hasan || Lecture 1",
    thumbnail: "https://i.ytimg.com/vi/Y_b6YdExg-4/maxresdefault.jpg",
    channel: {
      name: "Hasan Study Wave",
      avatar: "https://i.pravatar.cc/64?img=62",
      verified: false,
    },
    views: 52000,
    uploadedAt: "2024-09-20T09:30:00.000Z",
    duration: "31:20",
    tags: ["Variable (math)", "Watched", "Colleges"],
  },
  {
    id: "gopal-bhar",
    title: "গোপালের ভূতের বাড়িতে | Gopal Bhar | Best Of Gopal Bhar",
    thumbnail: "https://i.ytimg.com/vi/8uDPZWS9VyU/maxresdefault.jpg",
    channel: {
      name: "Sony AATH",
      avatar: "https://i.pravatar.cc/64?img=17",
      verified: true,
    },
    views: 1600000,
    uploadedAt: "2024-10-25T13:00:00.000Z",
    duration: "42:28",
    tags: ["Gaming", "New to you"],
  },
  {
    id: "ai-saas-design",
    title: "AI SaaS - Sketch To Design | CodeRabbit, Convex, Inngest",
    thumbnail: "https://i.ytimg.com/vi/HG_u4cQnGJk/maxresdefault.jpg",
    channel: {
      name: "Web Prodigies",
      avatar: "https://i.pravatar.cc/64?img=57",
      verified: true,
    },
    views: 312000,
    uploadedAt: "2024-04-09T16:00:00.000Z",
    duration: "1:35:47",
    tags: ["AI", "APIs", "Functions"],
  },
  {
    id: "streamyard-live",
    title: "I made a website that makes websites",
    thumbnail: "https://i.ytimg.com/vi/b8wZE9W95qE/maxresdefault.jpg",
    channel: {
      name: "Harkirat Singh",
      avatar: "https://i.pravatar.cc/64?img=24",
      verified: true,
    },
    views: 252000,
    uploadedAt: "2024-01-11T10:00:00.000Z",
    duration: "3:42:45",
    tags: ["AI", "APIs", "Recently uploaded"],
  },
];


