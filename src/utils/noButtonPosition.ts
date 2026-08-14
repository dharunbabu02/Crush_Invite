export interface Position {
  xPercent: number;
  yPercent: number;
}

const X_RANGE: [number, number] = [15, 85];
const Y_RANGE: [number, number] = [14, 86];
const CENTER: Position = { xPercent: 50, yPercent: 50 };
const CENTER_KEEPOUT_RADIUS = 26;
const MIN_JUMP_DISTANCE = 24;
const MAX_TRIES = 20;

function randomInRange([min, max]: [number, number]): number {
  return min + Math.random() * (max - min);
}

function distance(a: Position, b: Position): number {
  return Math.hypot(a.xPercent - b.xPercent, a.yPercent - b.yPercent);
}

/**
 * Picks a new bounded position for the No button (as percentages of its
 * relative container) that stays clear of the centered Yes button and is
 * far enough from the previous spot to feel like a real dodge.
 */
export function getNextNoPosition(previous: Position | null): Position {
  let candidate: Position = CENTER;

  for (let tries = 0; tries < MAX_TRIES; tries++) {
    candidate = {
      xPercent: randomInRange(X_RANGE),
      yPercent: randomInRange(Y_RANGE),
    };

    const clearOfCenter = distance(candidate, CENTER) >= CENTER_KEEPOUT_RADIUS;
    const farFromPrevious =
      previous === null || distance(candidate, previous) >= MIN_JUMP_DISTANCE;

    if (clearOfCenter && farFromPrevious) {
      return candidate;
    }
  }

  return candidate;
}
