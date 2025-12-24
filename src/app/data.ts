import { FaPython, FaDatabase, FaChartBar, FaTable, FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaLaptopCode, FaChartLine, FaBrain, FaHistory, FaGlobeAmericas, FaLightbulb, FaBookOpen } from "react-icons/fa";
import { SiTableau, SiPowerbi, SiPandas, SiNumpy, SiScikitlearn, SiPlotly, SiTensorflow, SiMicrosoftexcel, SiGoogleanalytics } from "react-icons/si";

export const personalInfo = {
    name: "Sajid Islam",
    title: "Business & Data Analyst",
    email: "sajid.islam.chowdhury@gmail.com",
    whatsapp: "https://wa.me/+8801824526054?text=",
    bio: "Business Analyst and Data Analyst with 2+ years of experience in marketplace analysis, business intelligence, and data-driven decision making. Specialized in Python, SQL, and Advanced Analytics with a proven track record of delivering actionable insights for e-commerce platforms like Daraz (Alibaba Group). Currently advancing expertise in machine learning and statistical modeling through postgraduate studies in Data Science & Business Analytics.",
};

export const experience = [
    {
        role: "Jr. Executive - Marketplace",
        company: "Daraz",
        group: "Alibaba Group",
        link: "https://www.daraz.com.bd",
        tasks: [
            "Business & Marketplace Analysis",
            "Brand & Partner Acquisition",
            "Partner Development Project",
        ],
    },
    {
        role: "Associate - Home Kitchen & Street Food",
        company: "HungryNaki",
        group: "Alibaba Group",
        link: "https://hungrynaki.com",
        tasks: [
            "Business & Marketplace Analysis",
            "Brand & Partner Acquisition",
            "Partner Development Project",
        ],
    },
    {
        role: "IT Executive - Quality Control",
        company: "NZ Fabrics",
        group: "NZ TEXTILE GROUP",
        link: "https://nztexgroup.com",
        tasks: [
            "Info & Tech Support to the Quality Control Team",
            "Associating with the Research & Development Team",
            "Presentation & Reporting to the Authorities & Buyers",
        ],
    },
    {
        role: "Associate - Online Sales & Customer Supports",
        company: "Thriving Skill",
        link: "https://thrivingskill.com",
        tasks: [
            "Business & Marketplace Analysis",
            "Sales Growth Strategies",
            "Customer Relationship Management",
        ],
    },
    {
        role: "Executive - Business",
        company: "DEEN Commerce",
        link: "https://saajiidi.github.io/",
        tasks: [
            "CRM & Sales Growth",
            "Business Analysis",
            "Strategy & Development",
        ],
    },
    {
        role: "Co-Founder",
        company: "Gear Master",
        link: "https://www.facebook.com/profile.php?id=61558077623189",
        tasks: ["Bike Accessories Retail Store"],
    },
];

export const education = [
    {
        institution: "Academy of Business Professionals",
        degree: "Data Science & Business Analytics",
        link: "https://abpbd.org/",
    },

    {
        institution: "University of Dhaka",
        degree: "Master of Business Administration - MBA",
        link: "https://www.du.ac.bd",
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

export const skills = {
    technical: [
        { name: "Python", icon: FaPython },
        { name: "SQL", icon: FaDatabase },
        { name: "Power BI", icon: SiPowerbi },
        { name: "Tableau", icon: SiTableau },
        { name: "Excel", icon: SiMicrosoftexcel },
        { name: "Google Analytics", icon: SiGoogleanalytics },
        { name: "Pandas", icon: SiPandas },
        { name: "NumPy", icon: SiNumpy },
        { name: "Scikit-learn", icon: SiScikitlearn },
    ],
    web: [
        { name: "React", icon: FaReact },
        { name: "Node.js", icon: FaNodeJs },
        { name: "HTML5", icon: FaHtml5 },
        { name: "CSS3", icon: FaCss3 },
        { name: "JavaScript", icon: FaJs },
    ],
    core: [
        "Business Intelligence",
        "Data Analysis",
        "Marketplace Analysis",
        "Strategic Planning",
        "Cross Functional Teams",
        "Agile Development & Scrum"
    ]
}

export const interests = [
    { name: "Data Science", icon: FaBrain, desc: "Exploring machine learning algorithms, statistical modeling, and emerging AI technologies." },
    { name: "Economics", icon: FaChartLine, desc: "Understanding market dynamics, economic indicators, and their impact on business strategies." },
    { name: "Business Strategy", icon: FaLightbulb, desc: "Analyzing successful business models, startup ecosystems, and innovative approaches." },
    { name: "History", icon: FaHistory, desc: "Learning from historical patterns and events to better understand current socio-economic developments." },
    { name: "Global Affairs", icon: FaGlobeAmericas, desc: "Keeping up with international relations and global trends." },
    { name: "Reading", icon: FaBookOpen, desc: "Politics, Psychology, Innovation." },
]

export const projects = [
    {
        title: "ECommerce Dashboard",
        desc: "A dashboard providing real-time data from 2021-2025, featuring analytics for total revenue, total orders, total customers, and average order value, along with revenue trends and customer segmentation.",
        link: "https://e-com-dashborad.vercel.app/",
        tags: ["Dashboard", "React", "Analytics", "E-commerce"]
    },
    {
        title: "Day Progress Plus",
        desc: "A productivity focused application featuring day progress tracking, focus task management, and customizable settings.",
        link: "https://saajiidi.github.io/TimeTracker/",
        tags: ["Productivity", "React", "Utility"]
    },
    {
        title: "ECommerce Analytics Dashboard",
        desc: "Comprehensive analytics platform tracking 12K+ orders and BDT 4.2M+ revenue. Features customer segmentation, sales forecasting.",
        link: "https://saajiidi.github.io/-ECommerce-Analytics-Dashboard/",
        tags: ["Data Analysis", "Dashboard", "Business Intelligence"]
    },
    {
        title: "Growth Analysis Dashboard",
        desc: "A comprehensive web development project showcasing modern web technologies and best practices.",
        link: "https://saajiidi.github.io/Growth-Analysis-Dashboard/",
        tags: ["Web Dev", "React", "Analytics"]
    },
    {
        title: "Border Security Analysis",
        desc: "Data visualization project analyzing border incident trends in Bangladesh using statistical methods.",
        link: "https://saajiidi.github.io/Border-Killing-Trend-in-Bangladesh/",
        tags: ["Data Viz", "Statistics", "Social Impact"]
    },
    {
        title: "Air Passenger Forecasting",
        desc: "Time series analysis comparing multiple forecasting models (ARIMA, Exponential Smoothing) for airline passenger prediction.",
        link: "https://saajiidi.github.io/Air_Passengers_Forecasting_Models/",
        tags: ["Machine Learning", "Time Series", "Python"]
    },
    {
        title: "E-Commerce Platform",
        desc: "Modern e-commerce interface built with React.js featuring responsive design, product catalog, shopping cart functionality.",
        link: "https://gear-master.vercel.app/",
        tags: ["React", "E-commerce", "Frontend"]
    },

    {
        title: "Pinterest Image Scraper",
        desc: "Versatile Python tool for downloading images from Pinterest with multiple interfaces including web UI and command line.",
        link: "https://saajiidi.github.io/Reusable-Pinterest-Image-Scraper/",
        tags: ["Python", "Scraping", "Automation"]
    },
    {
        title: "WAConnect Pro",
        desc: "Automates WhatsApp link generation from Excel/CSV files.",
        link: "https://github.com/saajiidi/WAConnect-Pro",
        tags: ["Flask", "Python", "Pandas", "Vercel"]
    },
    {
        title: "ML Portfolio Project",
        desc: "Showcasing ML projects including data analysis and deployment.",
        link: "https://github.com/saajiidi/ml-portfolio-project",
        tags: ["Machine Learning", "Python"]
    },
    {
        title: "B2B StockLot E-Commerce",
        desc: "Web development project for B2B e-commerce.",
        link: "https://github.com/saajiidi/B2B-StockLot-E-Commerce-BD",
        tags: ["HTML/CSS", "JavaScript", "Web Dev"]
    },
    {
        title: "Tableau Portfolio",
        desc: "Demographics, Economic Analysis, and Security Incident Maps.",
        link: "https://public.tableau.com/views/MuslimPopulationbyEthinicity/Sheet2",
        tags: ["Tableau", "Data Visualization"]
    }
];

export const awards = [
    {
        title: "Research Publication",
        name: "Data Mining Techniques to Categorize Single Paragraph-Formed Self-Narrated Stories",
        link: "https://ict4sd.org/link/proceedings/ICT4SD-2020-VOL2.pdf",
        details: "ICT Analysis and Applications Proceedings of ICT4SD 2020. Research on sentiment analysis."
    },
    {
        title: "Certification",
        name: "Professional Certification - Data Analytics",
        link: "https://drive.google.com/file/d/1cJxcJJur1n3MiXFETv5k30SDP0WP9wOm/view?usp=drive_link"
    },
    {
        title: "Certification",
        name: "Professional Certification - Business Intelligence",
        link: "https://drive.google.com/file/d/1O7O6jJRN58WGiyJu8hYrGhv-DtP89bEI/view?usp=drive_link"
    }
]

export const family = [
    {
        relation: "Wife",
        name: "Infida Yesmin",
        nameLink: "https://saajiidi.github.io/Infida-Yesmin-Meem/",
        occupation: "Bangla and Econmics Instructor of Protishruti Poribar",
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
