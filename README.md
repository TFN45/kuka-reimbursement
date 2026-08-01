# KUKA OS

**A personal work-management PWA for field engineers — expense reimbursement, overtime tracking, tasks, notes, and a unified calendar overview, all running offline on your phone.**

Built for automation & robotics field engineers who move between customer sites and need one place to track expenses, log overtime, plan work, and keep technical notes — without depending on a server or losing data to a spotty connection.

🔗 **Live app:** [tfn45.github.io/kuka-reimbursement](https://tfn45.github.io/kuka-reimbursement/)

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Getting started](#getting-started)
- [Data & privacy](#data--privacy)
- [Backup & restore](#backup--restore)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Browser support](#browser-support)
- [Known limitations](#known-limitations)
- [License](#license)

---

## Overview

KUKA OS is a single-file Progressive Web App (PWA) — no build step, no backend, no account. Install it to your phone's home screen and it runs like a native app, fully offline, with all data stored locally on the device.

It started as an expense reimbursement form and grew into five connected modules, all sharing one customer/site database so you never re-type a company name twice:

| Module | Purpose |
|---|---|
| 📅 **Overview** | Home screen — a calendar aggregating every Expense, OT, Task, and Note by date, plus a quick-add button |
| 💰 **Expense** | Itemized reimbursement claims with receipt photos, exported as a formal bilingual PDF |
| 🕐 **Overtime (OT)** | Check-in/out based OT logging with configurable pay rates, exported as a company-matching OT approval form |
| 📋 **Tasks** | Jobs and to-dos tied to a customer site and due date |
| 📝 **Notes** | Technical notes per site, with photo attachments |

## Features

### 📅 Overview / Calendar
- Month-grid calendar with today highlighted and a colored dot per module for any day with activity
- Configurable **work week** (tick which weekdays you work) — non-working days and imported public holidays are shown in red
- Tap any day to see everything that happened on it in one popup
- Floating **+** button for quick-adding an Expense, OT entry, Task, or Note from anywhere

### 💰 Expense Reimbursement
- Per-item company/province picker backed by a searchable, reusable site database
- Attach multiple receipt photos per line item, stored at original quality
- Link one receipt across several items (e.g. a single toll statement covering many days)
- Draft → Submitted → Approved → Paid status tracking, with search and filtering
- Formal bilingual PDF export with auto-fitting text, repeating table headers, and receipt appendices
- Mileage calculator (distance × rate)
- CSV export and month-over-month spending summary

### 🕐 Overtime (OT)
- Check-in/check-out based logging with day types: Normal, Callback/After-Hours, Weekly Holiday, Public Holiday, and a custom multiplier
- Auto-calculates OT hours from configurable standard hours and break time
- Automatically splits a shift that crosses midnight into two correctly-dated entries, with a configurable after-midnight rate (separate weekday / holiday multipliers)
- Optional pay estimate based on a monthly salary (30-day basis) — shown in-app only, never on the exported form
- Exports a bilingual OT approval form matching a standard Thai company template, with signature
- Public holidays can be imported from a `.ics` calendar file (e.g. Google's "Holidays in Thailand") or added manually, and surface as a warning (not an auto-selection) when logging OT on that date

### 📋 Tasks & 📝 Notes
- Tasks: title, site, due date, and status (Not Started / In Progress / Done), filterable by status
- Notes: freeform technical notes per site with multi-photo attachments, full-text search

### ⚙️ Settings
- Employee & approval contact details, saved signature (draw once, reused on every export)
- OT calculation settings: standard hours, break time, after-midnight rates, base salary
- Work week and public holiday management
- Dark mode (true-black, OLED-optimized)
- Storage usage indicator and full JSON backup/restore

## Getting started

1. Open the [live app](https://tfn45.github.io/kuka-reimbursement/) on your phone.
2. Add it to your home screen (Chrome/Edge on Android: menu → **Add to Home Screen**; Safari on iOS: share → **Add to Home Screen**).
3. Open it from the home screen icon — it now runs standalone, offline-capable.
4. Fill in your details under **Settings** first (name, employee ID, approving manager, signature).

No sign-up, no server, nothing to configure beyond your own details.

## Data & privacy

- All data is stored **locally on your device** using IndexedDB (falls back to browser storage on unsupported browsers).
- Nothing is uploaded anywhere. There is no backend and no analytics.
- Receipts and note photos are stored at original quality where the browser supports it.
- Uninstalling the app or clearing site data removes everything — back up regularly (see below).

## Backup & restore

**Settings → Data Backup** exports a single `.json` file per year containing that year's Expense and OT records, plus your full Tasks, Notes, holidays, and profile — including all photos as embedded data.

Restoring is a **safe merge**: it only adds months/tasks/notes that don't already exist on the device and never overwrites existing data. Import the same file twice and nothing is duplicated.

## Tech stack

- Vanilla HTML/CSS/JavaScript — no framework, no build step, no dependencies
- IndexedDB for storage, with a graduated fallback chain for older browsers
- Service worker (`sw.js`) for offline caching, network-first for the app shell
- `window.print()` + print-specific CSS for PDF generation (no PDF library)
- Installable as a PWA via `manifest.json`

## Project structure

```
├── index.html      # The entire application — markup, styles, and logic
├── sw.js           # Service worker: offline caching strategy
├── manifest.json   # PWA manifest: icons, name, install shortcuts
├── icon-192.png    # App icon (192×192)
└── icon-512.png    # App icon (512×512)
```

Everything lives in `index.html` by design — the app has no build step, so what you edit is exactly what runs.

## Browser support

Built and tested for **Chrome/Edge on Android**. Uses standard, broadly-supported web APIs (IndexedDB, Service Worker, `<input type="file">` with camera capture, `window.print()`), so it should work on any modern Chromium or Safari-based mobile browser, though the PDF export layout is tuned for mobile Chrome's print-to-PDF behavior.

## Known limitations

- No cloud sync — data lives on one device unless backed up and restored manually elsewhere.
- OT rate calculations are a configurable *estimate*; always verify results against your company's actual OT policy before submitting.
- Public holiday import requires manually exporting an `.ics` file from Google Calendar (or another calendar app) — there's no live calendar sync, since a browser-only PWA can't call Google's API without a backend.

## License

Personal-use project. No license file included — treat as all-rights-reserved unless the repository owner specifies otherwise.
