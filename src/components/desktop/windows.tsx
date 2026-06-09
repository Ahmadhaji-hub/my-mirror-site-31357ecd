import { motion } from "framer-motion";
import { PROFILE, EXPERIENCE, SKILLS, EDUCATION, PROJECTS, ASSETS } from "./data";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, GraduationCap } from "lucide-react";
import {
  useT,
  useLang,
  EXPERIENCE_BULLETS_FR,
  EXPERIENCE_ROLE_FR,
  PROJECTS_DESC_FR,
  EDUCATION_FR,
} from "./i18n";

export function AboutWindow() {
  const t = useT();
  return (
    <div className="p-8 space-y-6 text-zinc-900">
      <div className="flex gap-5 items-center">
        <img
          src={ASSETS.portrait}
          alt={PROFILE.name}
          className="w-20 h-20 rounded-full object-cover ring-1 ring-black/10"
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{PROFILE.name}</h2>
          <p className="text-sm text-zinc-500 mt-1">{t("about.role")} · {PROFILE.location}</p>
        </div>
      </div>

      <div className="space-y-4 text-[15px] leading-relaxed text-zinc-700">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>
          {t("about.p3.before")}
          <strong className="text-zinc-900">{t("about.p3.bold")}</strong>
          {t("about.p3.after")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { v: "7+", l: t("about.stat.years") },
          { v: "120+", l: t("about.stat.users") },
          { v: "5", l: t("about.stat.langs") },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-zinc-200 px-4 py-3">
            <div className="text-2xl font-bold text-zinc-900">{s.v}</div>
            <div className="text-xs text-zinc-500 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="text-sm text-zinc-500 pt-1">
        {t("about.langs")}
      </div>

      <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-200">
        <a href={`mailto:${PROFILE.email}`} className="chip-light"><Mail className="w-3.5 h-3.5" /> {t("contact.email")}</a>
        <a href={PROFILE.github} target="_blank" className="chip-light"><Github className="w-3.5 h-3.5" /> GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" className="chip-light"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>
      </div>
    </div>
  );
}

export function ExperienceWindow() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="p-8 space-y-6 text-zinc-900">
      <h2 className="text-3xl font-bold tracking-tight">{t("exp.title")}</h2>
      <div className="space-y-4">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company + e.period}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-zinc-200 bg-white/40 p-5"
          >
            <div className="flex justify-between items-start gap-3">
              <h3 className="text-[15px] font-semibold text-zinc-900">
                {lang === "fr" ? EXPERIENCE_ROLE_FR[i] ?? e.role : e.role}
              </h3>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-white whitespace-nowrap">
                {e.period}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">{e.location}</p>
            <ul className="mt-3 space-y-1.5">
              {(lang === "fr" ? EXPERIENCE_BULLETS_FR[i] ?? e.bullets : e.bullets).map((b, j) => (
                <li key={j} className="text-[13px] text-zinc-600 leading-relaxed flex gap-2">
                  <span className="text-zinc-400 mt-1.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SkillsWindow() {
  const t = useT();
  const { lang } = useLang();
  const education = lang === "fr" ? EDUCATION_FR : EDUCATION;
  return (
    <div className="p-8 space-y-6 text-zinc-900">
      <h2 className="text-3xl font-bold tracking-tight">{t("skills.title")}</h2>
      {SKILLS.map((s) => (
        <div key={s.group}>
          <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2">{s.group}</div>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => (
              <span key={it} className="chip-tag-light">{it}</span>
            ))}
          </div>
        </div>
      ))}
      <div className="pt-3 border-t border-zinc-200">
        <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5" /> {t("skills.education")}
        </div>
        {education.map((e) => (
          <div key={e.title} className="flex justify-between text-[13px] text-zinc-700 py-1">
            <span>{e.title} <span className="text-zinc-500">— {e.issuer}</span></span>
            <span className="text-zinc-500 font-mono text-xs">{e.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsWindow() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="p-8 space-y-3 text-zinc-900">
      <h2 className="text-3xl font-bold tracking-tight mb-2">{t("projects.title")}</h2>
      {PROJECTS.map((p, i) => (
        <motion.a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          key={p.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          className="block rounded-xl border border-zinc-200 bg-white/40 p-4 group hover:border-zinc-400 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-zinc-900">{p.name}</h3>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
          </div>
          <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
            {lang === "fr" ? PROJECTS_DESC_FR[i] ?? p.description : p.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {p.tech.map((t) => (
              <span key={t} className="chip-tag-light text-[10px]">{t}</span>
            ))}
          </div>
        </motion.a>
      ))}
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noreferrer"
        className="chip-light w-full justify-center mt-2"
      >
        <Github className="w-3.5 h-3.5" /> {t("projects.viewAll")}
      </a>
    </div>
  );
}

export function ProjectDetailWindow({ index }: { index: number }) {
  const t = useT();
  const { lang } = useLang();
  const p = PROJECTS[index];
  if (!p) return null;
  const demo = (p as { demo?: string }).demo;
  const demoId = (p as { demoId?: string }).demoId;
  const liveEmbed = (p as { liveEmbed?: boolean }).liveEmbed;
  const description = lang === "fr" ? PROJECTS_DESC_FR[index] ?? p.description : p.description;
  return (
    <div className="p-8 space-y-5 text-zinc-900">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-1">{t("projects.kicker")}</div>
        <h2 className="text-3xl font-bold tracking-tight">{p.name}</h2>
      </div>
      <p className="text-[15px] leading-relaxed text-zinc-700">{description}</p>
      {demoId && (
        <div className="aspect-video w-full overflow-hidden rounded-xl ring-1 ring-black/10 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${demoId}`}
            title={`${p.name} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
      {liveEmbed && demo && !demoId && (
        <div className="w-full overflow-hidden rounded-xl ring-1 ring-black/10 bg-white">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 border-b border-black/5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-[10px] font-mono text-zinc-500 truncate">{demo}</span>
          </div>
          <iframe
            src={demo}
            title={`${p.name} live preview`}
            className="w-full h-[520px] block bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        </div>
      )}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2">{t("projects.stack")}</div>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((tech) => (
            <span key={tech} className="chip-tag-light">{tech}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-200">
        <a href={p.repo} target="_blank" rel="noreferrer" className="chip-light">
          <Github className="w-3.5 h-3.5" /> {t("projects.viewGithub")}
        </a>
        {demo && !demoId && (
          <a href={demo} target="_blank" rel="noreferrer" className="chip-light">
            <ExternalLink className="w-3.5 h-3.5" /> {t("projects.watchDemo")}
          </a>
        )}
      </div>
    </div>
  );
}

export function ConnectWindow() {
  const t = useT();
  const rows = [
    { icon: Mail, label: t("contact.email"), value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: t("contact.phone"), value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: t("contact.linkedin"), value: "ahmad-haji", href: PROFILE.linkedin },
    { icon: Github, label: t("contact.github"), value: "Ahmadhaji-hub", href: PROFILE.github },
    { icon: MapPin, label: t("contact.location"), value: PROFILE.location, href: null },
  ];
  return (
    <div className="p-6 space-y-2 text-zinc-900">
      <h2 className="text-2xl font-bold tracking-tight px-2 pb-2">{t("contact.title")}</h2>
      {rows.map((r) => (
        <a
          key={r.label}
          href={r.href || undefined}
          target={r.href?.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 transition-colors border border-transparent hover:border-zinc-200"
        >
          <div className="w-9 h-9 rounded-md grid place-items-center bg-zinc-100 text-zinc-700">
            <r.icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{r.label}</div>
            <div className="text-sm text-zinc-900">{r.value}</div>
          </div>
        </a>
      ))}
      <a
        href={ASSETS.cv}
        download
        className="chip-light w-full justify-center mt-4"
      >
        <Download className="w-3.5 h-3.5" /> {t("contact.cv")}
      </a>
      <a
        href={PROFILE.calendar}
        target="_blank"
        rel="noreferrer"
        className="chip-light w-full justify-center"
      >
        <ExternalLink className="w-3.5 h-3.5" /> {t("contact.book")}
      </a>
    </div>
  );
}