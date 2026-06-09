import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
} from "lucide-react";

type Track = {
  title: string;
  artist: string;
  src: string;
};

const TRACKS: Track[] = [
  {
    title: "Let It Be",
    artist: "Music Travel Love & Friends",
    src: `${import.meta.env.BASE_URL}music/Let It Be.mp3`,
  },
  {
    title: "Left Me the Blues",
    artist: "Music Travel Love & Friends",
    src: `${import.meta.env.BASE_URL}music/Left Me the Blues.mp3`,
  },
  {
    title: "Les Derobades",
    artist: "Instrumental",
    src: `${import.meta.env.BASE_URL}music/Les Derobades.mp3`,
  },
];

export function MusicBar() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);

  const track = TRACKS[idx];

  const BARS = 14;
  const barHeights = [
    0.4, 0.7, 0.55, 0.9, 0.5, 0.75, 0.95,
    0.45, 0.8, 0.6, 0.85, 0.5, 0.7, 0.4,
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.src;

    if (playing) {
      audio.play().catch(() => {});
    }
  }, [idx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIdx((i) => (i + 1) % TRACKS.length);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
  const startMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  window.addEventListener("pointerdown", startMusic, { once: true });

  return () => {
    window.removeEventListener("pointerdown", startMusic);
  };
}, []);
  const toggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {}
    }
  };

  const next = () => {
    setIdx((i) => (i + 1) % TRACKS.length);
  };

  const prev = () => {
    setIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute top-10 left-1/2 -translate-x-1/2 z-30"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <audio ref={audioRef} preload="auto" />

      <div
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          bg-black/30
          backdrop-blur-3xl
          border border-white/10
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          text-white
        "
      >
        <button
          onClick={prev}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <SkipBack className="w-3 h-3" />
        </button>

        <button
          onClick={toggle}
          title={playing ? "Pause" : "Play"}
          className="flex items-end gap-[2px] h-5 px-1"
        >
          {Array.from({ length: BARS }).map((_, i) => {
            const peak = barHeights[i % barHeights.length];

            return (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-gradient-to-t from-fuchsia-400 to-rose-300"
                animate={
                  playing
                    ? {
                        height: [
                          `${peak * 30}%`,
                          `${peak * 100}%`,
                          `${peak * 45}%`,
                        ],
                      }
                    : { height: "20%" }
                }
                transition={
                  playing
                    ? {
                        duration: 0.6 + (i % 5) * 0.12,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: (i % 7) * 0.05,
                      }
                    : { duration: 0.3 }
                }
                style={{ height: "20%" }}
              />
            );
          })}

          <span className="ml-1">
            {playing ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </span>
        </button>

        <button
          onClick={next}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          <SkipForward className="w-3 h-3" />
        </button>

        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-white/10 transition"
        >
          {muted ? (
            <VolumeX className="w-3 h-3" />
          ) : (
            <Volume2 className="w-3 h-3" />
          )}
        </button>

        <div className="text-[10px] text-white/80 max-w-[140px] truncate">
          {track.title}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-1 rounded-full hover:bg-white/10 transition"
          >
            <ListMusic className="w-3 h-3" />
          </button>

          {open && (
            <div className="absolute top-full mt-2 right-0 w-52 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2">
              {TRACKS.map((t, i) => (
                <button
                  key={t.src}
                  onClick={() => {
                    setIdx(i);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-2 py-2 rounded-lg text-xs transition ${
                    i === idx
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-[10px] opacity-60">
                    {t.artist}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
