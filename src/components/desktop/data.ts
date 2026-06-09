export const ASSETS = {
  portrait: `${import.meta.env.BASE_URL}ahmad-portrait.png`,
  wallpaper: `${import.meta.env.BASE_URL}wallpaper.png`,
  cv: `${import.meta.env.BASE_URL}Ahmad_Haji_CV.pdf`,
};


export const PROFILE = {
  name: "Ahmad Haji",
  role: "IT Support · Automation · AI",
  location: "Geneva, Switzerland",
  email: "PNNF@hotmail.com",
  phone: "+41 78 223 05 55",
  github: "https://github.com/Ahmadhaji-hub",
  linkedin: "https://www.linkedin.com/in/ahmad-haji",
  calendar: "https://calendar.app.google/oLvgxetFpQrSMaAE6",
  bio: "I'm currently preparing for Cloud Engineering and I'm fascinated by automation and AI — I build workflows with n8n and API integrations to cut down repetitive work.",
};

export const EXPERIENCE = [
  {
    role: "IT Support Technician — M365, Intune & AD",
    company: "GBNews / SwissNova",
    location: "Geneva, Switzerland",
    period: "Since 2026",
    bullets: [
      "Microsoft 365 administration (users, licenses, Exchange Online, Microsoft Entra ID).",
      "Microsoft Intune management — device enrollment, compliance, configuration profiles and app deployment.",
      "Active Directory administration (users, groups, OUs, GPO, DNS, DHCP).",
      "Windows Autopilot deployment and automated workstation onboarding.",
      "Proxmox virtualization and VM administration.",
      "N1 / N2 IT support for a fleet of ~50 users via GLPI.",
      "Incident diagnosis and resolution across Microsoft 365, Intune, AD, Windows and network.",
    ],
  },
  {
    role: "IT Collaborator",
    company: "ORS Serco AG — Swiss Federal Center",
    location: "Switzerland",
    period: "2023 — 2025",
    bullets: [
      "Support technique N1 / N2 pour plus de 70 utilisateurs sur plusieurs sites.",
      "Administration opérationnelle Microsoft 365, Intune et Active Directory (comptes, accès, mots de passe).",
      "Déploiement et configuration de postes (imaging Windows, installation logicielle, préparation matérielle).",
    ],
  },
  {
    role: "IT Automation & Systems Support",
    company: "Independent Consultant",
    location: "Geneva, Switzerland",
    period: "2021 — 2023",
    bullets: [
      "Built automation and AI-assisted solutions to streamline business processes.",
      "Designed automated workflows with n8n and integrated third-party APIs.",
      "Created intelligent systems such as WhatsApp-based appointment booking.",
    ],
  },
  {
    role: "IT Helpdesk Specialist",
    company: "Voweland Library",
    location: "Beirut",
    period: "2016 — 2020",
    bullets: [
      "User account and access rights management.",
      "N1 / N2 technical support — workstations, software, printers, telephony, network.",
      "Hardware and software incident diagnosis on Windows and macOS.",
      "Workstation and peripheral installation and configuration.",
      "Ticket handling — 10+ tickets per day to ensure service continuity.",
    ],
  },
];

export const SKILLS = [
  { group: "Microsoft Infrastructure", items: ["Windows Server", "Active Directory", "GPO", "DNS", "DHCP", "Entra ID"] },
  { group: "Modern Workplace", items: ["Microsoft 365", "Intune", "Windows Autopilot", "Exchange Online", "Endpoint Mgmt"] },
  { group: "Virtualization", items: ["Proxmox VE", "Virtual Machines", "Virtual Networking", "Storage"] },
  { group: "Support & Ops", items: ["L1 / L2 Support", "GLPI", "ServiceNow", "Incident Mgmt", "Troubleshooting"] },
  { group: "Automation & AI", items: ["n8n", "API Integrations", "Workflow Automation", "OpenAI"] },
];

export const EDUCATION = [
  { title: "CFC Opérateur en informatique", issuer: "OFPC Geneva", year: "2025" },
  { title: "Cisco — Network Security", issuer: "Coursera", year: "2024" },
  { title: "Computer Science (Bachelor)", issuer: "University of Geneva", year: "2022" },
];

export const PROJECTS = [
  {
    name: "Zyra AI Booking",
    description:
      "AI-powered appointment booking system using n8n, OpenAI, WhatsApp API, Airtable and Google Calendar. Customers chat naturally on WhatsApp and Zyra handles availability, confirmations and reminders end-to-end.",
    repo: "https://github.com/Ahmadhaji-hub/zyra-ai-booking",
    demo: "https://www.youtube.com/watch?v=hSY0WJav-ns",
    demoId: "hSY0WJav-ns",
    tech: ["n8n", "OpenAI", "WhatsApp API", "Airtable", "Google Calendar"],
  },
  {
    name: "GlobalTech IT Simulator",
    description:
      "A modern enterprise IT infrastructure simulation platform focused on real-world System Administration, Cloud Engineering, Networking, Security and IT Operations. Built as a hands-on training ground for IT scenarios you actually meet on the job.",
    repo: "https://github.com/Ahmadhaji-hub/globaltech-it-simulator",
    demo: "https://ahmadhaji-hub.github.io/globaltech-it-simulator/",
    tech: ["HTML", "System Admin", "Cloud", "Networking", "Security"],
    liveEmbed: true,
  },
  {
    name: "GBN Badge System",
    description:
      "Internal badge and access management tool written in Python, supporting day-to-day IT operations: badge issuance, tracking and lifecycle for staff and visitors.",
    repo: "https://github.com/Ahmadhaji-hub/gbn-badge-system",
    tech: ["Python", "Internal Tool", "IT Ops"],
  },
];
