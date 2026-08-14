import { AnimatePresence, motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import { EVENT, getNoButtonLabel, type NoAttemptStage } from "../data/invitationMessages";
import type { Position } from "../utils/noButtonPosition";

interface InvitationCardProps {
  stage: NoAttemptStage;
  noAttempts: number;
  noPosition: Position | null;
  onYes: () => void;
  onNoAttempt: () => void;
}

export default function InvitationCard({
  stage,
  noAttempts,
  noPosition,
  onYes,
  onNoAttempt,
}: InvitationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md rounded-3xl border border-white/60 bg-white/90 px-6 py-8 text-center shadow-2xl shadow-pink-200/50 backdrop-blur sm:px-10 sm:py-10"
    >
      <span className="mb-4 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
        {EVENT.date} · {EVENT.city}
      </span>

      <h1 className="mb-2 text-2xl font-bold text-slate-800 sm:text-3xl">
        Hi liki mama, Are you coming to {EVENT.destination} with me or not?
      </h1>
      <p className="mb-6 text-slate-500">
        I have a very important question for you...
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={noAttempts}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            key={`emoji-${noAttempts}`}
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className="mb-2 text-5xl"
          >
            {stage.emoji}
          </motion.div>
          <p
            className="mb-8 text-lg font-medium text-slate-700"
            aria-live="polite"
          >
            {stage.message}
          </p>
        </motion.div>
      </AnimatePresence>

      <ActionButtons
        yesScale={stage.yesScale}
        noAttempts={noAttempts}
        noLabel={getNoButtonLabel(noAttempts)}
        noPosition={noPosition}
        onYes={onYes}
        onNoAttempt={onNoAttempt}
      />
    </motion.div>
  );
}
