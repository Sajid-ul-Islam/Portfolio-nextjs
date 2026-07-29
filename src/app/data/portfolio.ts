export type FileTreeItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  extension: string;
  indent?: boolean;
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
  gitDiff?: {
    filename: string;
    oldCode: string;
    newCode: string;
  };
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

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const siteMeta = {
  name: "Sajid Islam",
  title: "Sajid Islam | Product-Minded Business & Data Analyst",
  description:
    "Product-minded Business & Data Analyst portfolio — showcasing end-to-end ownership of analytics products, operational dashboards, and data-driven decision tools.",
  url: "https://sajid-ul-islam.vercel.app",
  ogImage: "/img/profile.jpg",
};

export const testimonials: Testimonial[] = [
  {
    name: "Daraz BD Team Lead",
    role: "Marketplace Operations, Daraz Bangladesh",
    quote:
      "Sajid approached partner acquisition like a product problem — identifying user segments, designing outreach workflows, and iterating based on conversion data. The result was a 50% increase in our vendor network and a dashboard that became our team's single source of truth.",
  },
  {
    name: "NZ TEX R&D Manager",
    role: "Research & Development, NZ TEX GROUP",
    quote:
      "Sajid has a rare ability to bridge data and product decisions. He translated complex research data into clear narratives that directly informed our product innovation roadmap — not just reporting numbers, but driving what we built next.",
  },
];

export const projects: Project[] = [
  {
    id: "deakho-tv",
    title: "Deakho — Live TV & Movie Streaming Platform",
    description:
      "A modern TV channels & movie streaming web application and interactive Telegram Mini App (@deakhoBot) featuring live HLS streaming, Plex-style hero UI, and 1-click watch integration.",
    longDescription:
      "Deakho is a high-performance TV channel and movie streaming platform available as both a responsive web application (deakho.vercel.app) and an interactive Telegram Mini App (@deakhoBot). Built with React, Vite, Tailwind CSS, HLS.js, and a Node.js Telegram Bot server, Deakho delivers live streaming channels, movie streaming, deep linking support (?startapp=channel_id), direct 1-click watch buttons, and persistent chat menu integration.",
    image: "/img/projects/platform.png",
    liveUrl: "https://deakho.vercel.app/",
    githubUrl: "https://github.com/Sajid-ul-Islam/Deakho",
    gitDiff: {
      filename: "bot.js",
      oldCode: `// Basic bot listener
bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to Deakho');
});`,
      newCode: `// Async Telegram Mini App launcher & bot server (v3.0 Ultra)
async function registerBotCommandsAndMenu() {
    await apiRequest('setMyCommands', { commands: BOT_COMMANDS });
    await apiRequest('setChatMenuButton', {
        menu_button: { type: 'web_app', text: '📺 Open Deakho', web_app: { url: WEBAPP_URL } }
    });
}`,
    },
    featured: true,
    technologies: ["React", "Vite", "Tailwind CSS", "HLS.js", "Telegram API", "Node.js", "Vercel"],
    caseStudy: {
      role: "Lead Developer & Creator",
      timeline: "2026",
      problem:
        "Users needed a seamless, cross-platform media streaming experience that unifies live TV channels and movie playback with a mobile Telegram Mini App interface.",
      solution:
        "Engineered Deakho — a responsive web streaming application using React 19, Vite, and HLS.js paired with a Node.js Telegram Bot server supporting deep linking, persistent chat menus, and direct playback.",
      impact: [
        "Delivered zero-friction live TV & movie streaming via web and Telegram Mini App (@deakhoBot).",
        "Integrated high-performance HLS video playback with custom controls and Plex-style hero banner showcase.",
        "Implemented Telegram deep-linking support for 1-click channel and movie streaming.",
      ],
      metrics: [
        { label: "Web App", value: "deakho.vercel.app" },
        { label: "Telegram Bot", value: "t.me/deakhoBot" },
        { label: "Streaming Engine", value: "HLS.js + Live Video" },
      ],
    },
    missionLogs: [
      ">> Initializing DeakhoTV streaming service node...",
      ">> Registering Telegram Mini App webhooks & persistent chat menu...",
      ">> Mounting HLS video player engine & Plex-style UI components...",
      ">> Deakho system operational at deakho.vercel.app & t.me/deakhoBot.",
    ],
  },
  {
    id: "desco-telegram-bot",
    title: "DESCO Electricity Usage Assistant",
    description:
      "An automated Telegram chatbot acting as a DESCO electricity usage assistant — providing instant bill queries, consumption tracking, and customer utility assistance.",
    longDescription:
      "DESCO Electricity Usage Assistant is an automated Telegram chatbot designed to help electricity consumers easily check their usage statistics, bill details, prepaid/postpaid balance, and account information directly through Telegram (@descoTGbot). Built with Python and Telegram Bot API, it bridges utility data services with a seamless mobile chat interface.",
    image: "/img/projects/automation.png",
    liveUrl: "https://t.me/descoTGbot",
    githubUrl: "https://github.com/Sajid-ul-Islam/descoiunfobot",
    gitDiff: {
      filename: "desco_bot.py",
      oldCode: `# Manual web lookup
def check_balance(account_no):
    response = requests.get(DESCO_WEB_URL + account_no)
    return parse_html(response.text)`,
      newCode: `# Async Telegram handler with real-time DESCO API integration
@bot.message_handler(commands=['balance', 'usage'])
async def handle_desco_query(message):
    account_id = extract_account(message.text)
    usage_data = await desco_client.get_realtime_metrics(account_id)
    await bot.reply_to(message, format_usage_report(usage_data))`,
    },
    featured: true,
    technologies: ["Python", "Telegram API", "DESCO API", "Webhooks", "Chatbot", "Automation"],
    caseStudy: {
      role: "Lead Developer & Creator",
      timeline: "2026",
      problem:
        "DESCO electricity consumers in Bangladesh lacked a quick, real-time mobile interface to monitor power usage, check bill balances, and get automated utility assistance without dealing with complex websites.",
      solution:
        "Developed @descoTGbot on Telegram — a high-performance Python chatbot connecting directly to utility data services to deliver instant consumption stats, balance updates, and automated alerts.",
      impact: [
        "Automated electricity usage and bill queries for DESCO consumers directly within Telegram.",
        "Reduced friction by replacing cumbersome web portal login workflows with interactive chat.",
        "Delivered real-time automated usage breakdowns and bill alerts.",
      ],
      metrics: [
        { label: "Platform", value: "Telegram (@descoTGbot)" },
        { label: "Response Time", value: "<500ms" },
        { label: "Utility Service", value: "DESCO Electricity" },
      ],
    },
    missionLogs: [
      ">> Initializing @descoTGbot service node...",
      ">> Connecting DESCO utility data API integration...",
      ">> Registering stateful Telegram webhook handlers...",
      ">> Active balance & consumption analysis engine operational.",
      ">> Deployment complete. Telegram Bot live at t.me/descoTGbot.",
    ],
  },
  {
    id: "woocom-telegram-bot",
    title: "WooCommerce Telegram E-Commerce Bot",
    description:
      "An automated Telegram chatbot integrated with WooCommerce REST API — providing real-time product searches, catalog browsing, order placement, and live order status tracking via Telegram (@DEEN_Commerce_bot).",
    longDescription:
      "WooCommerce Telegram E-Commerce Bot (@DEEN_Commerce_bot) bridges WordPress/WooCommerce storefronts with a seamless Telegram conversational interface. Customers can browse products by category, check real-time stock levels, place instant orders, and receive automated fulfillment notifications directly inside Telegram.",
    image: "/img/projects/automation.png",
    liveUrl: "https://t.me/DEEN_Commerce_bot",
    githubUrl: "https://github.com/Sajid-ul-Islam/woocom_telegram_bot",
    gitDiff: {
      filename: "woocom_bot.py",
      oldCode: `# Manual web store lookup
def search_products(query):
    return requests.get("https://mystore.com/wp-json/wc/v3/products?search=" + query)`,
      newCode: `# Async Telegram Commerce handler with WooCommerce REST API
@bot.message_handler(commands=['shop', 'orders', 'catalog'])
async def handle_woocom_shop(message):
    products = await woocom_client.get_active_products()
    await bot.send_media_group(message.chat.id, format_catalog_cards(products))`,
    },
    featured: true,
    technologies: ["Python", "Telegram API", "WooCommerce API", "REST API", "Chatbot", "E-commerce"],
    caseStudy: {
      role: "Lead Developer & Architect",
      timeline: "2026",
      problem:
        "E-commerce customers on mobile often experience friction using web browsers to browse inventory, track order updates, or check stock availability.",
      solution:
        "Built @DEEN_Commerce_bot — an automated Telegram shopping bot connected directly to WooCommerce REST APIs for instant catalog lookups, cart checkout, and automated order tracking.",
      impact: [
        "Enabled seamless e-commerce ordering directly inside Telegram chat.",
        "Automated real-time WooCommerce order status lookups and stock availability alerts.",
        "Reduced web store drop-off rates with rapid conversational checkout.",
      ],
      metrics: [
        { label: "Platform", value: "Telegram (@DEEN_Commerce_bot)" },
        { label: "Integration", value: "WooCommerce REST API v3" },
        { label: "Response Latency", value: "<400ms" },
      ],
    },
    missionLogs: [
      ">> Initializing @DEEN_Commerce_bot node...",
      ">> Authenticating WooCommerce REST API OAuth keys...",
      ">> Registering webhooks for product sync & order status triggers...",
      ">> Telegram Commerce engine ONLINE at t.me/DEEN_Commerce_bot.",
    ],
  },
  {
    id: "woocom-whatsapp-bot",
    title: "WooCommerce WhatsApp Business Assistant",
    description:
      "An automated WhatsApp Business assistant integrated with WooCommerce REST API — delivering real-time order notifications, automated customer support, and instant product availability queries.",
    longDescription:
      "WooCommerce WhatsApp Business Assistant is a Python & Flask webhook application that connects WooCommerce e-commerce stores with Twilio WhatsApp API. It provides automated customer service, instant order status alerts, stock level queries, and customer re-engagement.",
    image: "/img/projects/whatsapp.png",
    githubUrl: "https://github.com/Sajid-ul-Islam/WooCom_WhatsApp_Bot",
    gitDiff: {
      filename: "woocom_whatsapp.py",
      oldCode: `# Manual customer messaging
def send_update(phone, order_id):
    sms.send(phone, "Order " + order_id + " shipped")`,
      newCode: `# Async WhatsApp webhook with WooCommerce order event listener
@app.route('/whatsapp/webhook', methods=['POST'])
def handle_whatsapp_webhook():
    incoming = request.values.get('Body', '')
    response_msg = woocom_bot.process_inquiry(incoming)
    return twilio_client.send_whatsapp(response_msg)`,
    },
    featured: true,
    technologies: ["Python", "Twilio API", "WhatsApp API", "WooCommerce API", "Flask", "Automation"],
    caseStudy: {
      role: "Lead Developer & Automation Specialist",
      timeline: "2026",
      problem:
        "WooCommerce store owners needed an automated WhatsApp messaging channel to handle customer support inquiries, send order dispatch receipts, and respond to availability queries 24/7.",
      solution:
        "Engineered a Python Flask service linking WooCommerce webhooks to Twilio WhatsApp API, automatically resolving order queries and sending interactive product links via WhatsApp.",
      impact: [
        "Automated WhatsApp customer support for WooCommerce stores.",
        "Delivered instant WhatsApp order status & tracking alerts.",
        "Increased customer engagement and reduced support ticket turnaround times.",
      ],
      metrics: [
        { label: "Channel", value: "WhatsApp Business API" },
        { label: "Backend Framework", value: "Python / Flask" },
        { label: "Integration", value: "WooCommerce Webhooks" },
      ],
    },
    missionLogs: [
      ">> Initializing WooCommerce WhatsApp Service Node...",
      ">> Linking Twilio WhatsApp Messaging Gateway...",
      ">> Active WooCommerce Webhook Handlers Operational.",
    ],
  },
  {
    id: "agentic-rag",
    title: "Agentic RAG Pipeline",
    description:
      "An intelligent search and retrieval-augmented generation agent utilizing semantic search, hierarchical chunking, and multi-step reasoning models.",
    image: "/img/projects/ai_assistant.png",
    gitDiff: {
      filename: "agent.py",
      oldCode: `# Basic text completion
response = model.generate(prompt)`,
      newCode: `# Agentic multi-step reasoning
context = vector_db.semantic_search(query)
reasoning_path = agent.reason(query, context)
response = model.generate(reasoning_path)`,
    },
    featured: true,
    technologies: ["Python", "RAG", "LLM", "Vector DB", "Agentic AI"],
    caseStudy: {
      role: "Lead AI Engineer",
      timeline: "2026",
      problem:
        "Traditional search engines and basic RAG architectures suffer from context fragmentation and hallucination when dealing with complex queries.",
      solution:
        "Implemented an agentic workflow that plans searches, executes semantic lookups using hierarchical chunking, and reviews output relevance before generation.",
      impact: [
        "Reduced hallucination rates in system validation testing.",
        "Improved search precision for deep multi-step queries.",
      ],
    },
  },
  {
    id: "rag-system",
    title: "Enterprise RAG Platform",
    description:
      "A production-ready Retrieval-Augmented Generation pipeline integrated with custom data ingestion and embedding models.",
    image: "/img/projects/automation.png",
    gitDiff: {
      filename: "rag_pipeline.py",
      oldCode: `# Static query retrieval
chunks = db.query(raw_text)`,
      newCode: `# Hybrid keyword + semantic retrieval
chunks = hybrid_retriever.retrieve(query)
context = reranker.rank(chunks)`,
    },
    featured: true,
    technologies: ["Python", "RAG", "Embeddings", "FastAPI"],
    caseStudy: {
      role: "Backend & AI Developer",
      timeline: "2025",
      problem:
        "Need a reliable way to query massive internal document databases with low latency and highly relevant context retrieval.",
      solution:
        "Designed a FastAPI microservice combining dense semantic retrieval with sparse keyword queries and a cross-encoder reranker.",
      impact: [
        "Optimized retrieval context relevance scores.",
        "Fast response retrieval times under high loads.",
      ],
    },
  },
  {
    id: "telegram-chatbot",
    title: "Automated Telegram Bot",
    description:
      "An interactive assistant bot hosted on Telegram providing server health statistics, remote command executions, and notification integrations.",
    image: "/img/projects/scraping.png",
    gitDiff: {
      filename: "bot.py",
      oldCode: `# Simple command receiver
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, 'Hello')`,
      newCode: `# Async stateful dialog handler
@bot.message_handler(func=lambda m: True)
async def chat_handler(message):
    state = await state_manager.get(message.chat.id)
    response = await assistant.process(message.text, state)
    await bot.reply(message.chat.id, response)`,
    },
    featured: true,
    technologies: ["Python", "Telegram API", "Webhooks", "Asynchronous"],
    caseStudy: {
      role: "Software Developer",
      timeline: "2025",
      problem:
        "Lack of a fast, mobile-friendly interface for querying database stats, system health, and getting real-time business alerts.",
      solution:
        "Built an asynchronous python chatbot integrated with system APIs and stateful conversation flows via Telegram webhook handlers.",
      impact: [
        "Enabled on-the-go workspace administration and analytics monitoring.",
        "Consolidated notification alert system into a single stream.",
      ],
    },
  },
  {
    id: "whatsapp-chatbot",
    title: "WhatsApp Support Bot",
    description:
      "An automated WhatsApp Business assistant integrated with natural language processing models to resolve customer service queries.",
    image: "/img/projects/scraping.png",
    gitDiff: {
      filename: "app.py",
      oldCode: `# Simple auto-responder
def respond(message):
    return 'We will get back to you.'`,
      newCode: `# NLP message processing & webhook integration
def webhook_listener(request):
    incoming_msg = request.values.get('Body', '')
    intent = nlp_model.predict_intent(incoming_msg)
    reply = dialog_flow.get_response(intent)
    whatsapp_client.send_message(to=request.values.get('From'), body=reply)`,
    },
    featured: true,
    technologies: ["Python", "Twilio API", "NLP", "Flask"],
    caseStudy: {
      role: "AI Product Developer",
      timeline: "2025",
      problem:
        "Support teams overwhelmed with repetitive inquiries regarding business services, timings, and custom status updates.",
      solution:
        "Shipped a Flask webhook system integrated with Twilio WhatsApp API and an intent classification model to handle queries automatically.",
      impact: [
        "Automated standard customer support queries.",
        "Reduced average user wait times from hours to milliseconds.",
      ],
    },
  },
  // ────────────────────────────────────────────────────────────
  // TIER 1 — Active Business & Current Role
  // ────────────────────────────────────────────────────────────
  {
    id: "deen-ops",
    title: "Deen Ops Dashboard",
    description:
      "Designed and built an operational command center that unified daily business metrics and CRM workflows — replacing fragmented spreadsheets with a single source of truth for the team.",
    image: "/img/projects/automation.png",
    githubUrl: "https://github.com/Sajid-ul-Islam/Deen-Ops",
    gitDiff: {
      filename: "data_pipeline.py",
      oldCode: `# Old manual pipeline
def process_data(file_path):
    data = pd.read_csv(file_path)
    # Manual cleaning steps repeated daily
    data.dropna(inplace=True)
    return data`,
      newCode: `# New automated Streamlit pipeline
@st.cache_data
def process_data(file_path):
    # Automated ingestion & validation
    data = pd.read_csv(file_path)
    cleaned_data = DataValidator.clean(data)
    DashboardState.update_metrics(cleaned_data)
    return cleaned_data`,
    },
    featured: true,
    technologies: ["Streamlit", "Python", "Operations", "Data Analysis"],
    caseStudy: {
      role: "Product Owner & Business Analyst",
      timeline: "2025",
      problem:
        "The team relied on scattered spreadsheets to track daily operations, CRM growth, and business strategy — leading to data silos and slow decision-making.",
      solution:
        "Defined product requirements end-to-end: identified core user workflows, prioritized metrics that matter (CRM pipeline health, daily KPIs), and shipped a Streamlit app that gives the team real-time visibility into operations.",
      impact: [
        "Eliminated manual spreadsheet consolidation, saving ~5 hours/week of team time.",
        "Improved CRM tracking visibility — pipeline bottlenecks now surface in real time.",
        "Became the team's single source of truth for daily performance reviews.",
      ],
      metrics: [
        { label: "Time Saved", value: "~5 hrs/week" },
        { label: "Adoption", value: "Team-wide" },
      ],
    },
  },
  {
    id: "deen-business-intel",
    title: "Deen Business Intel",
    description:
      "Created a product analytics dashboard supporting churn, engagement, and revenue analysis — enabling stakeholders to make data-driven strategic decisions without waiting on ad-hoc reports.",
    image: "/img/projects/ecommerce.png",
    featured: true,
    technologies: ["Streamlit", "Python", "Business Intelligence", "Analytics"],
    caseStudy: {
      role: "Product Owner & BI Lead",
      timeline: "2025",
      problem:
        "Stakeholders depended on manual weekly reports that were slow to produce, inconsistent in format, and lacked the depth needed to identify churn patterns and revenue trends.",
      solution:
        "Led end-to-end product design — conducted stakeholder interviews to define KPIs, designed the information architecture, and built a BI dashboard that automates weekly reporting and surfaces actionable insights on engagement, churn, and revenue.",
      impact: [
        "Automated weekly reporting, reducing report preparation time from hours to minutes.",
        "Stakeholders now self-serve insights instead of requesting ad-hoc analyses.",
        "Enabled early identification of churn signals, improving retention strategy.",
      ],
      metrics: [
        { label: "Report Time", value: "Minutes vs Hours" },
        { label: "Self-serve Rate", value: "High" },
      ],
    },
  },
  {
    id: "global-economics",
    title: "Global Economics Dashboard",
    description:
      "Designed an interactive product for exploring global economic indicators — enabling researchers and analysts to compare country-level trends in one unified experience instead of juggling scattered data sources.",
    image: "/img/projects/economic.png",
    featured: true,
    technologies: ["Streamlit", "Python", "Economics", "Data Visualization"],
    caseStudy: {
      role: "Product Designer & Data Analyst",
      timeline: "2025",
      problem:
        "Economic data across countries is scattered across disparate sources, making it difficult for analysts and researchers to compare trends or identify macro patterns at a glance.",
      solution:
        "Rapidly prototyped an interactive dashboard that aggregates global economic indicators into a unified, filterable experience — designing the UX around country comparisons and trend exploration workflows.",
      impact: [
        "Reduced time-to-insight for economic comparisons from hours of manual research to seconds of interactive exploration.",
        "Enabled quick country-level comparisons and trend identification in one place.",
        "Serves as a reusable template for similar multi-source data aggregation products.",
      ],
      metrics: [
        { label: "Data Sources", value: "Multi-country" },
        { label: "Scope", value: "Global" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // TIER 2 — Flagship Analytics & ML
  // ────────────────────────────────────────────────────────────
  {
    id: "1",
    title: "ECommerce Dashboard",
    description:
      "Led end-to-end product design from problem definition to implementation — built a KPI dashboard that gives marketplace stakeholders a single view of revenue, orders, customers, and AOV trends across 2021–2025.",
    image: "/img/projects/ecommerce.png",
    liveUrl: "https://e-com-dashborad.vercel.app/",
    featured: true,
    technologies: ["Dashboard", "React", "Analytics", "E-commerce"],
    caseStudy: {
      role: "Product Owner & Data Analyst",
      timeline: "2021–2025 dataset",
      problem:
        "Marketplace stakeholders had no consolidated view of business performance — revenue trends, order volumes, customer acquisition, and AOV were scattered across different reports and spreadsheets.",
      solution:
        "Defined the product vision: a unified KPI dashboard that standardizes metrics and makes performance reviews faster. Designed the information architecture around the 4 core KPIs stakeholders actually need, then built and shipped the product end-to-end.",
      impact: [
        "Standardized KPI definitions across the team — everyone now works from the same numbers.",
        "Reduced weekly performance review prep time by consolidating scattered data sources.",
        "Improved visibility into marketplace performance trends over a 4-year window.",
      ],
      metrics: [
        { label: "Time Range", value: "2021–2025" },
        { label: "Core KPIs", value: "4 unified metrics" },
      ],
    },
  },
  {
    id: "churn-analysis",
    title: "Customer Churn Analysis",
    description:
      "Built a predictive analytics product that identifies at-risk customers before they churn — using Random Forest and XGBoost models with 85%+ accuracy to drive retention strategy.",
    image: "/img/projects/churn.png",
    githubUrl: "https://github.com/sajid-ul-islam/Customer-Churn-Prediction/",
    featured: true,
    technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest"],
    caseStudy: {
      role: "Product Analyst & ML Engineer",
      timeline: "2023",
      problem:
        "The business had no systematic way to identify which customers were at risk of churning — retention efforts were reactive rather than proactive, leading to preventable revenue loss.",
      solution:
        "Framed churn as a product problem: defined the target user (at-risk customer), identified the signal features that predict churn, and iterated through multiple model architectures (Random Forest, XGBoost) to reach 85%+ accuracy — then translated model outputs into actionable retention insights.",
      impact: [
        "Enabled proactive retention outreach — identify at-risk customers before they leave.",
        "Improved visibility into the key drivers of churn, informing product and marketing decisions.",
        "Provided a reusable ML pipeline that can be extended to other predictive use cases.",
      ],
      metrics: [
        { label: "Accuracy", value: "85%+" },
        { label: "Models", value: "RF + XGBoost ensemble" },
      ],
    },
  },
  {
    id: "3",
    title: "Sentinel Bangladesh",
    description:
      "Designed a security intelligence product that transforms raw incident data into spatial insights — enabling faster pattern discovery and clearer communication of threat density across regions.",
    image: "/img/projects/sentinel.png",
    featured: true,
    technologies: ["Streamlit", "Python", "Data Visualization", "Security Analysis"],
    caseStudy: {
      role: "Product Designer & Data Analyst",
      timeline: "2024",
      problem:
        "Security incidents in Bangladesh lacked spatial context — raw data didn't reveal geographic patterns, making it hard for analysts and policymakers to understand regional threat density or identify emerging hotspots.",
      solution:
        "Designed an interactive map product with three complementary visualization layers (clusters, heatmaps, drill-down points) — each serving a distinct user need from high-level pattern recognition to granular incident investigation.",
      impact: [
        "Faster pattern discovery across regions — analysts can now spot hotspots in seconds.",
        "Clearer communication of incident density to non-technical stakeholders.",
        "Enabled data-driven security resource allocation decisions.",
      ],
      metrics: [
        { label: "Visualization Layers", value: "3 (Clusters + Heatmap + Points)" },
        { label: "Interaction", value: "Drill-down capable" },
      ],
    },
  },
  {
    id: "security-map",
    title: "Security Map Visualization",
    description:
      "Created a spatial-temporal analysis product for security events — combining interactive maps with temporal sliders to reveal how incidents evolve over time and space.",
    image: "/img/projects/security_map.png",
    featured: true,
    technologies: ["R", "Folium", "Leaflet", "Data Viz"],
    caseStudy: {
      role: "Product Analyst & Data Visualization Lead",
      timeline: "2023",
      problem:
        "Stakeholders needed to understand not just where security events happened, but how they changed over time — static maps couldn't convey temporal patterns or seasonal trends.",
      solution:
        "Designed and built an interactive map with temporal sliders, enabling users to scrub through time and observe how security event patterns shift — turning static data into a narrative about evolving risk landscapes.",
      impact: [
        "Improved spatial + temporal analysis — stakeholders can now see both where and when patterns emerge.",
        "Enabled identification of seasonal and time-based trends invisible in static reports.",
      ],
      metrics: [
        { label: "Analysis Type", value: "Spatial + Temporal" },
        { label: "Interaction", value: "Time-slider control" },
      ],
    },
  },
  {
    id: "5",
    title: "Air Passenger Forecasting",
    description:
      "Rapidly prototyped an analytics product comparing multiple forecasting models (ARIMA, Exponential Smoothing) to help stakeholders evaluate demand prediction approaches for planning scenarios.",
    image: "/img/projects/air_passengers.png",
    liveUrl: "https://sajid-ul-islam.github.io/Air_Passengers_Forecasting_Models/",
    featured: true,
    technologies: ["Machine Learning", "Time Series", "Python"],
    caseStudy: {
      role: "Product Analyst & Data Scientist",
      timeline: "2023",
      problem:
        "Planners needed to forecast air passenger demand but had no way to quickly compare different forecasting approaches — each model's assumptions and accuracy characteristics were opaque.",
      solution:
        "Built a comparison product that runs multiple time-series models side-by-side, presenting accuracy metrics and forecast visualizations in a unified interface — making it easy for stakeholders to evaluate which approach best fits their planning needs.",
      impact: [
        "Enabled model comparison for planning scenarios — stakeholders can evaluate trade-offs at a glance.",
        "Provided a reusable forecasting evaluation framework for future demand prediction use cases.",
      ],
      metrics: [
        { label: "Models Compared", value: "ARIMA + Exp. Smoothing" },
        { label: "Output", value: "Side-by-side forecasts" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // TIER 3 — Utilities & Automation
  // ────────────────────────────────────────────────────────────
  {
    id: "2",
    title: "Sheet2WhatsApp",
    description:
      "Identified a pain point in outreach workflows and built an internal tool that automates WhatsApp link generation from spreadsheets — eliminating manual copy/paste for the team.",
    image: "/img/projects/whatsapp.png",
    featured: false,
    technologies: ["Streamlit", "Python", "Pandas", "Vercel"],
    caseStudy: {
      role: "Product Owner & Builder",
      timeline: "2024",
      problem:
        "Creating WhatsApp links from contact spreadsheets was a tedious, error-prone manual process that slowed down outreach campaigns and introduced data quality issues.",
      solution:
        "Rapidly prototyped an internal tool that converts CSV/Excel rows into share-ready WhatsApp links — designed around the user's existing spreadsheet workflow to minimize adoption friction.",
      impact: [
        "Eliminated manual copy/paste effort for outreach campaigns.",
        "Improved accuracy of contact links — reduced human error to near zero.",
      ],
      metrics: [
        { label: "Input", value: "CSV/Excel" },
        { label: "Output", value: "Ready-to-share links" },
      ],
    },
  },
  {
    id: "4",
    title: "Order Process Automation",
    description:
      "Built an automation product that transformed the order processing workflow — consolidating, cleaning, and categorizing Excel-based orders into consistent, ready-to-ship formats.",
    image: "/img/projects/automation.png",
    featured: false,
    technologies: ["Streamlit", "Python", "Automation", "Data Processing"],
    caseStudy: {
      role: "Product Owner & Automation Lead",
      timeline: "2024",
      problem:
        "Order sheets required manual consolidation and formatting each time — the team spent hours on repetitive data cleaning instead of focusing on fulfillment and customer experience.",
      solution:
        "Designed an automation product that ingests raw Excel orders, applies cleaning and categorization rules, and outputs consistently formatted sheets — turning a multi-hour manual task into a one-click operation.",
      impact: [
        "Faster order preparation — reduced processing time significantly.",
        "Consistent output formatting eliminated downstream errors in fulfillment.",
      ],
      metrics: [
        { label: "Input", value: "Raw Excel orders" },
        { label: "Output", value: "Formatted + categorized" },
      ],
    },
  },
  {
    id: "6",
    title: "Ramadan Compass",
    description:
      "Designed and shipped a Ramadan companion product (PWA) that consolidates prayer times, Qibla direction, and daily goal tracking into a single mobile-first experience.",
    image: "/img/projects/ramadan.png",
    liveUrl: "https://ramadancompass.vercel.app/",
    featured: false,
    technologies: ["Next.js", "Ramadan", "Prayer Times", "React", "PWA"],
    caseStudy: {
      role: "Product Designer & Frontend Engineer",
      timeline: "2024",
      problem:
        "Muslims observing Ramadan had to juggle multiple apps for prayer times, Qibla direction, and daily spiritual goals — there was no single, well-designed product that combined these core daily utilities.",
      solution:
        "Identified the core user needs through personal experience, designed a mobile-first PWA that consolidates all three utilities into one seamless experience, and shipped it as a progressive web app for instant access without app store friction.",
      impact: [
        "Simplified daily Ramadan routines in a single, installable app.",
        "PWA architecture means instant access — no app store download required.",
      ],
      metrics: [
        { label: "Platform", value: "PWA (installable)" },
        { label: "Core Features", value: "Prayer + Qibla + Goals" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────
  // TIER 4 — Archive / Older Work
  // ────────────────────────────────────────────────────────────
  {
    id: "gdp-debt",
    title: "Economic Analysis",
    description:
      "Designed an analysis product exploring GDP vs debt correlation across global economies — translating complex macroeconomic data into clear, interpretable visual narratives.",
    image: "/img/projects/economic.png",
    liveUrl: "https://sajid-ul-islam.github.io/Economic-Analysis-GDP-vs-Debt-Correlation/",
    featured: false,
    technologies: ["Data Analysis", "Economics", "Python"],
    caseStudy: {
      role: "Product Analyst",
      timeline: "2022",
      problem:
        "Understanding the relationship between GDP and national debt across countries requires synthesizing data from multiple sources — the insights were buried in raw datasets.",
      solution:
        "Designed a cross-country analysis product with comparative visualizations that surface macroeconomic patterns and outliers, making the GDP-debt relationship accessible to non-economist stakeholders.",
      impact: [
        "Highlighted macroeconomic patterns and outliers that informed strategic discussions.",
      ],
      metrics: [{ label: "Scope", value: "Global economies" }],
    },
  },
  {
    id: "7",
    title: "E-Commerce Platform",
    description:
      "Led product design and implementation for a modern e-commerce interface — shipping a responsive, mobile-first shopping experience from concept to deployment.",
    image: "/img/projects/platform.png",
    liveUrl: "https://gear-master.vercel.app/",
    featured: false,
    technologies: ["React", "E-commerce", "Frontend"],
    caseStudy: {
      role: "Product Owner & Frontend Engineer",
      timeline: "2022",
      problem:
        "Needed a modern, responsive e-commerce interface for a bike accessories retail business — existing options were either too generic or too expensive for a startup.",
      solution:
        "Designed and built the product end-to-end: defined the shopping workflows (catalog browsing, product detail, cart), designed the mobile-first UI, and shipped a clean, fast React-based storefront.",
      impact: [
        "Delivered a clean, mobile-ready shopping experience that supports the retail business.",
      ],
      metrics: [{ label: "Workflows", value: "Catalog + Cart + Checkout" }],
    },
  },
  {
    id: "8",
    title: "Day Progress Plus",
    description:
      "Built a productivity product focused on daily progress tracking and focus task management — designed around the insight that visual progress feedback improves daily planning.",
    image: "/img/projects/productivity.png",
    liveUrl: "https://sajid-ul-islam.github.io/TimeTracker/",
    featured: false,
    technologies: ["Productivity", "React", "Utility"],
    caseStudy: {
      role: "Product Designer & Builder",
      timeline: "2022",
      problem:
        "Existing productivity apps were either too complex or too simple — users needed a lightweight tool that shows daily progress at a glance while supporting focused task management.",
      solution:
        "Designed a minimalist productivity product around the core insight that visual progress feedback motivates action — combining day progress tracking with focus task management in a clean interface.",
      impact: [
        "Improved daily planning and focus through visual progress feedback.",
      ],
      metrics: [
        { label: "Core Features", value: "Progress + Focus tasks" },
      ],
    },
  },
  {
    id: "9",
    title: "Growth Analysis Dashboard",
    description:
      "Created a growth analytics product that consolidates key business metrics into a single dashboard — enabling quick reviews of growth KPIs without digging through raw data.",
    image: "/img/projects/ecommerce.png",
    liveUrl: "https://sajid-ul-islam.github.io/Growth-Analysis-Dashboard/",
    featured: false,
    technologies: ["Web Dev", "React", "Analytics"],
    caseStudy: {
      role: "Product Owner & Analytics Lead",
      timeline: "2022",
      problem:
        "Growth metrics were scattered across different tools and reports — making it hard to get a quick read on business health or identify trends that needed attention.",
      solution:
        "Designed and built a growth analytics dashboard that consolidates key KPIs into a single, scannable interface — prioritizing the metrics that actually drive growth decisions.",
      impact: [
        "Simplified growth reporting for quick reviews — stakeholders can assess business health in seconds.",
      ],
      metrics: [{ label: "Focus", value: "Growth KPIs" }],
    },
  },
  {
    id: "10",
    title: "Border Security Analysis",
    description:
      "Designed a data analysis product that makes border incident trends in Bangladesh accessible and interpretable — turning raw statistical data into clear visual narratives for policymakers.",
    image: "/img/projects/sentinel.png",
    liveUrl: "https://sajid-ul-islam.github.io/Border-Killing-Trend-in-Bangladesh/",
    featured: false,
    technologies: ["Data Viz", "Statistics", "Social Impact"],
    caseStudy: {
      role: "Product Analyst & Data Visualization Lead",
      timeline: "2021",
      problem:
        "Border incident data in Bangladesh was difficult to interpret without statistical expertise — trends, patterns, and outliers were invisible in raw tabular data.",
      solution:
        "Designed an analysis product that applies statistical methods and presents results through clear visual narratives — making complex incident data accessible to a broader audience of policymakers and researchers.",
      impact: [
        "Made incident trends easier to interpret for non-technical stakeholders.",
      ],
      metrics: [{ label: "Methods", value: "Stats + Data Viz" }],
    },
  },
  {
    id: "11",
    title: "Image Scraper",
    description:
      "Built an internal tool for efficient image collection from Pinterest — designed with multiple interfaces (web UI + CLI) to fit different user workflows.",
    image: "/img/projects/scraper.png",
    featured: false,
    technologies: ["Python", "Scraping", "Automation"],
    caseStudy: {
      role: "Product Owner & Python Developer",
      timeline: "2021",
      problem:
        "Collecting images from Pinterest for research and projects required manual downloading — a time-consuming process that didn't scale to the volumes needed for dataset creation.",
      solution:
        "Built a tool with two interfaces (web UI for casual users, CLI for power users) — designed around different user personas and their preferred workflows to maximize adoption.",
      impact: [
        "Faster dataset creation for research and projects.",
      ],
      metrics: [{ label: "Interfaces", value: "Web UI + CLI" }],
    },
  },
  {
    id: "12",
    title: "Tableau Portfolio",
    description:
      "Created a BI portfolio product showcasing interactive dashboards across demographics, economics, and security — demonstrating end-to-end analytics product thinking.",
    image: "/img/projects/tableau.png",
    liveUrl: "https://public.tableau.com/app/profile/sajid.islam4721/viz/MuslimPopulationbyEthinicity/Dashboard1",
    featured: false,
    technologies: ["Tableau", "Data Visualization"],
    caseStudy: {
      role: "BI Analyst & Product Owner",
      timeline: "2021",
      problem:
        "Tableau work was scattered across individual dashboards — there was no centralized portfolio to showcase the full scope of BI work or make it easy to share with stakeholders.",
      solution:
        "Designed a portfolio product that organizes and presents Tableau dashboards in a unified, shareable format — each dashboard designed around specific user needs (demographics, economics, security).",
      impact: [
        "Centralized BI work for easy sharing with stakeholders and recruiters.",
      ],
      metrics: [{ label: "Platform", value: "Tableau Public" }],
    },
  },
  {
    id: "13",
    title: "B2B StockLot E-Commerce",
    description:
      "Designed and shipped an online storefront for B2B stock lot sales — defining the product from problem identification through implementation.",
    image: "/img/projects/platform.png",
    liveUrl: "https://github.com/saajiidi/B2B-StockLot-E-Commerce-BD",
    featured: false,
    technologies: ["HTML/CSS", "JavaScript", "Web Dev"],
    caseStudy: {
      role: "Product Owner & Web Developer",
      timeline: "2020",
      problem:
        "B2B stock lot sales had no online presence — buyers had to rely on word-of-mouth or in-person visits to browse available inventory.",
      solution:
        "Defined the product vision for a basic online storefront, designed the browsing and inquiry workflows, and shipped a static site that gives buyers an online entry point to the business.",
      impact: [
        "Provided a basic online storefront for B2B buyers to discover inventory.",
      ],
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
        href: "/experience",
        icon: "briefcase",
        extension: "go",
      },
      {
        id: "skills",
        label: "Skills",
        href: "/skills",
        icon: "code",
        extension: "json",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: "folder",
        extension: "py",
      },
      {
        id: "desco-bot",
        label: "desco_bot",
        href: "/projects/desco-telegram-bot",
        icon: "bot",
        extension: "py",
        indent: true,
      },
      {
        id: "woocom-bot",
        label: "woocom_bot",
        href: "/projects/woocom-telegram-bot",
        icon: "bot",
        extension: "py",
        indent: true,
      },
      {
        id: "woocom-whatsapp",
        label: "woocom_whatsapp",
        href: "/projects/woocom-whatsapp-bot",
        icon: "bot",
        extension: "py",
        indent: true,
      },
      {
        id: "deakho-tv",
        label: "deakho_tv",
        href: "/projects/deakho-tv",
        icon: "bot",
        extension: "js",
        indent: true,
      },
      {
        id: "education",
        label: "Education",
        href: "/education",
        icon: "graduation-cap",
        extension: "sql",
      },
      {
        id: "contact",
        label: "Contact",
        href: "/contact",
        icon: "mail",
        extension: "jsx",
      },
      {
        id: "settings",
        label: "settings",
        href: "/settings.json",
        icon: "settings",
        extension: "mjs",
      },
      {
        id: "github-pages",
        label: "GitHub Pages",
        href: "/github-pages",
        icon: "globe",
        extension: "html",
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
    url: "https://github.com/Sajid-ul-Islam?tab=repositories",
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
    url: "https://sajid-ul-islam.github.io/resume.html",
    icon: "file-text",
    color: "#da552f",
  },
  {
    id: "streamlit",
    name: "Streamlit",
    url: "https://share.streamlit.io/user/saajiidi",
    icon: "layout-dashboard",
    color: "#FF4B4B",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    url: "https://huggingface.co/Sajid-ul-Islam",
    icon: "huggingface",
    color: "#FFD21E",
  },
];

export const menuItems: MenuItem[] = [
  { label: "File", items: ["New File", "Open File", "Open Folder", "---", "Save", "Save As", "---", "Exit"] },
  { label: "Edit", items: ["Undo", "Redo", "---", "Cut", "Copy", "Paste", "---", "Find", "Replace"] },
  { label: "Selection", items: ["Select All", "Expand Selection", "Shrink Selection"] },
  { label: "View", items: ["Explorer", "Search", "Source Control", "---", "Terminal", "AI Chat", "---", "Full Screen"] },
  { label: "Go", items: ["Go to File", "Go to Symbol", "---", "Next File", "Previous File"] },
  { label: "Preferences", items: ["Color Theme", "Settings", "Keyboard Shortcuts"] },
  { label: "Help", items: ["Welcome", "Documentation", "Check for Updates", "---", "About"] },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Forecasting & Machine Learning",
    skills: [
      { name: "Python", category: "Data", icon: "https://img.icons8.com/color/48/null/python--v1.png" },
      { name: "Pandas", category: "Data", icon: "https://img.icons8.com/color/48/000000/pandas.png" },
      { name: "NumPy", category: "Data", icon: "https://img.icons8.com/color/48/000000/numpy.png" },
      { name: "Scikit-learn", category: "Data", icon: "https://img.icons8.com/color/48/000000/python.png" },
    ],
  },
  {
    name: "BI & Dashboards",
    skills: [
      { name: "Power BI (DAX, Modeling)", category: "BI", icon: "https://img.icons8.com/color/48/000000/power-bi.png" },
      { name: "Tableau", category: "BI", icon: "https://img.icons8.com/color/48/000000/tableau-software.png" },
      { name: "Google Analytics", category: "Data", icon: "https://img.icons8.com/color/48/000000/google-analytics.png" },
    ],
  },
  {
    name: "Data Engineering & Core Operations",
    skills: [
      { name: "SQL (MySQL, PostgreSQL, BigQuery)", category: "Data", icon: "https://img.icons8.com/ios-filled/100/000000/sql.png" },
      { name: "Analytics (R, Excel)", category: "Data", icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png" },
      { name: "End-to-End Analytics Pipelines", category: "Core" },
      { name: "Data-Driven Decision Making", category: "Core" },
      { name: "Business Intelligence", category: "Core" },
      { name: "Data Analysis", category: "Core" },
      { name: "Marketplace Analysis", category: "Core" },
      { name: "Strategic Planning", category: "Core" },
      { name: "Cross Functional Teams", category: "Core" },
      { name: "Agile Development & Scrum", category: "Core" },
    ],
  },
  {
    name: "Product & Strategy",
    skills: [
      { name: "Product Strategy", category: "Product" },
      { name: "Problem Definition", category: "Product" },
      { name: "Stakeholder Alignment", category: "Product" },
      { name: "UX Design & Research", category: "Product" },
      { name: "Agile & Scrum", category: "Product" },
      { name: "Product Documentation", category: "Product" },
    ],
  },
  {
    name: "AI Systems & Source Control",
    skills: [
      { name: "Agentic RAG", category: "AI", icon: "https://img.icons8.com/color/48/null/bot.png" },
      { name: "RAG Pipelines", category: "AI", icon: "https://img.icons8.com/color/48/null/data-configuration.png" },
      { name: "Telegram Chatbots", category: "AI", icon: "https://img.icons8.com/color/48/null/telegram-app.png" },
      { name: "WhatsApp Chatbots", category: "AI", icon: "https://img.icons8.com/color/48/null/whatsapp.png" },
      { name: "Source Control (Git & GitHub)", category: "Core", icon: "https://img.icons8.com/color/48/null/git.png" },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "deencommerce",
    title: "Business Analyst",
    company: "Deen Commerce",
    location: "Mirpur, Dhaka",
    startDate: "June 2025",
    current: true,
    description:
      "Leading end-to-end product ownership for business analytics — from problem definition and stakeholder alignment to dashboard design and implementation. Architecting the weekly performance reporting product used by the leadership team.",
    highlights: [
      "Designed and shipped the Deen Ops operational dashboard, becoming the team's single source of truth for daily metrics",
      "Architected a BI product for weekly stakeholder reporting — automating a previously manual process and enabling self-serve insights",
      "Defined CRM product strategy, identifying pipeline bottlenecks through data analysis and proposing actionable improvements",
    ],
    technologies: ["Product Ownership", "CRM", "Business Intelligence", "Strategy"],
    logo: "https://www.google.com/s2/favicons?domain=deencommerce.com&sz=128",
  },
  {
    id: "nztex",
    title: "IT Executive",
    company: "NZ TEX GROUP",
    location: "Rupganj, Narayanganj",
    startDate: "Feb 2024",
    endDate: "May 2024",
    description:
      "Bridged data and product decisions by translating complex R&D data into clear narratives for stakeholders — directly informing the product innovation roadmap.",
    highlights: [
      "Collaborated with the R&D team to translate research data into actionable product insights",
      "Delivered data-driven presentations to authorities and buyers that directly influenced product development priorities",
    ],
    technologies: ["R&D", "Product Analytics", "Stakeholder Communication"],
    logo: "https://www.google.com/s2/favicons?domain=nztexgroup.com&sz=128",
  },
  {
    id: "thrivingskills",
    title: "Associate – Online Sales & Customer Supports",
    company: "Thriving Skills",
    location: "Gulshan, Dhaka",
    startDate: "Oct 2023",
    endDate: "Jan 2024",
    description:
      "Owned marketplace analysis and sales strategy as product problems — designing data-driven outreach workflows and CRM processes that improved customer loyalty and retention.",
    highlights: [
      "Designed and executed targeted sales strategies by analyzing marketplace data — identifying growth opportunities that increased revenue",
      "Managed CRM as a product, improving retention through data-driven process improvements",
    ],
    technologies: ["Market Analysis", "CRM", "Product Strategy"],
    logo: "https://www.google.com/s2/favicons?domain=thrivingskills.com&sz=128",
  },
  {
    id: "daraz",
    title: "Jr. Executive – Marketplace",
    company: "Daraz Bangladesh Ltd.",
    location: "Banani, Dhaka",
    startDate: "Jan 2020",
    endDate: "Jan 2022",
    description:
      "Treated partner acquisition as a product problem — designing outreach workflows, iterating on conversion data, and building dashboards that became the team's single source of truth.",
    highlights: [
      "Drove a 50% increase in partner acquisitions by treating outreach as a product funnel — identifying segments, designing workflows, and iterating based on conversion metrics",
      "Built vendor performance dashboards that became the team's go-to tool for weekly reviews and strategic decisions",
      "Managed key accounts and increased client satisfaction by 20% through data-driven relationship management",
    ],
    technologies: ["Marketplace", "Product Analytics", "Dashboard Design"],
    logo: "https://www.google.com/s2/favicons?domain=daraz.com.bd&sz=128",
  },
  {
    id: "hungrynaki",
    title: "Associate – Home Kitchen & Street Food",
    company: "HungryNaki (Sister concern of Daraz)",
    location: "Banani, Dhaka",
    startDate: "Jul 2021",
    endDate: "Jan 2022",
    description:
      "Owned growth strategy as a product problem — identifying 15% growth opportunities through marketplace analysis and designing partner acquisition initiatives that expanded the network by 25%.",
    highlights: [
      "Identified 15% growth opportunities through in-depth marketplace analysis — translating data into product and strategy recommendations",
      "Designed and led partner acquisition initiatives that expanded the partner network by 25%",
      "Leveraged BI tools to identify hyper-local food trends, informing menu and marketing product decisions",
    ],
    technologies: ["Growth Strategy", "Product Analytics", "BI Tools"],
    logo: "https://www.google.com/s2/favicons?domain=hungrynaki.com&sz=128",
  },
  {
    id: "gearmaster",
    title: "Co-Founder",
    company: "Gear Master",
    startDate: "2024",
    current: true,
    description:
      "Leading product and business operations for a bike accessories retail startup — owning inventory strategy, sales growth, and multi-channel customer engagement as integrated product decisions.",
    highlights: [
      "Leading end-to-end business operations — from product sourcing and inventory strategy to multi-channel customer engagement",
      "Managing sales growth through data-driven pricing, promotion, and customer experience decisions",
    ],
    technologies: ["Retail", "Business Management", "Product Operations"],
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  },
];

export const education: Education[] = [
  {
    institution: "Academy of Business Professionals",
    degree: "PGD in Data Science & Business Analytics",
    year: "2025",
    description: "Focus on Data Analytics, Product Thinking, and Business Intelligence.",
    link: "https://abpbd.org/",
    logo: "https://www.google.com/s2/favicons?domain=abpbd.org&sz=128",
  },
  {
    institution: "North South University",
    degree: "BSc in Computer Science & Engineering",
    year: "2019",
    description:
      "Publication: 'Categorizing self-narrated stories into distinct themes' (ICT Analysis and Applications, 2020).",
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
    institution: "Uttara High School & College",
    degree: "Secondary School Certificate (SSC)",
    description: "Science Division.",
    link: "https://uhscdhaka.edu.bd",
    logo: "https://www.google.com/s2/favicons?domain=uhscdhaka.edu.bd&sz=128",
  },
];

export const personalInfo = {
  name: "Sajid Islam",
  title: "Product-Minded Business & Data Analyst",
  email: "sajid.islam.chowdhury@gmail.com",
  whatsapp: "https://wa.me/+8801824526054?text=",
  github: "https://github.com/Sajid-ul-Islam",
  huggingface: "https://huggingface.co/Sajid-ul-Islam",
  resumeUrl:
    "https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link",
  bio: "Product-minded Business & Data Analyst with 2+ years of experience owning analytics products end-to-end — from problem definition and stakeholder alignment to implementation and iteration. Proven track record of designing operational dashboards, BI tools, and data-driven decision products for e-commerce platforms like Daraz (Alibaba Group) and Deen Commerce. Specialized in Python, SQL, and Advanced Analytics with a focus on translating business problems into measurable product outcomes.",
};



export const metrics = [
  { label: "Products Shipped", value: "15+", sub: "Dashboards & Tools" },
  { label: "Stakeholders Served", value: "10+", sub: "Teams & Leadership" },
  { label: "Domains", value: "5+", sub: "E-commerce, BI, FinTech" },
  { label: "Years Experience", value: "2+", sub: "Analytics & Product" },
];

export const family = [
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
