# BlerionOS

BlerionOS is Blerion Statovci’s interactive software developer portfolio, presented as a small personal operating system. The desktop shell turns the portfolio into a discoverable workspace while keeping the important hiring paths—projects, skills, experience, resume and contact—direct.

## Features

- Responsive desktop/mobile OS shell with lock screen, status bar, dock and desktop widgets.
- Draggable, constrained, focusable, maximizable and snap-enabled application windows.
- Dark/light themes, wallpapers, brightness, clock format, reduced motion and persisted settings.
- Projects file manager with data-derived technology filters and case-study-ready project fields.
- Terminal with history, autocomplete, plain-text output, hiring commands and resume/contact actions.
- Experience, skills, certificates, settings, resume and contact apps.
- Contact form using FormSubmit, validation, honeypot protection, loading state, email actions and toasts.
- English/Albanian language setting stored with the rest of the OS preferences.
- Lazy-loaded apps with a skeleton fallback and pure-logic tests.
- SEO metadata, JSON-LD Person data, robots/sitemap, favicon and custom 404 page.

## Stack

React, TypeScript, Vite, Framer Motion, Lucide React, Vitest and Oxlint.

## Scripts

```bash
npm install       # install dependencies
npm run dev       # start the local Vite server
npm run lint      # run Oxlint
npm run build     # type-check and create a production build
npm run test      # run Vitest once
```

## Folder structure

```text
src/
  apps/            Lazy-loaded OS applications
  components/      Desktop shell, windows, widgets and shared UI
  data/            Profile, apps, projects, skills, training and certificates
  hooks/           Clock, local storage and window manager hooks
  i18n/            EN/SQ dictionary
  styles/          Layered visual and responsive styles
  types/           Shared TypeScript models
  utils/           Calendar, timezone, search and terminal logic
public/            CV, wallpaper, favicon, SEO files and 404 page
```

## Screenshots / demo

<!-- TODO(owner): add current desktop and mobile screenshots or a GIF demo here. -->

- Desktop screenshot: `docs/screenshots/desktop.png`
- Mobile screenshot: `docs/screenshots/mobile.png`
- GIF demo: `docs/demo.gif`

## Roadmap

- Fill verified project case-study content and repository links.
- Add verified certificate dates and credential URLs.
- Replace SEO domain and social preview placeholders before deployment.
- Measure Lighthouse on the deployed production URL and tune based on evidence.

## Deployment notes

The optional analytics loader does nothing unless `VITE_ANALYTICS_DOMAIN` is set. If it is set, the app loads a Plausible-compatible script from that domain. No analytics request is made by default.
