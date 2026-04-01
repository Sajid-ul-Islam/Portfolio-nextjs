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
  caseStudy?: {
    role?: string;
    timeline?: string;
    problem?: string;
    solution?: string;
    impact?: string[];
    highlights?: string[];
    metrics?: { label: string; value: string }[];
  };
  missionLogs?: string[];
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
  content?: string;
};

export type Education = {
  institution: string;
  degree: string;
  year?: string;
  description?: string;
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
    image: "/img/projects/ecommerce.png",
    liveUrl: "https://e-com-dashborad.vercel.app/",
    featured: true,
    technologies: ["Dashboard", "React", "Analytics", "E-commerce"],
    caseStudy: {
      role: "Data Analyst & Dashboard Builder",
      timeline: "2021–2025 dataset",
      problem: "Stakeholders needed a single view of revenue, orders, customers, and AOV trends.",
      solution: "Built a KPI dashboard consolidating 2021–2025 sales data into a unified view.",
      impact: [
        "Improved visibility into marketplace performance trends.",
        "Standardized KPI definitions for recurring reviews.",
      ],
      metrics: [
        { label: "Time Range", value: "2021–2025" },
        { label: "Core KPIs", value: "4" },
      ],
    },
  },
  {
    id: "2",
    title: "Sheet2WhatsApp",
    description: "Automates WhatsApp link generation from Excel/CSV files.",
    image: "/img/projects/whatsapp.png",
    liveUrl: "https://sheet2whatsapp.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Pandas", "Vercel"],
    caseStudy: {
      role: "Builder",
      timeline: "2024",
      problem: "Creating WhatsApp links from spreadsheets was manual and error-prone.",
      solution: "Streamlit app that converts CSV/Excel rows into share-ready WhatsApp links.",
      impact: [
        "Reduced copy/paste effort for outreach.",
        "Improved accuracy of contact links.",
      ],
      metrics: [
        { label: "Input", value: "CSV/Excel" },
        { label: "Output", value: "WhatsApp links" },
      ],
    },
  },
  {
    id: "3",
    title: "Sentinel Bangladesh",
    description: "An interactive security incident map for Bangladesh, featuring cluster analysis, heatmaps, and detailed incident tracking.",
    image: "/img/projects/sentinel.png",
    liveUrl: "https://sentinelbangladesh.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Data Visualization", "Security Analysis"],
    caseStudy: {
      role: "Data Visualization",
      timeline: "2024",
      problem: "Security incidents needed spatial insight at scale.",
      solution: "Interactive map with clustering, heatmaps, and drill-down incident details.",
      impact: [
        "Faster pattern discovery across regions.",
        "Clearer communication of incident density.",
      ],
      metrics: [{ label: "Map Layers", value: "Clusters + Heatmap + Points" }],
    },
  },
  {
    id: "4",
    title: "Order Process Automation",
    description: "Automates order processing and formatting from Excel files, featuring consolidation and categorization.",
    image: "/img/projects/automation.png",
    liveUrl: "https://order-process-automation.streamlit.app/",
    featured: true,
    technologies: ["Streamlit", "Python", "Automation", "Data Processing"],
    caseStudy: {
      role: "Automation Engineer",
      timeline: "2024",
      problem: "Order sheets required manual consolidation and formatting.",
      solution: "Automated ingestion, cleaning, and categorization of Excel orders.",
      impact: ["Faster order preparation.", "Consistent output formatting."],
      metrics: [
        { label: "Input", value: "Excel" },
        { label: "Output", value: "Formatted sheets" },
      ],
    },
  },
  {
    id: "5",
    title: "Air Passenger Forecasting",
    description: "Time series analysis comparing multiple forecasting models (ARIMA, Exponential Smoothing) for airline passenger prediction.",
    image: "/img/projects/air_passengers.png",
    liveUrl: "https://saajiidi.github.io/Air_Passengers_Forecasting_Models/",
    featured: true,
    technologies: ["Machine Learning", "Time Series", "Python"],
    caseStudy: {
      role: "Data Scientist",
      timeline: "2023",
      problem: "Forecast air passenger demand using multiple time-series models.",
      solution: "Compared ARIMA and Exponential Smoothing forecasts.",
      impact: ["Enabled model comparison for planning scenarios."],
      metrics: [{ label: "Models", value: "ARIMA, Exp. Smoothing" }],
    },
  },
  {
    id: "6",
    title: "Ramadan Compass",
    description: "A comprehensive Ramadan companion app featuring prayer times, Qibla compass, and daily goals tracking. Built with Next.js.",
    image: "/img/projects/ramadan.png",
    liveUrl: "https://ramadancompass.vercel.app/",
    featured: true,
    technologies: ["Next.js", "Ramadan", "Prayer Times", "React", "PWA"],
    caseStudy: {
      role: "Frontend Engineer",
      timeline: "2024",
      problem: "Users needed prayer times, Qibla, and daily goals in one place.",
      solution: "Next.js PWA combining daily utilities and reminders.",
      impact: ["Simplified daily Ramadan routines in a single app."],
      metrics: [
        { label: "Platform", value: "PWA" },
        { label: "Core Features", value: "Prayer times + Qibla" },
      ],
    },
  },
  {
    id: "churn-analysis",
    title: "Customer Churn Analysis",
    description: "Predictive modeling using Python to identify at-risk customers. Implementation of Random Forest and XGBoost with 85%+ accuracy.",
    image: "/img/projects/churn.png",
    githubUrl: "https://github.com/saajiidi/Customer-Churn-Prediction/",
    featured: true,
    technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest"],
    caseStudy: {
      role: "ML Engineer",
      timeline: "2023",
      problem: "Identify at-risk customers before churn.",
      solution: "Built Random Forest and XGBoost models for churn prediction.",
      impact: ["Improved visibility into churn drivers."],
      metrics: [
        { label: "Reported Accuracy", value: "85%+" },
        { label: "Models", value: "RF + XGBoost" },
      ],
    },
  },
  {
    id: "security-map",
    title: "Security Map Visualization",
    description: "Interactive map-based visualization of security events developed using R, Folium, and Leaflet with temporal sliders.",
    image: "/img/projects/security_map.png",
    liveUrl: "https://trr-bd.vercel.app",
    featured: true,
    technologies: ["R", "Folium", "Leaflet", "Data Viz"],
    caseStudy: {
      role: "Data Visualization",
      timeline: "2023",
      problem: "Visualize security events with spatial and temporal context.",
      solution: "R + Folium + Leaflet map with temporal sliders.",
      impact: ["Improved spatial + temporal analysis for stakeholders."],
      metrics: [{ label: "Tech", value: "R, Folium, Leaflet" }],
    },
  },
  {
    id: "gdp-debt",
    title: "Economic Analysis",
    description: "Analysis of GDP vs Debt Correlation across global economies.",
    image: "/img/projects/economic.png",
    liveUrl: "https://saajiidi.github.io/Economic-Analysis-GDP-vs-Debt-Correlation/",
    featured: true,
    technologies: ["Data Analysis", "Economics", "Python"],
    caseStudy: {
      role: "Analyst",
      timeline: "2022",
      problem: "Understand GDP vs debt correlation across countries.",
      solution: "Cross-country analysis with comparative visuals.",
      impact: ["Highlighted macroeconomic patterns and outliers."],
      metrics: [{ label: "Scope", value: "Global economies" }],
    },
  },
  {
    id: "7",
    title: "E-Commerce Platform",
    description: "Modern e-commerce interface built with React.js featuring responsive design, product catalog, shopping cart functionality.",
    image: "/img/projects/platform.png",
    liveUrl: "https://gear-master.vercel.app/",
    featured: false,
    technologies: ["React", "E-commerce", "Frontend"],
    caseStudy: {
      role: "Frontend Engineer",
      timeline: "2022",
      problem: "Need a modern, responsive e-commerce interface.",
      solution: "React UI with catalog and cart workflows.",
      impact: ["Delivered a clean, mobile-ready shopping experience."],
      metrics: [{ label: "Modules", value: "Catalog + Cart" }],
    },
  },
  {
    id: "8",
    title: "Day Progress Plus",
    description: "A productivity focused application featuring day progress tracking, focus task management, and customizable settings.",
    image: "/img/projects/productivity.png",
    liveUrl: "https://saajiidi.github.io/TimeTracker/",
    featured: false,
    technologies: ["Productivity", "React", "Utility"],
    caseStudy: {
      role: "Productivity App Builder",
      timeline: "2022",
      problem: "Track daily progress and focus tasks in one view.",
      solution: "Day progress tracker with focus task management.",
      impact: ["Improved daily planning and focus."],
      metrics: [{ label: "Features", value: "Progress + Focus tasks" }],
    },
  },
  {
    id: "9",
    title: "Growth Analysis Dashboard",
    description: "A comprehensive web development project showcasing modern web technologies and best practices.",
    image: "/img/projects/ecommerce.png",
    liveUrl: "https://saajiidi.github.io/Growth-Analysis-Dashboard/",
    featured: false,
    technologies: ["Web Dev", "React", "Analytics"],
    caseStudy: {
      role: "Frontend Engineer",
      timeline: "2022",
      problem: "Centralize growth metrics into a single dashboard.",
      solution: "Analytics dashboard showcasing key KPIs.",
      impact: ["Simplified growth reporting for quick reviews."],
      metrics: [{ label: "Focus", value: "Analytics KPIs" }],
    },
  },
  {
    id: "10",
    title: "Border Security Analysis",
    description: "Data visualization project analyzing border incident trends in Bangladesh using statistical methods.",
    image: "/img/projects/sentinel.png",
    liveUrl: "https://saajiidi.github.io/Border-Killing-Trend-in-Bangladesh/",
    featured: false,
    technologies: ["Data Viz", "Statistics", "Social Impact"],
    caseStudy: {
      role: "Data Analyst",
      timeline: "2021",
      problem: "Analyze border incident trends in Bangladesh.",
      solution: "Statistical analysis with clear visualizations.",
      impact: ["Made incident trends easier to interpret."],
      metrics: [{ label: "Methods", value: "Stats + Data Viz" }],
    },
  },
  {
    id: "11",
    title: "Image Scraper",
    description: "Versatile Python tool for downloading images from Pinterest with multiple interfaces including web UI and command line.",
    image: "/img/projects/scraper.png",
    liveUrl: "https://img-scraper.streamlit.app/",
    featured: false,
    technologies: ["Python", "Scraping", "Automation"],
    caseStudy: {
      role: "Python Developer",
      timeline: "2021",
      problem: "Collect images from Pinterest efficiently.",
      solution: "Python tool with web UI and CLI options.",
      impact: ["Faster dataset creation for research and projects."],
      metrics: [{ label: "Interfaces", value: "Web UI + CLI" }],
    },
  },
  {
    id: "12",
    title: "Tableau Portfolio",
    description: "Demographics, economic analysis, and security incident maps.",
    image: "/img/projects/tableau.png",
    liveUrl: "https://public.tableau.com/app/profile/sajid.islam4721/viz/MuslimPopulationbyEthinicity/Dashboard1",
    featured: false,
    technologies: ["Tableau", "Data Visualization"],
    caseStudy: {
      role: "BI Analyst",
      timeline: "2021",
      problem: "Showcase Tableau dashboards in one place.",
      solution: "Published portfolio of interactive dashboards.",
      impact: ["Centralized BI work for easy sharing."],
      metrics: [{ label: "Platform", value: "Tableau Public" }],
    },
  },
  {
    id: "13",
    title: "B2B StockLot E-Commerce",
    description: "Web development project for B2B e-commerce.",
    image: "/img/projects/platform.png",
    liveUrl: "https://github.com/saajiidi/B2B-StockLot-E-Commerce-BD",
    featured: false,
    technologies: ["HTML/CSS", "JavaScript", "Web Dev"],
    caseStudy: {
      role: "Web Developer",
      timeline: "2020",
      problem: "Create an online presence for B2B stock lot sales.",
      solution: "Static site built with HTML, CSS, and JavaScript.",
      impact: ["Provided a basic online storefront."],
      metrics: [{ label: "Stack", value: "HTML/CSS/JS" }],
    },
  },
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
        id: "portfolio-site",
        label: "Portfolio Site",
        href: "/portfolio-site",
        icon: "globe",
        extension: "web",
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
    items: projects.filter(p => p.featured).map((p) => {
      let extension = "ts";
      if (p.technologies.includes("Python")) extension = "py";
      else if (p.technologies.includes("React") || p.technologies.includes("Next.js")) extension = "tsx";
      else if (p.technologies.includes("R")) extension = "r";
      else if (p.technologies.includes("Tableau")) extension = "tableau";

      return {
        id: `project-${p.id}`,
        label: p.title.replace(/\s+/g, ""),
        href: `/projects/${p.id}`,
        icon: "code",
        extension: extension,
      };
    }),
  },
  {
    id: "hobbies",
    label: "HOBBIES",
    isOpen: false,
    items: [
      { id: "favorites", label: "Favorites", href: "/Favorites", icon: "star", extension: "tsx" },
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
    id: "mission-tools",
    label: "TOOLS",
    isOpen: true,
    items: [
      { id: "word-writer", label: "Word", href: "/Tools/Word", icon: "file-text", extension: "docx" },
      { id: "excel-grid", label: "Excel", href: "/Tools/Excel", icon: "table", extension: "xlsx" },
      { id: "ppt-deck", label: "PowerPoint", href: "/Tools/PowerPoint", icon: "presentation", extension: "pptx" },
      { id: "code-editor", label: "Code Editor", href: "/Tools/CodeEditor", icon: "code", extension: "tsx" },
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
    url: "https://saajiidi.github.io/resume.html",
    icon: "file-text",
    color: "#da552f",
  },
];

export const menuItems: MenuItem[] = [
  { label: "File", items: ["New File", "Open File", "Open Folder", "---", "Save", "Save As", "---", "Exit"] },
  { label: "Edit", items: ["Undo", "Redo", "---", "Cut", "Copy", "Paste", "---", "Find", "Replace"] },
  { label: "Selection", items: ["Select All", "Expand Selection", "Shrink Selection"] },
  { label: "View", items: ["Explorer", "Search", "Source Control", "---", "Terminal", "AI Chat", "---", "Full Screen"] },
  { label: "Go", items: ["Go to File", "Go to Symbol", "---", "Next Dossier", "Previous Dossier"] },
  { label: "Help", items: ["Welcome", "Documentation", "Check for Updates", "---", "About"] },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Data Analytics & BI",
    skills: [
      { name: "Python", category: "Data", icon: "https://img.icons8.com/color/48/null/python--v1.png" },
      { name: "SQL (MySQL, PostgreSQL, BigQuery)", category: "Data", icon: "https://img.icons8.com/ios-filled/100/000000/sql.png" },
      { name: "Power BI (DAX, Modeling)", category: "BI", icon: "https://img.icons8.com/color/48/000000/power-bi.png" },
      { name: "Tableau", category: "BI", icon: "https://img.icons8.com/color/48/000000/tableau-software.png" },
      { name: "Analytics (R, Excel)", category: "Data", icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png" },
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
      { name: "Agile Development & Scrum", category: "Core" },
      { name: "Data-Driven Decision Making", category: "Core" },
      { name: "End-to-End Analytics Pipelines", category: "Core" }
    ]
  }
];


export const experiences: Experience[] = [
  {
    id: "deencommerce",
    title: "Business Analyst",
    company: "Deen Commerce",
    location: "Mirpur, Dhaka",
    startDate: "June 2025",
    current: true,
    description: "Leading Business Strategy and CRM growth through granular performance tracking. Architecting weekly performance dashboards.",
    highlights: [
      "CRM Improvisation",
      "Business Strategy",
      "Architecting weekly performance dashboards for stakeholder reporting"
    ],
    technologies: ["CRM", "Business Analysis", "Strategy"],
    logo: "https://www.google.com/s2/favicons?domain=deencommerce.com&sz=128",
  },
  {
    id: "nztex",
    title: "IT Executive",
    company: "NZ TEX GROUP",
    location: "Rupganj, Narayanganj",
    startDate: "Feb 2024",
    endDate: "May 2024",
    description: "Collaborated with the Research & Development Team to enhance product innovation. Delivered impactful presentations and reports to authorities and buyers.",
    highlights: [
      "Collaborated with the Research & Development Team to enhance product innovation",
      "Delivered impactful presentations and reports to authorities and buyers, enhancing stakeholder engagement and decision-making"
    ],
    technologies: ["IT Support", "R&D", "Reporting"],
    logo: "https://www.google.com/s2/favicons?domain=nztexgroup.com&sz=128",
  },
  {
    id: "thrivingskills",
    title: "Associate – Online Sales & Customer Supports",
    company: "Thriving Skills",
    location: "Gulshan, Dhaka",
    startDate: "Oct 2023",
    endDate: "Jan 2024",
    description: "Conducted business and marketplace analysis; executed targeted sales strategies to increase customer loyalty and engagement.",
    highlights: [
      "Conducted comprehensive business and marketplace analysis, identifying opportunities that increased sales",
      "Designed and executed targeted sales strategies, resulting in a significant increase in customer loyalty and engagement",
      "Managed CRM systems to improve customer retention"
    ],
    technologies: ["Market Analysis", "CRM", "Sales Strategy"],
    logo: "https://www.google.com/s2/favicons?domain=thrivingskills.com&sz=128",
  },
  {
    id: "daraz",
    title: "Jr. Executive – Marketplace",
    company: "Daraz Bangladesh Ltd.",
    location: "Banani, Dhaka",
    startDate: "Jan 2020",
    endDate: "Jan 2022",
    description: "Increased partner acquisitions by 50% through targeted outreach strategies. Managed key accounts and increased client satisfaction by 20%.",
    highlights: [
      "Drove a 50% increase in partner acquisitions by implementing targeted outreach strategies and enhancing brand visibility",
      "Led successful campaigns and managed key accounts, increasing client satisfaction by 20% and driving revenue growth",
      "Optimized Marketplace Health through vendor performance tracking"
    ],
    technologies: ["Marketplace", "Acquisition", "Account Management"],
    logo: "https://www.google.com/s2/favicons?domain=daraz.com.bd&sz=128",
  },
  {
    id: "hungrynaki",
    title: "Associate – Home Kitchen & Street Food",
    company: "HungryNaki (Sister concern of Daraz)",
    location: "Banani, Dhaka",
    startDate: "Jul 2021",
    endDate: "Jan 2022",
    description: "Identified 15% growth opportunities through in-depth marketplace analysis. Spearheaded partner acquisition initiatives, increasing the network by 25%.",
    highlights: [
      "Conducted in-depth business and marketplace analysis, identifying 15% growth opportunities that increased revenue",
      "Spearheaded brand and partner acquisition initiatives, increasing partner network by 25%",
      "Leveraged BI tools to identify hyper-local food trends"
    ],
    technologies: ["Business Analysis", "Growth Strategy", "BI Tools"],
    logo: "https://www.google.com/s2/favicons?domain=hungrynaki.com&sz=128",
  },
  {
    id: "gearmaster",
    title: "Co-Founder",
    company: "Gear Master",
    startDate: "2024",
    current: true,
    description: "Leading Business Operations for a bike accessories retail startup. Managing inventory and sales growth strategies.",
    highlights: [
      "Leading Business Operations for a bike accessories retail startup",
      "Managing inventory, sales growth strategies, and multi-channel customer engagement"
    ],
    technologies: ["Retail", "Business Management"],
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  }
];

export const favoriteMedia = [
  {
    id: "1",
    title: "Kingdom of Heaven",
    subtitle: "Movie",
    image: "/kingdom_of_heaven.png",
  },
  {
    id: "2",
    title: "Fatih 1453",
    subtitle: "Movie",
    image: "/fatih_1453.png",
  },
  {
    id: "3",
    title: "The Godfather",
    subtitle: "Novel",
    image: "/godfather.png",
  },
  {
    id: "4",
    title: "Tom & Jerry",
    subtitle: "Animated Series",
    image: "/tom_jerry.png",
  },
  {
    id: "5",
    title: "Pokemon",
    subtitle: "Animated Series",
    image: "/pokemon.png",
  },
  {
    id: "6",
    title: "Popeye the Sailor Man",
    subtitle: "Animated Series",
    image: "/popeye.png",
  },
  {
    id: "7",
    title: "Powerpuff Girls",
    subtitle: "Animated Series",
    image: "/powerpuff_girls.png",
  },
  {
    id: "8",
    title: "The Terminator Series",
    subtitle: "Movie Series",
    image: "/terminator.png",
  },
  {
    id: "9",
    title: "Rambo Series",
    subtitle: "Movie Series",
    image: "/rambo.png",
  },
];

export const gamingPlatforms = [{ name: "PC" }];

export const favoriteGames = [
  { name: "Valorant", category: "FPS", platform: "PC" },
  { name: "Marvel Rivals", category: "FPS", platform: "PC" },
  { name: "Forza Horizon 5", category: "Racing", platform: "PC" },
  { name: "FIFA", category: "Sports", platform: "PC" },
  { name: "Fortnite", category: "Battle Royale", platform: "PC" },
  { name: "Snake (Nokia)", category: "Classic", platform: "Nokia Mobile" },
  { name: "Tetris", category: "Puzzle", platform: "Mobile" },
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
    id: "hardware-vs-software-analogy",
    title: "Hardware Solutions vs. Software Solutions: A Systems Analogy for Structural Change",
    excerpt: "Exploring why deep structural problems require architectural hardware solutions rather than cosmetic software patches.",
    date: "2024-04-02",
    url: "#",
    tags: ["Systems", "Architecture", "Sociology"],
    content: `
People with a background in computer science will immediately understand this distinction: most problems are approached in two fundamentally different ways – software solutions and hardware solutions.

A software solution works within the same hardware architecture. You patch, update, tweak, optimize. If the problem is small, temporary, or tactical, this often works. It keeps costs low and avoids disruption. But software fixes are inherently limited by the architecture they run on.

A hardware solution, on the other hand, is expensive, disruptive, and uncomfortable. But it is the only way to solve deep, structural, long-term problems. True technological progress requires continuous research and development at the architectural level – not just cosmetic updates. You cannot solve every problem with software alone.

### The Limits of Software Within a Fixed Architecture
No matter how sophisticated your software is, it cannot violate the rules of the operating system beneath it. Programs built under Windows must obey Windows' constraints. Even if you build a custom Linux distribution, it remains Linux. And if all of it runs on Intel's x86 architecture, changing operating systems won't change the fundamental limits. That is precisely why mobile computing shifted toward ARM architecture. Some problems cannot be solved by clever coding alone; they require a change in architecture.

### Applying the Analogy to Political and Religious Reality
This distinction maps cleanly onto the question of Islam in the modern nation-state system. Islam is not merely a belief system operating inside a political framework. It is civilizational, legal, and structural. Modern secular nation-states – especially those governed by democratic constitutions – are not architecturally designed to carry Islam in its full form. At best, they allow partial expression.

Trying to fully implement Islam within a secular democratic parliament is like trying to bypass kernel-level restrictions with user-space scripts. Logically, it is next to impossible. At most, Muslims are tolerated as protected residents – allowed to practice religion only to the extent the system permits. As long as Muslims behave like compliant tenants, pay their dues, and remain within boundaries, the system is fine with them. But the moment you challenge the architecture itself, the system responds – not with debate, but with force.

### When the System Detects a "Threat"
Once you go beyond permitted limits, you are no longer a citizen with opinions – you become a threat vector. The response is predictable: anti-terror laws, surveillance, criminalization, ideological "antivirus software." The language may differ, but the logic is identical to cybersecurity: neutralize the anomaly before it spreads.

### Comfort Zones and Resistance to Architectural Change
Those who benefit from the current system – politically, economically, socially – will tell you that questioning the architecture itself is madness. They will call you unrealistic, extremist, or dangerous. More importantly, they will work actively to keep the public ignorant, because ignorance protects their comfort zone. Their worldview is simple: Not deen over dunya, but dunya over deen. They prefer endless software patches inside a system they control rather than a hardware change that threatens their status.

### The Exposure of Hypocrisy
Ironically, they argue most loudly against hardware solutions by claiming they are "too costly." But the moment someone creates a low-cost software solution that exploits their own policy loopholes and disrupts their comfort, the mask slips. Suddenly, even software becomes unacceptable. This is where hypocrisy becomes visible. The issue was never cost – it was control.

### Da'wah, Discomfort, and the Limits of Tolerance
Take da'wah as an example. As long as da'wah remains abstract, individual, non-threatening, and detached from power structures, it is tolerated – even praised. It is framed as one "good deed" among many, carefully balanced against other "acts of worship" so that no one's lifestyle is disturbed. But when da'wah begins to question foundational assumptions, challenge economic interests, or point toward actual tawheed in practice – not just in slogans – it is immediately reclassified. It stops being "da'wah" and becomes "fitnah." At that moment, the system's allies can no longer hide their contradiction.

### The Unveiling of Masks
Ultimately, it is Allah who removes masks – not arguments, not debates. Situations arise that force people to reveal what they truly prioritize. And when that happens, excuses collapse. Because Allah is the Best of Planners, and no system – no matter how powerful – can conceal reality forever.

### Final Thought
You can optimize software endlessly. You can patch, adapt, and compromise. But when the problem is architectural, only a hardware solution will do. Ignoring that truth may preserve comfort – but it guarantees stagnation.
    `
  },
  {
    id: "men-marriage-masculinity",
    title: "Men, Marriage, and Masculinity: Rediscovering Responsibility",
    excerpt: "Exploring the missing foundation in modern marriage and the rediscovery of leadership grounded in responsibility and justice.",
    date: "2024-04-01",
    url: "#",
    tags: ["Society", "Marriage", "Leadership"],
    content: `
Men, Marriage, and Masculinity: Rediscovering Responsibility and Leadership in Modern Times

### Friendship Is Not Enough: The Missing Foundation in Marriage
In today's world, many men enter marriage hoping to find in their wife a best friend – someone to laugh with, share hobbies, and enjoy companionship. This ideal sounds appealing and emotionally fulfilling, especially at the beginning. Yet, experience often proves that friendship alone cannot sustain a marriage. Once the initial excitement fades, couples frequently face confusion, emotional distance, or frustration. Why? Because marriage is not merely a friendship; it is a structured bond that requires leadership, responsibility, and justice. Men are naturally designed to lead with compassion and fairness. When this role is denied or misunderstood, both partners feel unsettled. The man's need for respect clashes with the woman's need for protection and stability – and the relationship begins to lose balance.

### The Modern Woman's Expectation: A "Friend," Not a Leader
Contemporary culture often encourages women to see their husbands primarily as equals in friendship – but not as leaders in responsibility. The idea of a husband being an authoritative figure, even in a moral or protective sense, is often rejected. However, leadership in marriage does not mean domination. Islam teaches that a husband's authority must be rooted in mercy, justice, and accountability before God. He must protect, provide, and guide – not control or humiliate. This balance is delicate yet essential. When a man abandons leadership out of fear of being labeled "patriarchal," and when a woman refuses any form of moral or emotional guidance, the marriage risks losing its direction and purpose.

### Resisting the Pressure of Collective Trends
In the age of social media and ideological movements, men face increasing pressure to conform to popular narratives about masculinity and relationships. Many feel compelled to act in ways that gain women's approval collectively – often at the cost of authenticity. But Islam teaches that moral integrity should not depend on popularity. A man's character must remain rooted in his values, not in fleeting societal expectations. Every era has its collective biases – among both men and women. Recognizing them does not mean surrendering to them. The Prophet Muhammad ﷺ exemplified balance: he was compassionate, humble, and emotionally intelligent, yet firm in decision and leadership. That is the model of manhood Islam calls for – not arrogance, not weakness.

### Honoring Women Without Losing Masculine Essence
Respect for women is a moral obligation. But honoring women does not mean erasing masculine identity or surrendering one's principles to collective approval. A man's worth does not depend on how well he fits into the image society promotes as "ideal." True respect arises when both men and women fulfill their divinely designed roles – each complementing the other's strengths. Being kind does not mean being passive; being gentle does not mean being weak. The best men, as described in Islamic tradition, are those who treat women with dignity while standing firmly in moral and emotional leadership.

### Restoring Balance: Men as Men, Women as Women
Modern ideological movements often blur natural distinctions between men and women – distinctions that have existed across cultures and civilizations. Islam, however, preserves these differences as part of divine design, not inequality. Men and women are equal in value, but distinct in role. A society thrives when both embrace their natural and moral responsibilities – when men embody leadership grounded in justice, and women respond with loyalty, partnership, and wisdom. Distorting this balance harms not only marriages but the social structure itself. When men become hesitant to lead, and women are pressured to imitate masculine roles, families lose harmony, and children grow up without clear examples of identity and responsibility.

### Conclusion: Leadership Rooted in Responsibility
Marriage is not a contest between equality and authority – it is a partnership of roles. A man's leadership is not a privilege; it is a heavy responsibility before God. A woman's respect is not subservience; it is a recognition of trust. In a world increasingly confused about gender and identity, Islam's timeless guidance reminds us that true harmony lies in balance, not in competition. Men must rediscover their responsibility as protectors and leaders, and women their dignity as nurturers and partners. Only then can the home – the foundation of society – remain a place of peace, respect, and love.
    `
  },
  {
    id: "modern-financial-system",
    title: "আমেরিকা নিয়ন্ত্রিত আধুনিক অর্থব্যবস্থা",
    excerpt: "বর্তমান বৈশ্বিক অর্থনীতির কাঠামো, ব্রেটন উডস সিস্টেম, নিক্সন শক এবং পেট্রোডলার সিস্টেমের একটি বিস্তারিত বিশ্লেষণ।",
    date: "2024-03-31",
    url: "#",
    tags: ["Economy", "Finance", "History"],
    content: `
আমেরিকা নিয়ন্ত্রিত আধুনিক অর্থব্যবস্থা

বর্তমান বৈশ্বিক অর্থনীতির কাঠামো যে আধুনিক অর্থ ব্যবস্থার ওপর দাঁড়িয়ে আছে, যেখানে বিভিন্ন চুক্তি, ঘটনাপ্রবাহ, এবং প্রতিষ্ঠান যেমন IMF ও World Bank এর ভূমিকা কিংবা বিভিন্ন প্রেক্ষাপট ও চুক্তি যেমন ব্রেটন উডস সিস্টেম, কিংবা পেট্রোডলার সিস্টেম এবং বিশেষ করে নিক্সন শক এর মত ঘটনটাগুলো বুঝটা খুব জরুরী।

আমি ধাপে ধাপে বিশ্লেষণ করলাম

### ব্রেটন উডস সিস্টেম
দ্বিতীয় বিশ্বযুদ্ধের পর বৈশ্বিক অর্থনীতির স্থিতিশীলতা নিশ্চিত করতে ১৯৪৪ সালে ব্রেটন উডস চুক্তি স্বাক্ষরিত হয় মিত্র শক্তির দেশগুলোর মধ্যে। এর মাধ্যমে একটি নতুন অর্থনৈতিক কাঠামোর সূচনা হয়। মূলত দ্বিতীয় বিশ্বযুদ্ধে ইউরোপের অর্থনীতির অবস্থা খারাপ হয়ে গিয়েছিল। যুদ্ধে ইউরোপ তাদের স্বর্ণগুলো আমেরিকার কাছে রিজার্ভ রেখে পণ্য আমদানি করতো। সে সময়টাতে আমেরিকার কাছে স্বর্ণ মজুদ ছিল ২০,০০০ মেট্রিক টন, যা বিশ্বে মোট স্বর্ণের মজুদের প্রায় ৭০%। ব্রেটন উডস চুক্তির মূল বিষয়বস্তু:
1. ডলারের স্বর্ণমান: মার্কিন ডলারকে স্বর্ণের সাথে সংযুক্ত করা হয় (১ আউন্স স্বর্ণ = ৩৫ ডলার)।
2. অন্যান্য মুদ্রাকে ডলারের সাথে স্থির বিনিময় হারে সংযুক্ত করা হয়।
3. IMF ও World Bank এর প্রতিষ্ঠা।
অর্থাৎ মিত্র শক্তির দেশগুলো ডলার দিয়ে বানিজ্য করবে এবং তাদের একাউন্ট ফেডারাল রিজার্ভে থাকবে। চুক্তি অনুযায়ী শর্ত হল যে, আমেরিকা ৩৫ ডলারের বিনিময়ে ১ আউন্স স্বর্ণ ফেরত দিতে বাধ্য থাকবে।

### নিক্সন শক
৬০ এর দশকে আমেরিকা ভিয়েতনামের সাথে যুদ্ধে জড়িয়ে পড়ে। যুদ্ধের কারণে ডলারের মুদ্রাস্ফিতি বেড়ে যায় এবং স্বর্ণের মজুদ ২০,০০০ মেট্রিক টন থেকে ৮,০০০ মেট্রিক টনে নেমে আসে। ১৯৭১ সালে মার্কিন প্রেসিডেন্ট রিচার্ড নিক্সন স্বর্ণের সাথে ডলারের সংযোগ বাতিল করেন। তিনি ঘোষণা করেন যে, আমেরিকা আর স্বর্ণ ফেরত দিতে বাধ্য নয়। এই ঘটনাটাই নিক্সন শক নামে পরিচিত। এর ফলে আধুনিক 'ফিয়াট' মুদ্রা ব্যবস্থার সূচনা ঘটে, যেখানে ডলারের মূল্য কোনো পণ্যের ওপর নির্ভরশীল নয় বরং চাহিদা ও সরবরাহের ওপর ভিত্তি করে নির্ধারিত হয়।

### পেট্রোডলার সিস্টেম
ব্রেটন উডস ব্যবস্থার পতনের পর, ১৯৭০-এর দশকে মার্কিন যুক্তরাষ্ট্র সৌদি আরব ও অন্যান্য ওপেক সদস্যদের সাথে একটি চুক্তি করে। এই চুক্তি অনুযায়ী তেল শুধুমাত্র ডলারে বিক্রি করতে হবে। এতে সারা বিশ্ব বাধ্য হবে তেলের চাহিদার কারণে ডলারের উপর নির্ভর করতে। আগে স্বর্ণ ব্যাকিং দিত ডলারকে, আর এখন পেট্রোলিয়াম তেল ব্যাকিং দিচ্ছে ডলারকে। এজন্য একে ব্ল্যাক গোল্ডও বল হয়।

### IMF এবং World Bank এর মাধ্যমে হেজেমনি
IMF এবং World Bank এর প্রধান সিদ্ধান্ত গ্রহণে আমেরিকার প্রভাব মারত্মক। তারা এই প্রতিষ্ঠানগুলোর মাধ্যমে ডলারকে ঋণ হিসেবো সারা বিশ্বে ছড়িয়ে দেয়। এতে করে ফিয়াট কারেন্সী হলেও দেশগুলো ডলারে আস্থা রাখতে বাধ্য হয়। IMF এ প্রায় ১৭% এবং World Bank তে প্রায় ১৫% ভোটাধিকার আছে আমেরিকার। স্যাংশন দেয়ার ক্ষেত্রেও আমেরিকা এই সুবিধাগুলো ব্যবহার করে।

### উপসংহার
আমেরিকা তার রপ্তানি করে আমদানী করে এর চেয়ে বেশী। বাণিজ্য ঘাটতি থাকা সত্ত্বেও ডলারের শক্তি ব্যবহার করে সে এই ঘাটতি পূরণ করতে পারে। বর্তমান আন্তার্জাতিক অর্থ ব্যবস্থা আমেরিকাকে এক অসীম ক্ষমতার প্রদান করেছে, যা দিয়ে সে সারা বিশ্বকে অর্থনৈতিক শোষণ তো করছেই, সাথে সাথে আগ্রাসন চালানোর ক্ষেত্রে অনেক সুবিধা পাচ্ছে।

---
[SUPPORT_UPLINK]: https://saajiidi.github.io/Economic-Analysis-GDP-vs-Debt-Correlation/financial_history.html
    `
  },
  {
    id: "organizational-structures-rethinking",
    title: "Rethinking Organizational Structures for Effectiveness and Sustainability",
    excerpt: "A critical analysis of the 13 essential components required for organizational sustainability and impact in the modern era.",
    date: "2024-03-29",
    url: "#",
    tags: ["Management", "Organization", "Strategy"],
    content: `
In today's rapidly evolving world, traditional organizational methods often fail to deliver the desired impact. To remain functional and effective, organizations must adapt to modern realities. Take, for instance, Hefazat-e-Islam — how can it transform into a more structured and efficient entity? This article explores the necessary components that any organization, including Hefazat, must incorporate for sustainability and effectiveness.

### 1. Establishing a Clear Organizational Constitution
Every structured organization needs a well-defined constitution outlining its goals, operational framework, and guiding principles. This document should specify whether the organization is committed to an Islamic framework or merely a regional agenda. A permanent consultative council (Shura) should exist alongside temporary councils, ensuring inclusivity by involving external experts when needed.

### 2. Financial Transparency and Accountability
Does Hefazat conduct audits of its income and expenditures? For an organization to gain public trust and participation, it must maintain a transparent record of donations and expenses. These financial statements should be accessible to the public, reinforcing accountability and increasing mass engagement.

### 3. Dedicated Media and Public Relations Wing
A strong media presence is crucial in today's digital landscape. Hefazat should have a dedicated media wing managing a weekly newspaper or at least a monthly magazine, with an online version readily available. Without an official presence on social media and mainstream media platforms, an organization cannot effectively communicate its message or counter misinformation.

### 4. Research and Development (R&D) Team
Is there a dedicated team for research and development? If not, why? Any successful organization must have an R&D unit to analyze current trends, develop strategies, and provide solutions. If experts exist who can provide strategic insights, why is Hefazat not engaging with them?

### 5. Crisis Response and Legal Assistance Teams
Does Hefazat have a quick-response team for emergencies? What about a dedicated legal team to provide legal assistance to its members? If these critical components are missing, the organization risks inefficiency in addressing legal and social challenges.

### 6. Monitoring and Market Research Unit
A specialized monitoring team should be in place to assess the state of Islam in the country, gauge the intensity of Islamophobia, and track adversarial movements such as Christian missionary activities, Qadiani or other Islamic influence, and secularist agendas. This team should collaborate with R&D experts to formulate appropriate policies.

### 7. Dedicated Da'wah (Outreach) Team
A structured approach to Da'wah is crucial. A dedicated team must work systematically, recruiting qualified individuals and implementing well-thought-out outreach strategies aligned with the organization's policies.

### 8. Intelligence and Security Wing
Does Hefazat have its own intelligence unit? If not, why? If such a unit exists, how effective is it? An organization must have a well-trained intelligence team to safeguard its interests, monitor threats, and place competent personnel in key positions.

### 9. Future Leadership Development Program
The absence of structured leadership grooming is a major weakness in many organizations. A dedicated program to train future leaders is essential to ensure continuity and strategic vision.

### 10. Chain of Command and Performance Accountability
Organizations must establish a clear hierarchy where responsibilities and projects are well-defined. Reports should be regularly submitted to the leadership for evaluation and future planning.

### 11. Proactive vs. Reactive Approach
An organization should clearly define whether it is proactive or reactive in its constitution. The goal should be to take strategic initiatives rather than simply reacting to external threats.

### 12. Self-Sustaining Financial Mechanism
Should the organization rely solely on donations, or should it develop sustainable revenue-generating mechanisms? The financial strategy must be clearly outlined to ensure long-term stability.

### 13. Public Relations and Inter-Organizational Collaboration
A strong public relations team is vital to foster alliances and influence other groups. Skilled personnel should be placed in key roles to facilitate collaborations and negotiate effectively with various stakeholders.

These are some critical components necessary for any organization's effectiveness. Without these structural reforms, organizations risk becoming obsolete. Hefazat was used as an example, but these recommendations apply universally to all organizations aiming for long-term success.
    `
  },
  {
    id: "hill-tribes-bangladesh",
    title: "Understanding the Hill Tribes of Bangladesh: History, Dynamics, and Future Directions",
    excerpt: "A deep-dive analysis into the two major groups of hill tribes in Bangladesh, their origins, cultural dynamics, and strategic policy implications.",
    date: "2024-03-30",
    url: "#",
    tags: ["Sociology", "History", "Policy"],
    content: `
Bangladesh's hill tribes present a diverse tapestry of history, culture, and complex interrelations shaped over centuries. These tribes are generally classified into two broad groups based on their origins, cultural traits, and historical migrations. Understanding these dynamics is crucial for fostering harmony and addressing challenges in the Chittagong Hill Tracts (CHT) and beyond.

### Group 1: Ancient Migrants from China
The first group of hill tribes migrated from China thousands of years ago due to natural calamities like floods and riverbank erosion. They traveled through river routes to settle in what are now parts of northeastern India and Bangladesh. Their primary settlements were in areas that currently bear their names, such as Tripura, Manipur, Nagaland, and Mizoram. These tribes share familial and cultural ties, which have persisted through generations.

**Cultural Traits**: This group is known for its softer disposition and practices nature worship, although a significant portion has embraced Christianity in recent times. Over centuries, intermarriages with Bengalis, especially among the Tripura community, have further blended their cultural identities.

**Historical Connection with Bengal**: The Tripura region, once closely linked with Comilla, Brahmanbaria, and Feni, reflects this integration. Even the name "Comilla" is rooted in the Kokborok language of the Tripura people. This historical intertwining has cultivated a generally amicable relationship between this group and the majority Bengali population.

### Group 2: Recent Migrants from Southeast Asia
The second group of hill tribes, including the Chakmas, migrated from parts of present-day Thailand and eastern Myanmar around 100–200 years ago. Their lifestyle and cultural practices reflect the harsher realities of their relatively recent migration.

**Cultural Traits**: Predominantly Buddhist, many in this group are also converting to Christianity. Their comparatively rigid lifestyle is reflected in their behavior and dietary habits.

**Distinct Identity and Challenges**: This group is often seen as more assertive, with some factions seeking separatism. Their complex relationship with both India and Bangladesh often manifests in geopolitical tensions, especially as India supports Chakma separatist movements.

### Key Differences Between the Groups
The two groups differ in their historical roots, cultural practices, and political alignments:
- **Disposition**: The first group is softer and more integrated with local communities, while the second is assertive and occasionally confrontational.
- **Political Alignments**: India's support for Chakma separatists contrasts with its lack of support for the Group 1, because Group 1 separatists are against India, they want their independent states in the Nort-East. They use this part of the border in Bangladesh as a hide out within their community.
- **Inter-group Dynamics**: The two groups often clash, with the more recent migrants (Group 2) dominating the older settlers (Group 1) in resources and political leverage.

### Policy Implications for Bangladesh
To address the challenges posed by these dynamics, Bangladesh needs nuanced policies that recognize the distinct identities and histories of these groups. Here are some strategies:
1. **Tailored Approaches**: Treat the two groups differently based on their historical and cultural context. For instance, providing additional support to the Group 1 community could strengthen their integration and counterbalance Chakma separatism.
2. **Promote Religious and Cultural Harmony**: Actively support Islamic and interfaith outreach efforts to counter the influence of missionary NGOs. Encouraging local dāʿwah (Islamic propagation) initiatives could foster harmony and mutual understanding.
3. **Enhanced Governance**: Strengthen government presence in the region to reduce the influence of separatist factions. Equip security forces with better training to distinguish between groups and respond appropriately.
4. **Empower Local Communities**: Encourage education, vocational training, and infrastructure development to empower hill communities, reducing their reliance on external actors, including NGOs with ulterior motives.
5. **Leveraging History**: Emphasize historical ties and mutual interests between the Bengali majority and the Group 1 & 2 to foster national unity. Initiatives celebrating shared cultural heritage can reinforce this bond.

### Conclusion
The hill tribes of Bangladesh are a vital part of the nation's cultural mosaic. However, their diverse origins and evolving dynamics necessitate thoughtful engagement. By understanding their history, addressing their grievances, and fostering inclusive development, Bangladesh can transform these challenges into opportunities for national integration and harmony.
    `
  },
  {
    id: "learning-lion-tigers",
    title: "Learning from Lion & Tigers: Adapting Strategy to Context",
    excerpt: "Exploring the metaphorical strategy of the tiger versus the lion in modern tactical and business environments. A lesson in stealth and precision.",
    date: "2024-03-30",
    url: "/Blogs/learning-lion-tigers",
    tags: ["Strategy", "Tactics", "Adaptability"],
    content: `
Everyone wants to be a lion, the king of the jungle – majestic, powerful, and roaring in dominance. Yet, when it comes to guerrilla warfare, revolutionary movements, or grassroots struggles, adopting the lion's approach can lead to failure. Especially on this land, this terrain. Here, the metaphorical tiger reigns supreme. The tiger's strategy, not the lion's, holds lessons for survival and success.

### The Context: Then and Now
During the time of the Sahaba (companions of the Prophet Muhammad ﷺ) or the reigns of Muslim sultans, battles were fought in open fields, often head-on. These wars demanded the lion's bravery, its boldness, and its leadership in the forefront. The Muslim community was already in power, and their strategies reflected their dominance.

But today's reality is drastically different. Muslims are not sitting on thrones or commanding empires. The environment demands adaptability, stealth, and strategic camouflage – qualities that align more with the tiger than the lion.

### The Tiger's Approach
In the animal kingdom, lions and tigers embody contrasting approaches to survival and dominance:

*   **Lions: Visible and Group-Oriented**
    Lions live in prides, openly claiming territories. Their strength lies in numbers, and their roar signals power. While this works well in open savannahs, where visibility is an advantage, such a strategy fails in dense forests where stealth is key.

*   **Tigers: Solitary and Camouflaged**
    Tigers are solitary hunters. They blend seamlessly into their surroundings, thanks to their striped coats that mimic the shadows of trees. They strike silently, with precision. In places like the Sundarbans, tigers remain elusive, often observing humans far more than humans spot them.

### Lessons for Today
1.  **Adapt to the Terrain**: Just as lions thrive on open plains but struggle in forests, strategies suited for one context may not work in another. Stealth, adaptability, and decentralization – traits of the tiger – are more effective.
2.  **Avoid Unnecessary Confrontation**: Tigers don't attack without reason. They are calculated, saving their energy for meaningful pursuits. Similarly, not every challenge requires a direct confrontation.
3.  **Blend In Strategically**: Camouflage is the tiger's greatest asset. In a metaphorical sense, this means blending into society, understanding its nuances, and working from within to achieve goals. 
4.  **Recognize Individual Strengths**: While lions rely on the pride, tigers operate alone. In certain contexts, individual efforts and independent thinking are more effective than group dynamics.

### Conclusion
The metaphor of the tiger offers profound lessons for those navigating today's challenges. While courage and strength are essential, they must be paired with adaptability, stealth, and strategic thinking. Instead of trying to roar like lions in a forest, let us learn to prowl like tigers – silent, focused, and effective.
    `
  },
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
    degree: "PGD in Data Science & Business Analytics",
    year: "2025",
    description: "Focus on Data Analytics and Business Intelligence.",
    link: "https://abpbd.org/",
    logo: "https://www.google.com/s2/favicons?domain=abpbd.org&sz=128",
  },
  {
    institution: "North South University",
    degree: "BSc in Computer Science & Engineering",
    year: "2019",
    description: "Publication: 'Categorizing self-narrated stories into distinct themes' (ICT Analysis and Applications, 2020).",
    link: "https://www.northsouth.edu",
    logo: "https://www.google.com/s2/favicons?domain=northsouth.edu&sz=128",
  },
  {
    institution: "BAF Shaheen College Dhaka",
    degree: "Higher Secondary Certificate (HSC)",
    year: "2013",
    description: "Science Division.",
    link: "https://bafsd.edu.bd",
    logo: "https://www.google.com/s2/favicons?domain=bafsd.edu.bd&sz=128",
  },
  {
    institution: "University of Dhaka",
    degree: "Management Information System",
    description: "Reflects specialized study in MIS.",
    link: "https://www.du.ac.bd",
    logo: "https://www.google.com/s2/favicons?domain=du.ac.bd&sz=128",
  },
  {
    institution: "Uttara High School & College",
    degree: "Secondary School Certificate (SSC)",
    description: "Science Division.",
    link: "https://uhscdhaka.edu.bd",
    logo: "https://www.google.com/s2/favicons?domain=uhscdhaka.edu.bd&sz=128",
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
