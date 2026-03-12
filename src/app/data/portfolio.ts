export type FileTreeItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  extension: string;
};

export type FileTreeSection = {
  id: string;
  label: string;
  isOpen: boolean;
  items: FileTreeItem[];
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
};

export type MenuItem = {
  label: string;
  items: string[];
};

export type Skill = {
  name: string;
  icon?: string;
  category?: string;
  level?: string;
};

export type SkillGroup = {
  name: string;
  skills: Skill[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  technologies?: string[];
  logo?: string;
  highlights?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  tags?: string[];
  url: string;
};

export const siteMeta = {
  name: "Raj Savaliya",
  title: "Raj Savaliya | Software Development Engineer",
  description:
    "VS Code style developer portfolio showcasing skills of Full-Stack Developer with a focus on JavaScript and related technologies.",
  url: "https://www.rajsavaliya.com",
  ogImage: "/ogimage.png",
};

export const fileTree: FileTreeSection[] = [
  {
    id: "portfolio",
    label: "PORTFOLIO",
    isOpen: true,
    items: [
      { id: "home", label: "Welcome", href: "/", icon: "home", extension: "tsx" },
      {
        id: "experience",
        label: "Experience",
        href: "/Experience",
        icon: "briefcase",
        extension: "tsx",
      },
      {
        id: "skills",
        label: "Skills",
        href: "/Skills",
        icon: "code",
        extension: "json",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/Projects",
        icon: "folder",
        extension: "tsx",
      },
      {
        id: "contact",
        label: "Contact",
        href: "/contact",
        icon: "mail",
        extension: "tsx",
      },
    ],
  },
  {
    id: "hobbies",
    label: "HOBBIES",
    isOpen: false,
    items: [
      { id: "anime", label: "Anime", href: "/Anime", icon: "tv", extension: "tsx" },
      {
        id: "gaming",
        label: "Gaming",
        href: "/Gaming",
        icon: "gamepad-2",
        extension: "tsx",
      },
      {
        id: "blogs",
        label: "Blogs",
        href: "/Blogs",
        icon: "book-open",
        extension: "md",
      },
    ],
  },
  {
    id: "more",
    label: "MORE",
    isOpen: false,
    items: [
      {
        id: "learning",
        label: "Learning",
        href: "/Learning",
        icon: "graduation-cap",
        extension: "tsx",
      },
      {
        id: "startup",
        label: "Startup",
        href: "/Startup",
        icon: "rocket",
        extension: "tsx",
      },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/savaliya-raj",
    icon: "linkedin",
    color: "#0077b5",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/SRX9",
    icon: "github",
    color: "#333333",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/s_r_x_9",
    icon: "twitter",
    color: "#1da1f2",
  },
  {
    id: "producthunt",
    name: "Product Hunt",
    url: "https://www.producthunt.com/@srx9",
    icon: "product-hunt",
    color: "#da552f",
  },
  {
    id: "peerlist",
    name: "Peerlist",
    url: "https://peerlist.io/raj_savaliya",
    icon: "users",
    color: "#00aa45",
  },
];

export const menuItems: MenuItem[] = [
  { label: "File", items: ["New File", "Open", "Save", "Exit"] },
  { label: "Edit", items: ["Undo", "Redo", "Cut", "Copy", "Paste"] },
  { label: "View", items: ["Explorer", "Search", "Extensions"] },
  { label: "Go", items: ["Go to File", "Go to Symbol"] },
  { label: "Help", items: ["About", "Documentation"] },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming",
    skills: [
      {
        name: "JavaScript",
        icon: "https://img.icons8.com/color/144/000000/javascript--v1.png",
        category: "Programming",
      },
      {
        name: "TypeScript",
        icon: "https://img.icons8.com/color/96/000000/typescript.png",
        category: "Programming",
      },
      {
        name: "Python",
        icon: "https://img.icons8.com/color/48/null/python--v1.png",
        category: "Programming",
      },
    ],
  },
  {
    name: "Full-Stack Development",
    skills: [
      {
        name: "React",
        icon: "https://img.icons8.com/color/144/000000/react-native.png",
        category: "Frontend",
      },
      {
        name: "Node.js",
        icon: "https://img.icons8.com/fluency/144/000000/node-js.png",
        category: "Backend",
      },
      {
        name: "Next.js",
        icon: "https://i.ibb.co/Kj1TqRv/image.png",
        category: "Frontend",
      },
      {
        name: "Tailwind CSS",
        icon: "https://bourhaouta.gallerycdn.vsassets.io/extensions/bourhaouta/tailwindshades/0.0.5/1592520164095/Microsoft.VisualStudio.Services.Icons.Default",
        category: "Frontend",
      },
      {
        name: "Bootstrap",
        icon: "https://img.icons8.com/color/144/000000/bootstrap.png",
        category: "Frontend",
      },
      {
        name: "SASS",
        icon: "https://img.icons8.com/color/144/000000/sass.png",
        category: "Frontend",
      },
      {
        name: "jQuery",
        icon: "https://img.icons8.com/ios-filled/150/000000/jquery.png",
        category: "Frontend",
      },
    ],
  },
  {
    name: "Database",
    skills: [
      {
        name: "SQL",
        icon: "https://img.icons8.com/ios-filled/100/000000/sql.png",
        category: "Database",
      },
      {
        name: "Redis",
        icon: "https://img.icons8.com/color/48/null/redis.png",
        category: "Database",
      },
      {
        name: "PostgreSQL",
        icon: "https://img.icons8.com/color/48/null/postgreesql.png",
        category: "Database",
      },
      {
        name: "Cassandra",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/1200px-Cassandra_logo.svg.png",
        category: "Database",
      },
      {
        name: "MongoDB",
        icon: "https://img.icons8.com/color/48/000000/mongodb.png",
        category: "Database",
      },
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      {
        name: "AWS",
        icon: "https://img.icons8.com/color/144/000000/amazon-web-services.png",
        category: "DevOps",
      },
      {
        name: "Cloudflare",
        icon: "https://i.ibb.co/CnLsjhp/download.png",
        category: "DevOps",
      },
      {
        name: "Git",
        icon: "https://img.icons8.com/color/144/000000/git.png",
        category: "DevOps",
      },
      {
        name: "GitHub",
        icon: "https://img.icons8.com/fluency/144/000000/github.png",
        category: "DevOps",
      },
      {
        name: "Bitbucket",
        icon: "https://img.icons8.com/color/144/000000/bitbucket.png",
        category: "DevOps",
      },
      {
        name: "Azure",
        icon: "https://img.icons8.com/color/144/000000/azure-1.png",
        category: "DevOps",
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      {
        name: "VS Code",
        icon: "https://img.icons8.com/fluency/144/000000/visual-studio-code-2019.png",
        category: "Tools",
      },
      {
        name: "Postman",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILwHh21Dky51ePyPy2V_qsPeQWd5n136Sa8PQuhIMmOGLpprK6Zt7qWn9cRL21LE3RzM&usqp=CAU",
        category: "Tools",
      },
      {
        name: "JIRA",
        icon: "https://img.icons8.com/color/144/000000/jira.png",
        category: "Tools",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "7",
    title: "AyeWatch AI",
    description:
      "Your personal AI research assistant that monitors the internet 24/7 for topics you care about.",
    image:
      "https://ph-files.imgix.net/857104ee-90cf-4560-8810-fda772df3a5c.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=432&h=220&fit=max&frame=1&dpr=2",
    images: [
      "https://ph-files.imgix.net/857104ee-90cf-4560-8810-fda772df3a5c.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=432&h=220&fit=max&frame=1&dpr=2",
      "https://ph-files.imgix.net/1b4e0763-1df4-4ef2-a07c-9e7879df5462.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=102&h=220&fit=max&frame=1&dpr=2",
      "https://ph-files.imgix.net/67730dbc-d2fd-460e-8f73-1eef4e317bfc.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=101&h=220&fit=max&frame=1&dpr=2",
    ],
    liveUrl: "https://ayewatch.ai",
    featured: true,
    technologies: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "AWS",
      "Lambda",
    ],
  },
  {
    id: "2",
    title: "AyeCreate AI",
    description:
      "Create, Generate and Craft Content, Designs or Media using State of the Art AI.",
    longDescription:
      "AyeCreate makes it easy to Create, Generate and Craft Piece of Content, Designs or Media using State of the Art AI.",
    image: "https://ayecreate.ai/imageogo.png",
    images: [
      "https://ph-files.imgix.net/070216d6-f802-4f91-8ce6-21f20fc5f4e2.png",
      "https://ph-files.imgix.net/7137c42a-4bec-4ad3-ba42-a7846ac940da.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=391&h=220&fit=max&frame=1&dpr=2",
      "https://ph-files.imgix.net/ab30a34b-a4f1-4a44-9d8e-08fe32643b83.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=382&h=220&fit=max&frame=1&dpr=2",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "Generative AI",
      "Redis",
      "PostgreSQL",
      "AWS",
    ],
    liveUrl: "https://ayecreate.ai",
    featured: true,
  },
  {
    id: "1",
    title: "AyeSoul",
    description:
      "Simple & Single Gateway to World's Best Unified AI Assistant for Everything.",
    longDescription:
      "AyeSoul is a search, answers and tasks engine designed to revolutionize how you seek information, acquire knowledge, complete tasks, and interact with technology.",
    image:
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/GV7GW26aoAAJqw0.jpeg",
    images: [
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-09-22%20171927.png",
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-08-24%20154945.png",
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-08-30%20210933.png",
    ],
    technologies: [
      "Generative AI",
      "RAG",
      "TypeScript",
      "Next.js",
      "AWS",
      "Redis",
      "Postgres",
      "Cloudflare",
    ],
    liveUrl: "https://ayesoul.com",
    featured: true,
  },
  {
    id: "3",
    title: "ChaiTea Chat",
    description:
      "World's Most Beautiful, Fast & Elegant AI Chat App with All AI Models in One Place.",
    longDescription:
      "ChaiTea Chat is a lightning-fast, minimalist & local-first AI chat workspace for text, images, and anything in-between.",
    image:
      "https://wsrv.nl/?url=https://chaiteaassets.b-cdn.net/JeQAGBKLDNEKb_Mn7tviE_491a613fea3c47f5ba0f5cfb4431ef50-min.jpg",
    images: [
      "https://wsrv.nl/?url=https://chaiteaassets.b-cdn.net/image.webp",
      "https://wsrv.nl/?url=https://chaiteaassets.b-cdn.net/Screenshot%202025-07-08%20212054.png",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "Generative AI",
      "Redis",
      "PostgreSQL",
      "Cloudflare",
    ],
    liveUrl: "https://ChaiTea.chat",
    featured: true,
  },
  {
    id: "4",
    title: "AyeHigh",
    description:
      "Suite of user-friendly Generative AI tools designed to assist students, professionals, and creators.",
    image:
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-08-30%20214734.png",
    images: [
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/resume-suite.jpg",
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/creatore-suite.jpg",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "AppWrite",
      "Generative AI",
      "AWS",
      "Cloudflare",
    ],
    liveUrl: "https://ayehigh.com",
  },
  {
    id: "5",
    title: "Spineless API",
    description:
      "Create Mock APIs in Seconds. Accelerate Frontend Development with Realistic API Mocks.",
    image: "https://spineless-api.vercel.app/spineless-og-image.png",
    technologies: [
      "TypeScript",
      "Next.js",
      "Generative AI",
      "PostgreSQL",
      "Cloudflare",
    ],
    liveUrl: "https://spineless-api.vercel.app",
  },
  {
    id: "6",
    title: "Ninetails SaaS Starter Stack",
    description:
      "The go-to SaaS starter kit for indie hackers and startups to build and launch SaaS products quickly.",
    image:
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/ogImage.jpg",
    images: [
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-09-22%20173525.png",
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/2.png",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Supabase",
      "Drizzle",
      "Stripe",
      "Cloudflare",
    ],
    liveUrl: "https://ninetails-stack.dev",
  },
];

export const experiences: Experience[] = [
  {
    id: "jiohotstar",
    title: "Software Development Engineer II",
    company: "Jio Hotstar (Disney+ Hotstar/JioCinema)",
    location: "India",
    startDate: "Feb 2024",
    current: true,
    description:
      "Working on large-scale streaming platform serving millions of users, in Watch/Interactive & Foundation Team.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "Jest",
      "Atomic Design System",
      "Storybook",
      "Go",
      "Docker",
      "GraphQL",
      "Tailwind CSS",
    ],
    logo: "/jiohotsatr.png",
  },
  {
    id: "velotio",
    title: "Software Development Engineer I",
    company: "Velotio Technologies",
    location: "India",
    startDate: "Aug 2021",
    endDate: "Feb 2024",
    description:
      "Worked on Frontend Heavy Fullstack of Enterprise applications based on Cloud-Native and Applied AI products.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "SQL",
      "Generative AI",
    ],
    logo: "/velotio.jpg",
  },
  {
    id: "hhaexchange",
    title: "Associate Software Engineer",
    company: "HHAeXchange",
    location: "India",
    startDate: "Dec 2020",
    endDate: "Aug 2021",
    description: "Developed healthcare software solutions and internal tools.",
    technologies: ["JavaScript", "C#", ".NET", "SQL Server"],
    logo: "/hha.png",
  },
];

export const animeSeries = [
  {
    id: "1",
    title: "Naruto",
    subtitle: "720 Episodes",
    image:
      "https://steamuserimages-a.akamaihd.net/ugc/910156967348138382/E4A8A3FAA9388A67BD3DC2CCD77216B21280A7A1/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  },
  {
    id: "2",
    title: "My Hero Academia",
    subtitle: "5 Seasons",
    image:
      "https://c.tenor.com/bnRtrO9OLyIAAAAd/my-hero-academia-world-heroes-mission.gif",
  },
  {
    id: "3",
    title: "Attack on Titan",
    subtitle: "5 Seasons",
    image: "https://c.tenor.com/JcOj-GXlyGEAAAAC/attack-on-titan-shingeki-no-kyojin.gif",
  },
  {
    id: "4",
    title: "Hunter X Hunter",
    subtitle: "On Going",
    image: "https://giffiles.alphacoders.com/143/143442.gif",
  },
  {
    id: "5",
    title: "Tokyo Revengers",
    subtitle: "On Going",
    image: "https://c.tenor.com/YcRLyel0MgcAAAAC/mikey-tokyo-revengers-tokyo-revengers.gif",
  },
  {
    id: "6",
    title: "Jujutsu Kaisen",
    subtitle: "On Going",
    image:
      "https://gifdb.com/images/high/jujutsu-kaisen-gojo-hollow-purple-of1gnux4ytfmt7il.gif",
  },
  {
    id: "7",
    title: "Death Note",
    subtitle: "Completed",
    image: "https://giffiles.alphacoders.com/254/2549.gif",
  },
  {
    id: "8",
    title: "One Punch Man",
    subtitle: "On Going",
    image: "https://giffiles.alphacoders.com/128/12870.gif",
  },
  {
    id: "9",
    title: "Boruto",
    subtitle: "On Going",
    image: "https://i.pinimg.com/originals/6b/80/f7/6b80f7be69539ae894673205f1dc503b.gif",
  },
];

export const gamingPlatforms = [{ name: "PC" }];

export const favoriteGames = [
  { name: "Valorant", category: "FPS", platform: "PC" },
  { name: "Marvel Rivals", category: "FPS", platform: "PC" },
  { name: "Forza Horizon 5", category: "Racing", platform: "PC" },
  { name: "FIFA", category: "Sports", platform: "PC" },
  { name: "Fortnite", category: "Battle Royale", platform: "PC" },
];

export const gamingStats = [
  { label: "Years Gaming", value: "15+" },
  { label: "Favorite Genre", value: "Action/Adventure/Racing" },
  { label: "Current Game", value: "Marvel Rivals" },
];

export const learningItems = [
  { name: "Advanced System Design", category: "Architecture", progress: 70 },
  { name: "Applied GenAI", category: "Programming", progress: 85 },
  { name: "AI/ML Deep Dive", category: "AI", progress: 30 },
  { name: "Product Engineering", category: "Engineering", progress: 50 },
  { name: "Sanskrit", category: "Language", progress: 20 },
  { name: "Storytelling/Writing", category: "Communication", progress: 40 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Built my own Midjourney Alternative, by typing English",
    excerpt:
      "Creating an AI-powered image generation alternative to Midjourney using natural language.",
    date: "2025-01-09",
    image: "https://ayecreate.ai/imageogo.png",
    tags: ["Blog"],
    url: "https://x.com/s_r_x_9/status/2009321032264634394",
  },
  {
    id: "2",
    title: "Ayewatch AI Web Monitor",
    excerpt:
      "AI-powered web monitoring system for tracking changes and updates across the internet.",
    date: "2025-01-10",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1756547137037/33b56c7f-00d6-45fc-b1d7-a026e629cf89.png",
    tags: ["SaaS"],
    url: "https://raj-dev.hashnode.dev/ayewatch-ai-web-monitor",
  },
  {
    id: "3",
    title: "SOUL AI of AyeSoul : A Unified approach to AI Use",
    excerpt: "Exploring the unified approach to AI assistance through SOUL AI.",
    date: "2024-08-24",
    image:
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/Screenshot%202024-08-24%20154945.png",
    tags: ["Generative AI"],
    url: "https://raj-dev.hashnode.dev/soul-ai-of-ayesoul-a-unified-approach-to-ai-use?ref=peerlist",
  },
  {
    id: "4",
    title: "Ninetails AI Stack powered: Earn your First Dollar on Internet",
    excerpt:
      "How to use Ninetails SaaS starter stack to launch your first product and earn online.",
    date: "2024-09-22",
    image:
      "https://pub-06a4550fd267456ea02b32369bea7f8f.r2.dev/ogImage.jpg",
    tags: ["SaaS Starter"],
    url: "https://ayedot.com/203/MiniBlog/Get-Free-SSL-Certificate-for-your-Website-for-lifetime",
  },
  {
    id: "5",
    title: "Meaning of ATS compliant resume and How to create ATS Resume for Free",
    excerpt:
      "Guide to understanding and creating ATS-compliant resumes for job applications.",
    date: "2021-02-08",
    image:
      "https://ayex8storex9.s3.ap-south-1.amazonaws.com/40/5507a250-6bad-11eb-b1c5-1331b5f7f026Youallhavemayormaynotheardaboutthisterm_ATS_Reume,butletmetellyousomething-Ifyouareapplyingforajobinbigcompanies,wheretherearelotofapplicationforasinglejobpost,thenther.jpg",
    tags: ["ATS Resume"],
    url: "https://ayedot.com/97/MiniBlog/Meaning-of-ATS-compliant-resume-and-How-to-create-ATS-Resume-for-Free",
  },
  {
    id: "6",
    title: "Built an AI That Watches the Internet So You Don't Have To",
    excerpt:
      "Developing an AI system for automated internet monitoring and content tracking.",
    date: "2025-01-08",
    image:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*6Wl6MMLInzNFLOjS6182JQ.png",
    tags: ["SaaS"],
    url: "https://medium.com/@rajsavaliyadev/built-an-ai-that-watches-the-internet-so-you-dont-have-to-5c7bf062f6ed",
  },
  {
    id: "7",
    title: "How JavaScript Works: A Visual Guide by Narottam Sahu",
    excerpt: "A visual guide to understanding JavaScript internals and execution.",
    date: "2022-03-20",
    image:
      "https://uploads.toptal.io/blog/image/125783/toptal-blog-image-1522333595770-14ba14a2f6099482fa9189f8764dd5ad.png",
    tags: ["JavaScript"],
    url: "https://javascript.plainenglish.io/how-javascript-works-a-visual-guide-515199eef837",
  },
  {
    id: "8",
    title: "Litoco AI: Link to Content - Cloudflare AI Challenge Submission",
    excerpt:
      "Building an AI-powered content extraction tool for Cloudflare AI Challenge.",
    date: "2024-07-27",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1722066315875/0740b21e-5ba0-4a11-b27d-7006beca8441.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    tags: ["Generative AI"],
    url: "https://dev.to/raj_savaliya/litoco-ai-link-to-content-cloudflare-ai-challenge-submission-2m9h?ref=peerlist",
  },
];

export const startupValues = [
  "Ship fast, iterate as per requirement",
  "User feedback drives development",
  "Create something either you want or someone else needs",
  "Keep it simple",
];
