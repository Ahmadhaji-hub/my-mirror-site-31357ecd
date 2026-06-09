import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ASSETS, PROFILE } from "./data";
import { Win } from "./Window";
import { Terminal } from "./Terminal";
import {
  AboutWindow,
  ExperienceWindow,
  SkillsWindow,
  ProjectsWindow,
  ConnectWindow,
  ProjectDetailWindow,
} from "./windows";
import { ScatterCard } from "./ScatterCard";
import { BookingWindow } from "./BookingWindow";
import { MusicBar } from "./MusicBar";
import { LangProvider, useLang } from "./i18n";
import {
  User,
  Briefcase,
  Cpu,
  TerminalSquare,
  Download,
  Mail,
  GraduationCap,
  FileText,
  Calendar,
  Github,
} from "lucide-react";

type AppId =
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "terminal"
  | "connect"
  | "booking"
  | "project-zyra"
  | "project-globaltech"
  | "project-gbn";

interface AppDef {
  id: AppId;
  titleKey: string;
  icon: ReactNode;
  render: () => ReactNode;
  width: number;
  height: number;
  accent: string;
}

const APPS: Record<AppId, AppDef> = {
  about: {
    id: "about",
    titleKey: "win.about",
    icon: <User className="w-3.5 h-3.5" />,
    render: () => <AboutWindow />,
    width: 720,
    height: 560,
    accent: "oklch(0.78 0.16 230)",
  },
  experience: {
    id: "experience",
    titleKey: "win.experience",
    icon: <Briefcase className="w-3.5 h-3.5" />,
    render: () => <ExperienceWindow />,
    width: 780,
    height: 600,
    accent: "oklch(0.78 0.16 80)",
  },
  skills: {
    id: "skills",
    titleKey: "win.skills",
    icon: <Cpu className="w-3.5 h-3.5" />,
    render: () => <SkillsWindow />,
    width: 720,
    height: 560,
    accent: "oklch(0.78 0.16 150)",
  },
  projects: {
    id: "projects",
    titleKey: "win.projects",
    icon: <Github className="w-3.5 h-3.5" />,
    render: () => <ProjectsWindow />,
    width: 780,
    height: 600,
    accent: "oklch(0.72 0.18 300)",
  },
  terminal: {
    id: "terminal",
    titleKey: "win.terminal",
    icon: <TerminalSquare className="w-3.5 h-3.5" />,
    render: () => <Terminal />,
    width: 760,
    height: 480,
    accent: "oklch(0.85 0.18 140)",
  },
  connect: {
    id: "connect",
    titleKey: "win.connect",
    icon: <Mail className="w-3.5 h-3.5" />,
    render: () => <ConnectWindow />,
    width: 640,
    height: 580,
    accent: "oklch(0.78 0.16 20)",
  },
  booking: {
    id: "booking",
    titleKey: "win.booking",
    icon: <Calendar className="w-3.5 h-3.5" />,
    render: () => <BookingWindow />,
    width: 840,
    height: 680,
    accent: "oklch(0.72 0.18 20)",
  },
  "project-zyra": {
    id: "project-zyra",
    titleKey: "Zyra AI Booking",
    icon: <Github className="w-3.5 h-3.5" />,
    render: () => <ProjectDetailWindow index={0} />,
    width: 820,
    height: 640,
    accent: "oklch(0.78 0.16 230)",
  },
  "project-globaltech": {
    id: "project-globaltech",
    titleKey: "GlobalTech IT Simulator",
    icon: <Github className="w-3.5 h-3.5" />,
    render: () => <ProjectDetailWindow index={1} />,
    width: 960,
    height: 720,
    accent: "oklch(0.78 0.16 200)",
  },
  "project-gbn": {
    id: "project-gbn",
    titleKey: "GBN Badge System",
    icon: <Github className="w-3.5 h-3.5" />,
    render: () => <ProjectDetailWindow index={2} />,
    width: 720,
    height: 560,
    accent: "oklch(0.78 0.16 150)",
  },
};

export function Desktop() {
  return (
    <LangProvider>
      <DesktopInner />
    </LangProvider>
  );
}

function DesktopInner() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState<AppId[]>([]);
  const [stack, setStack] = useState<AppId[]>([]);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setNow(
        new Date().toLocaleString(lang === "fr" ? "fr-FR" : "en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, [lang]);

  const focus = (id: AppId) =>
    setStack((s) => [...s.filter((x) => x !== id), id]);

  const toggle = (id: AppId) => {
    setOpen([id]);
    setStack([id]);
  };

  const openFromCard = (id: AppId) => {
    if (open.length > 0) {
      closeAll();
      return;
    }

    toggle(id);
  };

  const close = (id: AppId) => {
    setOpen((o) => o.filter((x) => x !== id));
    setStack((s) => s.filter((x) => x !== id));
  };

  const closeAll = () => {
    setOpen([]);
    setStack([]);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden font-display text-white select-none"
      style={{
        fontFamily: "var(--font-display)",
        backgroundImage: `url(${ASSETS.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseDown={() => {
        if (open.length > 0) closeAll();
      }}
    >
      {/* Subtle wallpaper vignette */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      {/* Backdrop blur — appears behind windows when something is open */}
      <AnimatePresence>
        {open.length > 0 && (
          <motion.div
            key="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 z-40 backdrop-blur-xl bg-black/30"
          />
        )}
      </AnimatePresence>

      {/* Top menubar */}
      <div
        className="absolute top-0 left-0 right-0 h-8 px-4 flex items-center gap-5 text-[13px] z-30"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="font-semibold tracking-tight">Ahmad</span>
        <button onClick={() => toggle("about")} className="opacity-90 hover:opacity-100">{t("menu.about")}</button>
        <button onClick={() => toggle("skills")} className="opacity-90 hover:opacity-100">{t("menu.readme")}</button>
        <button onClick={() => toggle("connect")} className="opacity-90 hover:opacity-100">{t("menu.contact")}</button>
        <a
          href={ASSETS.cv}
          download
          className="flex items-center gap-1.5 opacity-90 hover:opacity-100"
        >
          <Download className="w-3.5 h-3.5" /> {t("menu.cv")}
        </a>
        <div className="flex-1" />
        {/* Language toggle — left of date */}
        <div className="flex items-center rounded-md overflow-hidden ring-1 ring-white/20 text-[11px] font-semibold mr-1">
          {(["fr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 transition-colors ${
                lang === l ? "bg-white text-zinc-900" : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="opacity-90 tabular-nums" suppressHydrationWarning>{mounted ? now : ""}</span>
      </div>

      {/* Scattered cards on the wallpaper — scaled down 20% */}
      <div
        className="absolute inset-0"
        style={{ transform: "scale(0.8)", transformOrigin: "center center" }}
      >
      <ScatterCard
        label={t("scatter.zyra")}
        x={860}
        y={130}
        w={240}
        h={150}
        rotate={-6}
        delay={0.1}
        onOpen={() => openFromCard("project-zyra")}
        tone="none"
      >
        <div className="relative w-full h-full overflow-hidden rounded-md">
          <img
            src="https://img.youtube.com/vi/hSY0WJav-ns/hqdefault.jpg"
            alt="Zyra demo"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center bg-black/30">
            <div className="w-12 h-12 rounded-full bg-white/90 grid place-items-center shadow-lg">
              <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-zinc-900 ml-1" />
            </div>
          </div>
          <div className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/90 drop-shadow">demo · 2:34</div>
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.readme")} x={640} y={180} w={170} h={210} rotate={4} delay={0.2} onOpen={() => openFromCard("about")} tone="cream">
        <div className="p-3 text-zinc-800 text-[10px] leading-snug font-mono">
          <div className="font-bold text-zinc-900 mb-1">README</div>
          hey, I'm<br />ahmad. IT<br />support in<br />Geneva.<br /><br />M365 · Intune<br />Entra · AD<br /><br />also: n8n,<br />OpenAI, AI<br />automation
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.terminal")} x={360} y={460} w={250} h={150} rotate={-3} delay={0.3} onOpen={() => openFromCard("terminal")} tone="none">
        <div className="bg-zinc-950 h-full p-2.5 font-mono text-[10px] leading-tight text-emerald-300/90 rounded-md">
          <div className="flex gap-1 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-white/60">ahmad@portfolio:~$ whoami</div>
          <div>ahmad — IT support</div>
          <div className="text-white/60">$ skills</div>
          <div>M365 · Intune</div>
          <div className="text-white/60">$ extra</div>
          <div>n8n · ai</div>
          <div className="text-white/60">$ <span className="bg-emerald-300/90 w-1 inline-block">&nbsp;</span></div>
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.globaltech")} x={1140} y={130} w={210} h={160} rotate={5} delay={0.15} onOpen={() => openFromCard("project-globaltech")} tone="none">
        <div className="relative w-full h-full overflow-hidden rounded-md">
          <div
            className="absolute origin-top-left pointer-events-none"
            style={{ width: "1280px", height: "800px", transform: "scale(0.18)" }}
          >
            <iframe
              src="https://ahmadhaji-hub.github.io/globaltech-it-simulator/"
              title="GlobalTech IT Simulator preview"
              className="w-full h-full border-0 bg-white"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          <div className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white/95 drop-shadow">GlobalTech IT · live</div>
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.about")} x={460} y={290} w={170} h={200} rotate={-4} delay={0.25} onOpen={() => openFromCard("about")} tone="none">
        <img src={ASSETS.portrait} alt="Ahmad" className="w-full h-full object-cover" />
      </ScatterCard>

      <ScatterCard label={t("scatter.experience")} x={120} y={520} w={190} h={180} rotate={3} delay={0.35} onOpen={() => openFromCard("experience")} tone="none">
        <div className="h-full p-3 text-zinc-800 text-[11px] font-mono leading-snug bg-white rounded-md">
          <div className="font-bold mb-1 border-b border-dashed border-zinc-300 pb-1">{t("scatter.exp.title")}</div>
          <div>+ GBNews</div>
          <div>+ ORS Serco</div>
          <div>+ Consultant</div>
          <div>+ Voweland</div>
          <div className="mt-3 text-lg font-bold">7+ <span className="text-xs font-medium">{t("scatter.exp.years")}</span></div>
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.book")} x={840} y={490} w={150} h={150} rotate={-5} delay={0.4} onOpen={() => openFromCard("booking")} tone="none">
        <div className="relative w-full h-full rounded-md bg-gradient-to-br from-rose-400 to-rose-500">
          <div className="absolute inset-0 grid place-items-center text-white">
            <Calendar className="w-10 h-10 opacity-95" strokeWidth={1.6} />
          </div>
          <div className="absolute bottom-3 inset-x-0 text-center text-[11px] font-bold text-white tracking-wider">
            {t("scatter.book.line1")}<br />{t("scatter.book.line2")}
          </div>
        </div>
      </ScatterCard>

      <ScatterCard label={t("scatter.gbn")} x={1180} y={500} w={190} h={140} rotate={4} delay={0.45} onOpen={() => openFromCard("project-gbn")} tone="none">
        <div className="relative w-full h-full rounded-md bg-gradient-to-br from-emerald-400 to-emerald-500 grid place-items-center text-white">
          <div className="text-center leading-tight">
            <div className="text-[10px] tracking-[0.2em] font-semibold opacity-90">BADGE</div>
            <div className="text-3xl font-black tracking-tight">#072</div>
            <div className="text-[10px] tracking-[0.2em] font-semibold opacity-90">GBN ✓</div>
          </div>
        </div>
      </ScatterCard>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {open.map((id) => {
          const def = APPS[id];
          const title = def.titleKey.startsWith("win.")
            ? t(def.titleKey as Parameters<typeof t>[0])
            : def.titleKey;
          return (
            <Win
              key={id}
              title={title}
              icon={def.icon}
              width={def.width}
              height={def.height}
              z={50 + stack.indexOf(id)}
              accent={def.accent}
              onFocus={() => focus(id)}
              onClose={() => close(id)}
            >
              {def.render()}
            </Win>
          );
        })}
      </AnimatePresence>

      {/* macOS-style colored dock */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-end gap-3 px-4 py-2.5 rounded-2xl bg-zinc-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl">
          {[
            { id: "about", label: t("dock.about"), icon: <User className="w-7 h-7" />, grad: "from-sky-400 to-sky-600" },
            { id: "experience", label: t("dock.experience"), icon: <Briefcase className="w-7 h-7" />, grad: "from-orange-400 to-orange-600" },
            { id: "skills", label: t("dock.stack"), icon: <Cpu className="w-7 h-7" />, grad: "from-emerald-400 to-emerald-600" },
            { id: "education", label: t("dock.education"), icon: <GraduationCap className="w-7 h-7" />, grad: "from-fuchsia-400 to-violet-600" },
            { id: "readme", label: t("dock.readme"), icon: <FileText className="w-7 h-7" />, grad: "from-amber-300 to-amber-500" },
            { id: "terminal", label: t("dock.terminal"), icon: <TerminalSquare className="w-7 h-7" />, grad: "from-zinc-700 to-zinc-900" },
            { id: "mail", label: t("dock.mail"), icon: <Mail className="w-7 h-7" />, grad: "from-sky-400 to-blue-600" },
            { id: "call", label: t("dock.calendar"), icon: <Calendar className="w-7 h-7" />, grad: "from-rose-400 to-rose-600" },
            { id: "github", label: t("dock.projects"), icon: <Github className="w-7 h-7" />, grad: "from-zinc-600 to-zinc-800" },
          ].map((d) => {
            const map: Record<string, AppId> = {
              about: "about",
              experience: "experience",
              skills: "skills",
              education: "skills",
              readme: "about",
              terminal: "terminal",
              mail: "connect",
              call: "booking",
              github: "projects",
            };
            const target = map[d.id];
            const isOpen = open.includes(target);
            return (
              <motion.button
                key={d.id}
                whileHover={{ y: -10, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                onClick={() => toggle(target)}
                className="group relative grid place-items-center"
                title={d.label}
              >
                <div className={`relative w-[3.3rem] h-[3.3rem] rounded-2xl grid place-items-center bg-gradient-to-b ${d.grad} text-white shadow-lg ring-1 ring-white/10`}>
                  {d.icon}
                  {isOpen && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </div>
                <span className="absolute -top-7 px-2 py-0.5 rounded-md bg-zinc-900/90 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {d.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <MusicBar />

    </div>
  );
}