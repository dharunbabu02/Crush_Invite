export const EVENT = {
  destination: "Wonderla",
  city: "Chennai",
  date: "21 August",
} as const;

export interface NoAttemptStage {
  message: string;
  emoji: string;
  /** Scale multiplier applied to the Yes button at this stage. */
  yesScale: number;
}

/**
 * Ordered by attempt count. The last entry repeats for every attempt
 * beyond its index (see getStage below).
 */
const STAGES: NoAttemptStage[] = [
  {
    message: "Wanna go on a fun adventure with me? 🎢",
    emoji: "🥺",
    yesScale: 1,
  },
  {
    message: "Are you sure? 😭",
    emoji: "🥹",
    yesScale: 1.08,
  },
  {
    message: "Really? Think about the roller coasters! 🎢",
    emoji: "😭",
    yesScale: 1.16,
  },
  {
    message: "You're making me work for this... 🥲",
    emoji: "🥲",
    yesScale: 1.25,
  },
  {
    message: "Okay... but why are you running away from the No button? 😂",
    emoji: "😂",
    yesScale: 1.35,
  },
  {
    message: "At this point, I think you know the answer... 😏",
    emoji: "😏",
    yesScale: 1.45,
  },
];

export function getStage(noAttempts: number): NoAttemptStage {
  const index = Math.min(noAttempts, STAGES.length - 1);
  return STAGES[index];
}

const NO_BUTTON_LABELS = [
  "No 😭",
  "No, really 😭",
  "Nope 🙅",
  "Still no? 🥲",
  "Nuh-uh 😅",
  "Try again 😏",
];

export function getNoButtonLabel(noAttempts: number): string {
  const index = Math.min(noAttempts, NO_BUTTON_LABELS.length - 1);
  return NO_BUTTON_LABELS[index];
}
