import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

const DICT = {
  // Menubar
  "menu.about": { en: "About", fr: "À propos" },
  "menu.readme": { en: "README", fr: "README" },
  "menu.contact": { en: "Contact", fr: "Contact" },
  "menu.cv": { en: "Download CV", fr: "Télécharger CV" },

  // Scatter card labels
  "scatter.zyra": { en: "Zyra AI Booking", fr: "Zyra AI Booking" },
  "scatter.readme": { en: "README.md", fr: "README.md" },
  "scatter.terminal": { en: "terminal", fr: "terminal" },
  "scatter.globaltech": { en: "GlobalTech IT Simulator", fr: "GlobalTech IT Simulator" },
  "scatter.about": { en: "about", fr: "à propos" },
  "scatter.experience": { en: "experience", fr: "expérience" },
  "scatter.book": { en: "book a call", fr: "réserver un appel" },
  "scatter.gbn": { en: "gbn badges", fr: "badges gbn" },
  "scatter.exp.title": { en: "EXP", fr: "EXP" },
  "scatter.exp.years": { en: "years", fr: "ans" },
  "scatter.book.line1": { en: "30 MIN", fr: "APPEL" },
  "scatter.book.line2": { en: "CALL", fr: "30 MIN" },

  // Dock
  "dock.about": { en: "About", fr: "À propos" },
  "dock.experience": { en: "Experience", fr: "Expérience" },
  "dock.stack": { en: "Stack", fr: "Compétences" },
  "dock.education": { en: "Education", fr: "Formation" },
  "dock.readme": { en: "README", fr: "README" },
  "dock.terminal": { en: "Terminal", fr: "Terminal" },
  "dock.mail": { en: "Mail", fr: "Mail" },
  "dock.calendar": { en: "Calendar", fr: "Agenda" },
  "dock.projects": { en: "Projects", fr: "Projets" },

  // About window
  "about.role": { en: "IT Support Specialist", fr: "Spécialiste Support IT" },
  "about.p1": {
    en: "IT Support Technician with 7+ years of experience supporting users, troubleshooting incidents and keeping Microsoft environments running smoothly.",
    fr: "Technicien Support IT avec plus de 7 ans d'expérience à accompagner les utilisateurs, résoudre les incidents et maintenir des environnements Microsoft stables.",
  },
  "about.p2": {
    en: "Day-to-day I administer Microsoft 365, manage devices with Intune & Autopilot, handle identity and access through Entra ID, and run the usual Active Directory work — users, groups, GPOs, DNS and DHCP. I also maintain a virtualized infrastructure on Proxmox.",
    fr: "Au quotidien j'administre Microsoft 365, je gère les postes avec Intune & Autopilot, l'identité et les accès via Entra ID, et l'Active Directory — utilisateurs, groupes, GPOs, DNS et DHCP. Je maintiens aussi une infrastructure virtualisée sur Proxmox.",
  },
  "about.p3.before": {
    en: "I'm currently preparing for ",
    fr: "Je me prépare actuellement au ",
  },
  "about.p3.bold": { en: "Cloud Engineering", fr: "Cloud Engineering" },
  "about.p3.after": {
    en: " and I'm fascinated by automation and AI — I build workflows with n8n and API integrations to cut down repetitive work.",
    fr: " et je suis passionné par l'automatisation et l'IA — je construis des workflows avec n8n et des intégrations API pour réduire les tâches répétitives.",
  },
  "about.stat.years": { en: "years", fr: "années" },
  "about.stat.users": { en: "users", fr: "utilisateurs" },
  "about.stat.langs": { en: "languages", fr: "langues" },
  "about.langs": { en: "FR · EN · Kurdish · Turkish · Arabic", fr: "FR · EN · Kurde · Turc · Arabe" },

  // Experience
  "exp.title": { en: "Experience", fr: "Expérience" },

  // Skills
  "skills.title": { en: "Stack", fr: "Compétences" },
  "skills.education": { en: "Education", fr: "Formation" },

  // Projects
  "projects.title": { en: "Projects", fr: "Projets" },
  "projects.viewAll": { en: "View all repositories", fr: "Voir tous les dépôts" },
  "projects.kicker": { en: "Project", fr: "Projet" },
  "projects.stack": { en: "Stack", fr: "Stack" },
  "projects.viewGithub": { en: "View on GitHub", fr: "Voir sur GitHub" },
  "projects.watchDemo": { en: "Watch demo", fr: "Voir la démo" },

  // Contact
  "contact.title": { en: "Contact", fr: "Contact" },
  "contact.email": { en: "Email", fr: "Email" },
  "contact.phone": { en: "Phone", fr: "Téléphone" },
  "contact.linkedin": { en: "LinkedIn", fr: "LinkedIn" },
  "contact.github": { en: "GitHub", fr: "GitHub" },
  "contact.location": { en: "Location", fr: "Localisation" },
  "contact.cv": { en: "Download CV", fr: "Télécharger CV" },
  "contact.book": { en: "Book a 30-min call", fr: "Réserver un appel de 30 min" },

  // Booking window
  "booking.kicker": { en: "30-minute meeting", fr: "Rendez-vous de 30 min" },
  "booking.title": { en: "Schedule with", fr: "Prendre RDV avec" },
  "booking.subtitle": {
    en: "Pick a time that works for you below. The booking lands directly on my agenda and you'll receive a calendar invite.",
    fr: "Choisissez un créneau qui vous convient ci-dessous. La réservation arrive directement dans mon agenda et vous recevrez une invitation.",
  },
  "booking.cta": { en: "Open Google Calendar", fr: "Ouvrir Google Agenda" },
  "booking.hint": {
    en: "Geneva time (CET / CEST)",
    fr: "Heure de Genève (CET / CEST)",
  },

  // Window titles
  "win.about": { en: "About — ahmad.app", fr: "À propos — ahmad.app" },
  "win.experience": { en: "Experience.md", fr: "Experience.md" },
  "win.skills": { en: "Stack.txt", fr: "Stack.txt" },
  "win.projects": { en: "Projects/ — GitHub", fr: "Projets/ — GitHub" },
  "win.connect": { en: "Connect.card", fr: "Contact.card" },
  "win.booking": { en: "Book a call", fr: "Réserver un appel" },
} as const;

export type Key = keyof typeof DICT;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: Key) => DICT[k]?.[lang] ?? k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}

export function useT() {
  return useLang().t;
}

// ── Translated content for data arrays ──────────────────────────────────────

export const EXPERIENCE_BULLETS_FR: string[][] = [
  [
    "Administration Microsoft 365 (utilisateurs, licences, Exchange Online, Microsoft Entra ID).",
    "Gestion Microsoft Intune — enrôlement des appareils, conformité, profils de configuration et déploiement d'applications.",
    "Administration Active Directory (utilisateurs, groupes, UO, GPO, DNS, DHCP).",
    "Déploiement Windows Autopilot et onboarding automatisé des postes.",
    "Virtualisation Proxmox et administration des VMs.",
    "Support IT N1 / N2 pour un parc d'environ 50 utilisateurs via GLPI.",
    "Diagnostic et résolution d'incidents sur Microsoft 365, Intune, AD, Windows et réseau.",
  ],
  [
    "Support technique N1 / N2 pour plus de 70 utilisateurs sur plusieurs sites.",
    "Administration opérationnelle Microsoft 365, Intune et Active Directory (comptes, accès, mots de passe).",
    "Déploiement et configuration de postes (imaging Windows, installation logicielle, préparation matérielle).",
  ],
  [
    "Solutions d'automatisation et d'IA pour fluidifier les processus métier.",
    "Workflows n8n et intégrations d'API tierces.",
    "Systèmes intelligents — ex. prise de RDV via WhatsApp.",
  ],
  [
    "Gestion des comptes utilisateurs et des droits d'accès.",
    "Support L1 / L2 — postes, logiciels, imprimantes, réseau.",
    "10+ tickets / jour résolus pour maintenir les services en marche.",
  ],
];

export const EXPERIENCE_ROLE_FR: string[] = [
  "Technicien Support IT — M365, Intune & AD",
  "Collaborateur IT",
  "Automatisation IT & Support Systèmes",
  "Spécialiste Helpdesk IT",
];

export const PROJECTS_DESC_FR: string[] = [
  "Système de prise de rendez-vous propulsé par l'IA avec n8n, OpenAI, l'API WhatsApp, Airtable et Google Calendar. Les clients discutent naturellement sur WhatsApp et Zyra gère les disponibilités, confirmations et rappels de bout en bout.",
  "Plateforme moderne de simulation d'infrastructure IT d'entreprise, axée sur l'administration système, le cloud, le réseau, la sécurité et les opérations IT. Un terrain d'entraînement pratique pour les scénarios IT du quotidien.",
  "Outil interne de gestion des badges et des accès écrit en Python, pour les opérations IT au quotidien : émission, suivi et cycle de vie des badges pour le personnel et les visiteurs.",
];

export const EDUCATION_FR: { title: string; issuer: string; year: string }[] = [
  { title: "CFC Opérateur en informatique", issuer: "OFPC Genève", year: "2025" },
  { title: "Cisco — Sécurité des réseaux", issuer: "Coursera", year: "2024" },
  { title: "Informatique (Bachelor)", issuer: "Université de Genève", year: "2022" },
];