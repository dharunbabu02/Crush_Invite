import { useMemo } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/invitationMessages";

const CONFETTI_COLORS = [
  "#f43f5e",
  "#fb7185",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#c084fc",
];
const HEART_EMOJIS = ["❤️", "💖", "💕", "✨"];

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  size: number;
}

interface HeartPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

function useConfetti(count: number): ConfettiPiece[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.4 + Math.random() * 1.6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
      })),
    [count],
  );
}

function useHearts(count: number): HeartPiece[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        duration: 3 + Math.random() * 2,
        emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      })),
    [count],
  );
}

export default function Celebration() {
  const confetti = useConfetti(28);
  const hearts = useHearts(10);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/90 px-6 py-10 text-center shadow-2xl shadow-pink-200/50 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: 440, opacity: 0, rotate: c.rotate }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 0.4,
              backgroundColor: c.color,
            }}
            className="absolute top-0 rounded-sm"
          />
        ))}
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -440, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: `${h.left}%` }}
            className="absolute bottom-0 text-xl"
          >
            {h.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        className="relative z-10 mb-4 text-6xl"
      >
        🎉
      </motion.div>

      <h2 className="relative z-10 mb-1 text-3xl font-extrabold text-slate-800">
        YAYYY! ❤️
      </h2>
      <p className="relative z-10 mb-4 text-xl font-semibold text-pink-600">
        {EVENT.destination} it is! 🎢
      </p>

      <span className="relative z-10 mb-4 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
        {EVENT.date} · {EVENT.city}
      </span>

      <p className="relative z-10 text-slate-500">
        See you on {EVENT.date}! Can't wait! 😄
      </p>
    </motion.div>
  );
}
