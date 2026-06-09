import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScatterCardProps {
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  rotate?: number;
  delay?: number;
  onOpen: () => void;
  children: ReactNode;
  tone?: "default" | "red" | "green" | "amber" | "cream" | "none";
}

const TONES: Record<string, string> = {
  none: "",
  default: "bg-zinc-900/60",
  red: "bg-rose-500/40",
  green: "bg-emerald-500/30",
  amber: "bg-amber-200/15",
  cream: "bg-amber-50/85",
};

export function ScatterCard({
  label,
  sub,
  x,
  y,
  w = 180,
  h = 130,
  rotate = 0,
  delay = 0,
  onOpen,
  children,
  tone = "default",
}: ScatterCardProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.06}
      initial={{ opacity: 0, scale: 0.8, x, y, rotate }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 22 }}
      whileHover={{ scale: 1.04, rotate: rotate * 0.3, zIndex: 30 }}
      whileDrag={{ scale: 1.05, zIndex: 40, rotate: 0 }}
      onDoubleClick={onOpen}
      onTap={onOpen}
      onMouseDown={(e) => e.stopPropagation()}
      style={{ width: w }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
    >
      <div
        style={{ height: h }}
        className={`relative rounded-md overflow-hidden ring-1 ring-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] ${TONES[tone]}`}
      >
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="relative w-full h-full text-white/85">{children}</div>
      </div>
      <div className="mt-2 text-center text-[12px] font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        {label}
      </div>
      {sub && (
        <div className="text-center text-[10px] text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {sub}
        </div>
      )}
    </motion.div>
  );
}