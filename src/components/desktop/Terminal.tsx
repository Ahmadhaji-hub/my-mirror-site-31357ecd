import { useEffect, useRef, useState } from "react";
import { PROFILE, EXPERIENCE, SKILLS } from "./data";

type Line = { type: "in" | "out"; text: string };

const HELP = `Available commands:
  help        Show this help
  whoami      About me
  skills      List of skills
  experience  Career timeline
  contact     Email, phone, links
  cv          Download CV
  socials     GitHub & LinkedIn
  date        Current date/time
  clear       Clear the screen`;

function run(cmd: string): string | null {
  const c = cmd.trim().toLowerCase();
  if (!c) return "";
  switch (c) {
    case "help":
      return HELP;
    case "whoami":
      return `${PROFILE.name} — ${PROFILE.role}\n${PROFILE.location}\n\n${PROFILE.bio}`;
    case "skills":
      return SKILLS.map((s) => `▸ ${s.group}\n   ${s.items.join(" · ")}`).join("\n\n");
    case "experience":
      return EXPERIENCE.map(
        (e) => `${e.period}  ${e.role}\n  ${e.company} — ${e.location}`
      ).join("\n\n");
    case "contact":
      return `Email     ${PROFILE.email}\nPhone     ${PROFILE.phone}\nLocation  ${PROFILE.location}`;
    case "socials":
      return `GitHub    ${PROFILE.github}\nLinkedIn  ${PROFILE.linkedin}`;
    case "cv":
      if (typeof window !== "undefined") window.open("/Ahmad_Haji_CV.pdf", "_blank");
      return "Opening CV…";
    case "date":
      return new Date().toString();
    case "clear":
      return null;
    default:
      return `zsh: command not found: ${cmd}\nType 'help' for available commands.`;
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Last login: " + new Date().toLocaleString() + " on ttys001" },
    { type: "out", text: "Welcome — type 'help' to get started.\n" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const cmd = input;
    const out = run(cmd);
    if (out === null) {
      setLines([]);
    } else {
      setLines((l) => [...l, { type: "in", text: cmd }, ...(out ? [{ type: "out" as const, text: out }] : [])]);
    }
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    setHIdx(-1);
    setInput("");
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-black/60 text-[13px] leading-relaxed font-mono p-4 cursor-text"
      ref={scrollRef}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l.type === "in" ? (
            <div>
              <span className="text-emerald-400">ahmad@geneva</span>
              <span className="text-white/40"> ~ </span>
              <span className="text-sky-400">$ </span>
              <span>{l.text}</span>
            </div>
          ) : (
            <div className="text-white/80">{l.text}</div>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-emerald-400">ahmad@geneva</span>
        <span className="text-white/40">&nbsp;~&nbsp;</span>
        <span className="text-sky-400">$&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!history.length) return;
              const ni = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
              setHIdx(ni);
              setInput(history[ni]);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              if (hIdx === -1) return;
              const ni = hIdx + 1;
              if (ni >= history.length) {
                setHIdx(-1);
                setInput("");
              } else {
                setHIdx(ni);
                setInput(history[ni]);
              }
            }
          }}
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-white caret-emerald-400"
        />
      </div>
    </div>
  );
}