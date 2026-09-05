export type PortfolioProject = {
  slug: string;
  name: string;
  badge: string;
  shortDescription: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
};

export const siteConfig = {
  name: "Sibasish Chakraborti",
  siteName: "sibasishdev.in",
  title:
    "Sibasish Chakraborti | Best Budget Software Developer, UI Engineering & Web Publisher in Agartala — Cheapest & Best Digital Services",
  description:
    "Sibasish Chakraborti (+91 9863379440) is the best budget developer, software developer, UI engineer, and web publisher in Agartala, Tripura. Offering the cheapest and best digital services, custom build softwares, and UI engineering with Next.js, React, FastAPI, Python, and AWS.",
  shortDescription:
    "Best budget developer, software developer, UI engineer, and web publisher in Agartala, Tripura (Phone: +91 9863379440). Providing the cheapest and best digital services, custom build softwares, and modern UI engineering.",
  jobTitle: "Best Budget Software Developer, UI Engineer & Web Publisher",
  email: "sibasishchakraborti@gmail.com",
  phone: "+919863379440",
  formattedPhone: "+91 9863379440",
  rawPhone: "9863379440",
  locale: "en_US",
  language: "en",
  themeColor: "#050505",
  resumePath: "/Sibasish_Chakraborti_Frontend_Resume.pdf",
  location: {
    city: "Agartala",
    state: "Tripura",
    country: "India",
    region: "Northeast India",
    postalCode: "799001",
    latitude: 23.8315,
    longitude: 91.2868,
  },
  socialLinks: {
    linkedIn: "https://www.linkedin.com/in/sibasish-chakraborti-5b55b82b1/",
    github: "https://github.com/Sibasish2005",
    instagram: "https://instagram.com/sibasish__chakraborti",
    whatsapp: "https://wa.me/9863379440",
  },
  services: [
    "Best budget software developer services",
    "Cheapest and best digital services in Agartala",
    "UI engineering in Agartala",
    "Web publisher services in Agartala",
    "Full stack software engineering",
    "Custom build softwares",
    "Best UI UX design",
    "Next.js and React frontend development",
    "FastAPI and Python backend engineering",
    "AWS cloud infrastructure and deployment",
    "E-commerce website development",
    "Business and institutional website development",
    "AI integrations and RAG pipeline engineering",
    "SEO & AEO optimization services",
  ],
  keywords: [
    // Cluster 1: Brand & Personal Entity
    "Sibasish Chakraborti",
    "sibasishdev",
    "sibasishdev.in",
    "siv.dev",
    "Sibasish Chakraborti phone number",
    "9863379440",
    "+919863379440",
    "+91 9863379440",
    "Sibasish Chakraborti Agartala",
    "Sibasish Chakraborti Tripura",

    // Cluster 2: Budget & Affordability (High Local Demand)
    "best budget developer in agartala",
    "best budget developer Agartala",
    "best budget developer in tripura",
    "best budget software developer in agartala",
    "budget software developer in agartala",
    "budget developer agartala",
    "cheapest and best services in agartala",
    "cheapest and best services Agartala",
    "cheapest and best digital services in agartala",
    "cheapest and best web developer in agartala",
    "cheapest web developer in agartala",
    "affordable software developer agartala",
    "low cost web development agartala",
    "affordable web designer agartala",
    "budget website design tripura",

    // Cluster 3: UI Engineering & Web Publishing Authority
    "ui engineering in agartala",
    "ui engineer in agartala",
    "ui engineer agartala",
    "best ui engineer in agartala",
    "ui engineering services agartala",
    "web publisher in agartala",
    "web publisher agartala",
    "web publisher in Tripura",
    "top web publisher Agartala",
    "frontend ui engineer agartala",
    "ui ux design agartala",
    "motion ui design agartala",
    "creative web developer agartala",

    // Cluster 4: Freelance & Custom Software Engineering
    "best freelancer in agartala",
    "best freelancer Agartala",
    "best freelancer in tripura",
    "freelance software developer in agartala",
    "freelance web developer agartala",
    "custom build softwares",
    "custom build software in Agartala",
    "custom software development Agartala",
    "custom software developer tripura",
    "best UI UX design",
    "best UI UX designer in Agartala",
    "best UI/UX design Agartala",
    "best software engineer in Agartala",
    "best software developer in Agartala",

    // Cluster 5: High-Converting Commercial Client Acquisition
    "website developer in agartala",
    "web developer in agartala",
    "website designer in agartala",
    "web designer in agartala",
    "web development company in agartala",
    "website design company in agartala",
    "website developer near me",
    "web developer near me",
    "hire website developer in agartala",
    "hire software developer in agartala",
    "best website maker in agartala",
    "website maker agartala",
    "business website developer agartala",
    "ecommerce website developer in agartala",
    "school website developer in agartala",
    "hospital clinic website developer agartala",

    // Cluster 6: Technology & Regional Reach
    "Next.js developer Agartala",
    "React developer Agartala",
    "FastAPI developer Agartala",
    "Python developer Agartala",
    "AWS developer Tripura",
    "full stack software engineer",
    "full stack developer Agartala",
    "software engineer Northeast India",
    "web developer Northeast India",
    "DigiPanch developer",
    "Chartes tech developer",
  ],
} as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "chartes",
    name: "Chartes.tech",
    badge: "Multi-Tenant Enterprise Automation",
    shortDescription:
      "High-throughput multi-tenant social media automation, campaign orchestration, and distributed job queue platform.",
    problem:
      "Brands and agencies face fragmented posting workflows, rate-limiting bottlenecks, and complex token refresh cycles across social platforms.",
    solution:
      "Engineered an automated multi-tenant scheduling engine with distributed job queues, OAuth token refresh cycles, and multi-network dispatch.",
    impact:
      "Delivered reliable high-throughput social campaign automation with multi-tenant workspace isolation.",
    stack: ["Next.js 16", "TypeScript", "Multi-Tenant", "Redis", "FastAPI"],
    liveUrl: "https://chartes.tech",
    image: "/chartes.webp",
  },
  {
    slug: "digipanch",
    name: "DIGIPANCH",
    badge: "AI-Powered Smart Panchayat System",
    shortDescription:
      "AI-powered e-governance platform revolutionizing rural administration with Gemini semantic search and digital citizen service pipelines.",
    problem:
      "Rural citizens face severe bureaucratic bottlenecks, manual paper records, and lack of transparency when accessing panchayat government services.",
    solution:
      "Built a unified digital portal featuring dedicated citizen/officer dashboards, Gemini RAG semantic search, ImageKit document verification, and Razorpay payment flows.",
    impact:
      "Digitized rural governance workflows into a 100% auditable, multi-role e-governance platform.",
    stack: ["Next.js 16", "FastAPI", "PostgreSQL", "pgvector", "Google Gemini", "AWS"],
    liveUrl: "https://www.digipanch.live",
    image: "/digipanch.webp",
  },
  {
    slug: "poyodhara",
    name: "POYODHARA",
    badge: "Premium Product Showcase",
    shortDescription:
      "Experiential digital storefront and product showcase for bottled beverages with GSAP scroll pinning and wholesale lead capture.",
    problem:
      "Regional packaged beverage businesses struggle with generic static web pages that fail to convey water purity, filtration science, and brand quality.",
    solution:
      "Engineered an immersive, visual-first product showcase highlighting 8-stage purification, eco-packaging, and interactive wholesale distributor inquiries.",
    impact:
      "Significantly elevated digital brand presence, customer dwell time, and B2B distributor engagement.",
    stack: ["Next.js", "React", "Tailwind CSS", "GSAP", "ScrollTrigger"],
    liveUrl: "https://poyodhara.vercel.app/",
    image: "/poyodhara.webp",
  },
  {
    slug: "heeyaku",
    name: "HEEYAKU",
    badge: "EdTech OS & Academy Management",
    shortDescription:
      "Customized operating system engineered for academies, coaching institutes, and bootcamps with DRM-secured video LMS and CRM automation.",
    problem:
      "Educational academies struggle with scattered tooling between lead conversion CRM, video piracy in courses, and disconnected student messaging.",
    solution:
      "Architected an all-in-one operating platform integrating unified lead CRM, DRM-protected video streaming, high-speed student portals, and automated WhatsApp communication.",
    impact:
      "Consolidated student acquisition and course delivery into a single high-performance operating stack.",
    stack: ["Next.js 16", "React 19", "EdTech LMS", "DRM Video", "WhatsApp API", "CRM"],
    liveUrl: "https://heeyaku.com",
    image: "/heeyaku.webp",
  },
  {
    slug: "beyond-pinks",
    name: "BEYOND PINKS",
    badge: "Fashion E-Commerce Experience",
    shortDescription:
      "Conversion-optimized digital fashion storefront with modern aesthetic visual hierarchy and high-speed checkout flows.",
    problem:
      "Independent apparel brands need fast mobile experiences, expressive brand identity, and frictionless product discoverability to drive retail conversions.",
    solution:
      "Created a modern, aesthetic e-commerce storefront with reactive product galleries, dynamic filtering, and streamlined customer purchasing flows.",
    impact:
      "Delivered instant mobile browsing speeds and increased visual engagement.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://byondpinks.vercel.app/",
    image: "/mockups/laptop-mockup.png",
  },
];
