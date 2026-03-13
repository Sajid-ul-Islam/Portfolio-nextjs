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

export type Education = {
  institution: string;
  degree: string;
  link?: string;
  logo?: string;
};

export type FamilyMember = {
  relation: string;
  name: string;
  nameLink?: string;
  occupation?: string;
  link?: string;
};

export const siteMeta = {
  name: "Sajid Islam",
  title: "Sajid Islam | Business & Data Analyst",
  description:
    "VS Code style developer portfolio showcasing skills of a Business Analyst and Data Analyst with a focus on Python, SQL, and Advanced Analytics.",
  url: "https://saajiidi.github.io/example-app-nextjs/",
  ogImage: "/img/profile.jpg",
};

export const projects: Project[] = [
  {
    id: "1",
    title: "ECommerce Dashboard",
    description: "A dashboard providing real-time data from 2021-2025, featuring analytics for total revenue, total orders, total customers, and average order value.",
    image: "",
    liveUrl: "https://e-com-dashborad.vercel.app/",
    featured: true,
    technologies: ["Dashboard", "React", "Analytics", "E-commerce"],
  },
  {
    id: "2",
    title: "Sheet2WhatsApp",
    description: "Automates WhatsApp link generation from Excel/CSV files.",
    image: "",
    liveUrl: "https://sheet2whatsapp.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Pandas", "Vercel"],
  },
  {
    id: "3",
    title: "Sentinel Bangladesh",
    description: "An interactive security incident map for Bangladesh, featuring cluster analysis, heatmaps, and detailed incident tracking.",
    image: "",
    liveUrl: "https://sentinelbangladesh.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Data Visualization", "Security Analysis"],
  },
  {
    id: "4",
    title: "Order Process Automation",
    description: "Automates order processing and formatting from Excel files, featuring consolidation and categorization.",
    image: "",
    liveUrl: "https://order-process-automation.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Automation", "Data Processing"],
  },
  {
    id: "5",
    title: "Air Passenger Forecasting",
    description: "Time series analysis comparing multiple forecasting models (ARIMA, Exponential Smoothing) for airline passenger prediction.",
    image: "",
    liveUrl: "https://saajiidi.github.io/Air_Passengers_Forecasting_Models/",
    featured: true,
    technologies: ["Machine Learning", "Time Series", "Python"],
  },
  {
    id: "6",
    title: "Ramadan Compass",
    description: "A beautiful Islamic companion app featuring prayer times, Ramadan countdown, and spiritual tracking.",
    image: "",
    liveUrl: "https://ramadancompass.vercel.app/",
    featured: true,
    technologies: ["Ramadan", "Prayer Times", "React", "PWA"],
  },
  {
    id: "7",
    title: "E-Commerce Platform",
    description: "Modern e-commerce interface built with React.js featuring responsive design, product catalog, shopping cart functionality.",
    image: "",
    liveUrl: "https://gear-master.vercel.app/",
    featured: false,
    technologies: ["React", "E-commerce", "Frontend"],
  },
  {
    id: "8",
    title: "Day Progress Plus",
    description: "A productivity focused application featuring day progress tracking, focus task management, and customizable settings.",
    image: "",
    liveUrl: "https://saajiidi.github.io/TimeTracker/",
    featured: false,
    technologies: ["Productivity", "React", "Utility"],
  },
  {
    id: "9",
    title: "Growth Analysis Dashboard",
    description: "A comprehensive web development project showcasing modern web technologies and best practices.",
    image: "",
    liveUrl: "https://saajiidi.github.io/Growth-Analysis-Dashboard/",
    featured: false,
    technologies: ["Web Dev", "React", "Analytics"],
  },
  {
    id: "10",
    title: "Border Security Analysis",
    description: "Data visualization project analyzing border incident trends in Bangladesh using statistical methods.",
    image: "",
    liveUrl: "https://saajiidi.github.io/Border-Killing-Trend-in-Bangladesh/",
    featured: false,
    technologies: ["Data Viz", "Statistics", "Social Impact"],
  },
  {
    id: "11",
    title: "Image Scraper",
    description: "Versatile Python tool for downloading images from Pinterest with multiple interfaces including web UI and command line.",
    image: "",
    liveUrl: "https://img-scraper.streamlit.app/",
    featured: false,
    technologies: ["Python", "Scraping", "Automation"],
  },
  {
    id: "12",
    title: "Tableau Portfolio",
    description: "Demographics, economic analysis, and security incident maps.",
    image: "",
    liveUrl: "https://public.tableau.com/app/profile/sajid.islam4721/viz/MuslimPopulationbyEthinicity/Dashboard1",
    featured: false,
    technologies: ["Tableau", "Data Visualization"],
  },
  {
    id: "13",
    title: "B2B StockLot E-Commerce",
    description: "Web development project for B2B e-commerce.",
    image: "",
    liveUrl: "https://github.com/saajiidi/B2B-StockLot-E-Commerce-BD",
    featured: false,
    technologies: ["HTML/CSS", "JavaScript", "Web Dev"],
  }
];

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
        href: "/projects",
        icon: "folder",
        extension: "tsx",
      },
      {
        id: "education",
        label: "Education",
        href: "/Education",
        icon: "graduation-cap",
        extension: "tsx",
      },
      {
        id: "family",
        label: "Family",
        href: "/Family",
        icon: "users",
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
    id: "my-projects",
    label: "MY PROJECTS",
    isOpen: true,
    items: projects.filter(p => p.featured).map((p) => ({
      id: `project-${p.id}`,
      label: p.title.replace(/\s+/g, ""),
      href: `/projects/${p.id}`,
      icon: "code",
      extension: "ts",
    })),
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
    url: "https://www.linkedin.com/in/sajidislamchowdhury/",
    icon: "linkedin",
    color: "#0077b5",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/saajiidi",
    icon: "github",
    color: "#333333",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/+8801824526054?text=",
    icon: "message-circle",
    color: "#25D366",
  },
  {
    id: "resume",
    name: "Resume",
    url: "https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link",
    icon: "file-text",
    color: "#da552f",
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
    name: "Data Analytics & BI",
    skills: [
      { name: "Python", category: "Data", icon: "https://img.icons8.com/color/48/null/python--v1.png" },
      { name: "SQL", category: "Data", icon: "https://img.icons8.com/ios-filled/100/000000/sql.png" },
      { name: "Power BI", category: "BI", icon: "https://img.icons8.com/color/48/000000/power-bi.png" },
      { name: "Tableau", category: "BI", icon: "https://img.icons8.com/color/48/000000/tableau-software.png" },
      { name: "Excel", category: "Data", icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png" },
      { name: "Google Analytics", category: "Data", icon: "https://img.icons8.com/color/48/000000/google-analytics.png" },
      { name: "Pandas", category: "Data", icon: "https://img.icons8.com/color/48/000000/pandas.png" },
      { name: "NumPy", category: "Data", icon: "https://img.icons8.com/color/48/000000/numpy.png" },
      { name: "Scikit-learn", category: "Data", icon: "https://img.icons8.com/color/48/000000/python.png" }
    ]
  },
  {
    name: "Web Development",
    skills: [
      { name: "React", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/react-native.png" },
      { name: "Node.js", category: "Backend", icon: "https://img.icons8.com/fluency/144/000000/node-js.png" },
      { name: "JavaScript", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/javascript--v1.png" },
      { name: "HTML5", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/html-5--v1.png" },
      { name: "CSS3", category: "Frontend", icon: "https://img.icons8.com/color/144/000000/css3.png" }
    ]
  },
  {
    name: "Core Competencies",
    skills: [
      { name: "Business Intelligence", category: "Core" },
      { name: "Data Analysis", category: "Core" },
      { name: "Marketplace Analysis", category: "Core" },
      { name: "Strategic Planning", category: "Core" },
      { name: "Cross Functional Teams", category: "Core" },
      { name: "Agile Development & Scrum", category: "Core" }
    ]
  }
];


export const experiences: Experience[] = [
  {
    id: "daraz",
    title: "Jr. Executive - Marketplace",
    company: "Daraz (Alibaba Group)",
    location: "Bangladesh",
    startDate: "2022",
    current: true,
    description: "Business & Marketplace Analysis, Brand & Partner Acquisition, Partner Development Project",
    technologies: ["Data Analysis", "Marketplace"],
    logo: "",
  },
  {
    id: "hungrynaki",
    title: "Associate - Home Kitchen & Street Food",
    company: "HungryNaki (Alibaba Group)",
    startDate: "2021",
    endDate: "2022",
    description: "Business & Marketplace Analysis, Brand & Partner Acquisition",
    technologies: ["Business Analysis", "Partner Development"],
  },
  {
    id: "nzfabrics",
    title: "IT Executive - Quality Control",
    company: "NZ Fabrics (NZ TEXTILE GROUP)",
    startDate: "2020",
    endDate: "2021",
    description: "Info & Tech Support, Presentation & Reporting to Authorities & Buyers",
    technologies: ["Tech Support", "Quality Control"],
  },
  {
    id: "thrivingskill",
    title: "Associate - Online Sales & Customer Supports",
    company: "Thriving Skill",
    startDate: "2019",
    endDate: "2020",
    description: "Business & Marketplace Analysis, Sales Growth Strategies, CRM",
    technologies: ["CRM", "Sales Strategies"],
  },
  {
    id: "deencommerce",
    title: "Executive - Business",
    company: "DEEN Commerce",
    startDate: "2018",
    endDate: "2019",
    description: "CRM & Sales Growth, Business Analysis, Strategy & Development",
    technologies: ["CRM", "Business Analysis", "Strategy"],
  },
  {
    id: "gearmaster",
    title: "Co-Founder",
    company: "Gear Master",
    startDate: "2024",
    current: true,
    description: "Bike Accessories Retail Store",
    technologies: ["Retail", "Business Management"],
  }
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
    title: "Building reliable data dashboards",
    excerpt: "Insights on how to build reliable reporting dashboards.",
    date: "2024-01-01",
    url: "#",
    tags: ["Analytics", "BI"]
  },
  {
    id: "2",
    title: "From messy data to actionable insight",
    excerpt: "Strategy for cleaning and utilizing business data.",
    date: "2024-02-01",
    url: "#",
    tags: ["Strategy", "Data"]
  },
  {
    id: "3",
    title: "Designing reporting that drives decisions",
    excerpt: "Best practices to design reports that offer actionable insights.",
    date: "2024-03-01",
    url: "#",
    tags: ["BI", "Reporting"]
  }
];

export const startupValues = [
  "Ship fast, iterate as per requirement",
  "User feedback drives development",
  "Create something either you want or someone else needs",
  "Keep it simple",
];

export const education: Education[] = [
  {
    institution: "Academy of Business Professionals",
    degree: "Data Science & Business Analytics",
    link: "https://abpbd.org/",
  },
  {
    institution: "North South University",
    degree: "Computer Science & Engineering",
    link: "https://www.northsouth.edu",
  },
  {
    institution: "Bangladesh Air Force Shaheen College Dhaka",
    degree: "Science Division",
    link: "https://bafsd.edu.bd",
  },
  {
    institution: "Uttara High School & College",
    degree: "Science Division",
    link: "https://uhscdhaka.edu.bd",
  },
];

export const family: FamilyMember[] = [
  {
    relation: "Wife",
    name: "Infida Yesmin",
    nameLink: "https://saajiidi.github.io/Infida-Yesmin-Meem/",
    occupation: "Bangla and Economics Instructor of Protishruti Poribar",
    link: "https://www.facebook.com/ProtishrutiPoribar",
  },
  {
    relation: "Father",
    name: "Shahed Chowdhury",
    occupation: "Merchandiser, Stocklot Business",
  },
  {
    relation: "Mother",
    name: "Suraiya Haque",
    occupation: "Former KG School Teacher, House Wife",
  },
  {
    relation: "Paternal Grandfather",
    name: "Late. Mazharul Islam Chowdhury",
    occupation: "Former Head Master, PG Govt. High School",
  },
  {
    relation: "Maternal Grandfather",
    name: "Late. Shamsul Haque",
    occupation: "Former Govt. Officer, Land Acquisition",
  },
  {
    relation: "Paternal Uncle",
    name: "Late. Nurul Alam Chowdhury",
    occupation: "Lieutenant Colonel (Rtd), Bangladesh Army",
  },
  {
    relation: "Maternal Uncle",
    name: "Moazzem Hossain",
    occupation: "Principal Officer (Rtd), Shonali Bank Ltd.",
  },
  {
    relation: "Paternal Uncle",
    name: "Farid Ahmed Chowdhury",
    occupation: "Head of Philosophy Dept. Chittagong College",
  },
  {
    relation: "Sibling (Younger)",
    name: "Sakib Islam",
    occupation: "Owner - Gear Master",
    link: "https://www.facebook.com/profile.php?id=61558077623189",
  },
];
