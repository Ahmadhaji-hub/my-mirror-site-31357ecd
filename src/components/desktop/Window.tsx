import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { type ReactNode } from "react";

interface WindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  initial?: { x: number; y: number };
  width?: number;
  height?: number;
  z: number;
  onFocus: () => void;
  onClose: () => void;
  accent?: string;
}

export function Win({
  title,
  children,
  initial,
  width = 520,
  height = 420,
  z,
  onFocus,
  onClose,
}: WindowProps) {
  const controls = useDragControls();

  // Center the window on screen by default
  const cx =
    typeof window !== "undefined" ? Math.max(20, (window.innerWidth - width) / 2) : 200;
  const cy =
    typeof window !== "undefined" ? Math.max(40, (window.innerHeight - height) / 2 - 20) : 100;
  const startX = initial?.x ?? cx;
  const startY = initial?.y ?? cy;

  return (
    <motion.div
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.94, x: startX, y: startY }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onFocus();
      }}
      style={{
        width,
        height,
        zIndex: z,
        background: "#FBF8EE",
      }}
      className="absolute rounded-xl border border-black/10 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
    >
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
          controls.start(e);
        }}
        className="relative flex items-center px-3 h-10 border-b border-black/10 bg-[#FBF8EE] cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 grid place-items-center group"
            aria-label="Close"
          >
            <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e]" aria-label="Minimize">
            <Minus className="w-2 h-2 text-black/50 opacity-0" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#28c840]" aria-label="Zoom">
            <Square className="w-2 h-2 text-black/50 opacity-0" />
          </button>
        </div>
        <div className="absolute inset-x-0 text-center text-[13px] font-medium text-zinc-700 pointer-events-none">
          {title}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scroll-light text-zinc-900">{children}</div>
    </motion.div>
  );
}