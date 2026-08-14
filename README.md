# Wonderla Invite 🎢

A small, playful interactive invitation page. It asks one question, has a
teasing "No" button that dodges every attempt, and ends in a confetti
celebration when "Yes" is clicked. Built as a static site — no backend, no
database, no accounts.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Framer Motion](https://motion.dev/) — animations
- GitHub Actions + GitHub Pages — hosting

## Local setup

Requires [Node.js](https://nodejs.org/) 20+.

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Type-check + production build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to the `main` branch (or run the workflow manually from the
   **Actions** tab). `.github/workflows/deploy.yml` builds the app and
   publishes `dist/` to GitHub Pages automatically.
4. Your site will be live at:

   ```text
   https://<your-github-username>.github.io/<repo-name>/
   ```

### About the Vite `base` path

GitHub Pages serves project sites from a subpath (`/<repo-name>/`), so Vite's
`base` config needs to match your repo name or asset URLs will 404.

This project handles it automatically: `vite.config.ts` reads a
`VITE_BASE_PATH` environment variable, and the deploy workflow sets it to
`/${{ github.event.repository.name }}/` at build time — so it always matches
whatever you name the repo, with nothing to edit.

Two cases where you *do* need to change something:

- **Deploying to the root of a custom domain, or to a
  `<username>.github.io` "user site" repo**: these are served from `/`, not
  a subpath. Edit `.github/workflows/deploy.yml` and change the `VITE_BASE_PATH`
  line to:
  ```yaml
  VITE_BASE_PATH: /
  ```
- **Building locally and want the output to match production paths**
  (e.g. to test with `npm run preview`): set the same env var yourself
  before building:
  ```bash
  # macOS/Linux
  VITE_BASE_PATH=/your-repo-name/ npm run build

  # Windows PowerShell
  $env:VITE_BASE_PATH="/your-repo-name/"; npm run build
  ```
  A plain `npm run build` without the variable set defaults to `/`, which is
  fine for local preview but wrong for a GitHub Pages project site.

## Customizing

Everything content-related lives in `src/data/invitationMessages.ts`.

### Change the destination, date, or city

Edit the `EVENT` object:

```ts
export const EVENT = {
  destination: "Wonderla",
  city: "Chennai",
  date: "21 August",
} as const;
```

These values are used throughout the headline, date badge, and celebration
screen.

### Change the No-attempt messages, emoji, or Yes-button growth

Edit the `STAGES` array in the same file. Each entry is shown once the user
has clicked "No" that many times (the last entry repeats for every attempt
beyond it):

```ts
const STAGES: NoAttemptStage[] = [
  { message: "Wanna go on a fun adventure with me? 🎢", emoji: "🥺", yesScale: 1 },
  // ...add or edit stages here
];
```

`yesScale` controls how large the Yes button grows (`1` = normal size).

### Change the No button's label per attempt

Edit the `NO_BUTTON_LABELS` array in `src/data/invitationMessages.ts`.

### Change the celebration message or GIF

`src/components/Celebration.tsx` holds the success screen. The confetti and
floating hearts are drawn with CSS/Framer Motion (no external GIF), which
keeps it fast and avoids depending on a third-party host. To use an actual
GIF instead, replace the confetti `<motion.span>` block with an `<img>` tag
pointing at a GIF placed in `src/assets/` (imported like any other asset) or
at a public URL.

### Change the colors

Colors are set with Tailwind utility classes directly in the components
(`src/components/*.tsx`) — mostly `rose`/`pink`/`sky` shades in gradients,
backgrounds, and text. Swap the color names (e.g. `rose-500` → `purple-500`)
to restyle. See the [Tailwind color palette](https://tailwindcss.com/docs/colors)
for available options.

### Change how the No button moves

Movement bounds and dodge behavior live in `src/utils/noButtonPosition.ts`
(`X_RANGE`, `Y_RANGE`, keep-out radius around the Yes button, and minimum
jump distance between attempts).

## Project structure

```text
src/
├── components/
│   ├── InvitationCard.tsx   # question, dynamic message/emoji, action buttons
│   ├── ActionButtons.tsx    # Yes/No buttons, dodge + growth animation
│   └── Celebration.tsx      # success screen with confetti/hearts
├── data/
│   └── invitationMessages.ts # event info, message/emoji/scale progression
├── utils/
│   └── noButtonPosition.ts  # bounded random position logic for the No button
├── App.tsx                  # top-level state (attempts, position, accepted)
├── main.tsx
└── index.css
```
