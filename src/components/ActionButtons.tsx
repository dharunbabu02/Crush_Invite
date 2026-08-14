import { motion } from "framer-motion";
import type { Position } from "../utils/noButtonPosition";

interface ActionButtonsProps {
  yesScale: number;
  noAttempts: number;
  noLabel: string;
  noPosition: Position | null;
  onYes: () => void;
  onNoAttempt: () => void;
}

export default function ActionButtons({
  yesScale,
  noAttempts,
  noLabel,
  noPosition,
  onYes,
  onNoAttempt,
}: ActionButtonsProps) {
  const isDodging = noAttempts > 0 && noPosition !== null;

  return (
    <div className="relative flex min-h-44 items-center justify-center gap-4 sm:min-h-40">
      <motion.button
        type="button"
        onClick={onYes}
        animate={{ scale: yesScale }}
        whileHover={{ scale: yesScale * 1.05 }}
        whileTap={{ scale: yesScale * 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative z-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-pink-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        YES ❤️
      </motion.button>

      {!isDodging && (
        <motion.button
          type="button"
          onClick={onNoAttempt}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-slate-200 bg-white px-8 py-3 text-lg font-bold text-slate-500 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          {noLabel}
        </motion.button>
      )}

      {isDodging && noPosition && (
        <motion.button
          type="button"
          onClick={onNoAttempt}
          initial={{
            left: `${noPosition.xPercent}%`,
            top: `${noPosition.yPercent}%`,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            left: `${noPosition.xPercent}%`,
            top: `${noPosition.yPercent}%`,
            scale: 1,
            opacity: 1,
            rotate: [0, -8, 8, -4, 0],
          }}
          transition={{
            left: { type: "spring", stiffness: 260, damping: 22 },
            top: { type: "spring", stiffness: 260, damping: 22 },
            scale: { type: "spring", stiffness: 300, damping: 18 },
            rotate: { duration: 0.5 },
          }}
          style={{
            position: "absolute",
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-base font-bold text-slate-500 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          aria-label={`No, attempt ${noAttempts + 1}. Careful, it moves!`}
        >
          {noLabel}
        </motion.button>
      )}
    </div>
  );
}
