# KUKA OS

**A personal work-management PWA for field automation & robotics engineers — smart expense reimbursement with AI Vision, overtime tracking, timesheet generation, task management, site notes, and a unified calendar overview running 100% client-side.**

Built specifically for robotics and automation field engineers who move between customer plants and need a fast, dependable tool to record expenses, track overtime hours, plan field jobs, and document technical findings — without relying on a backend server or risking data loss from poor factory connectivity.

🔗 **Live app:** [tfn45.github.io/kuka-reimbursement](https://tfn45.github.io/kuka-reimbursement/)

---

## Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [📅 Overview & Calendar](#-overview--calendar)
  - [💰 Expense Reimbursement & AI Receipt Scanner](#-expense-reimbursement--ai-receipt-scanner)
  - [🕐 Overtime (OT) & Timesheet Generator](#-overtime-ot--timesheet-generator)
  - [📋 Tasks & 📝 Technical Site Notes](#-tasks---technical-site-notes)
  - [✨ Domain-Aware AI Assistant (Gemini Flash)](#-domain-aware-ai-assistant-gemini-flash)
- [Getting Started](#getting-started)
- [Data Privacy & Security](#data-privacy--security)
- [Backup & Disaster Recovery](#backup--disaster-recovery)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Browser Support](#browser-support)
- [License](#license)

---

## Overview

KUKA OS is a zero-dependency, single-file Progressive Web App (PWA). It requires no build step, no backend server, and no cloud account. Install it directly from the browser to run standalone with persistent local storage.

All modules share a unified customer/site database so you never have to re-type company names or provinces twice:

| Module | Purpose |
|---|---|
| 📅 **Overview** | Home screen — Month & Week agenda views aggregating Expense, OT, Task, and Note items with quick-action shortcuts |
| 💰 **Expense** | Smart reimbursement tracking with **Gemini Multimodal AI Vision** receipt reading and formal PDF export |
| 🕐 **Overtime (OT)** | Check-in/out OT logger with after-midnight rate splitting, **OT Approval Form**, and **Weekly Timesheet Form** exports |
| 📋 **Tasks** | Site-linked job schedule with date range tracking and status filtering |
| 📝 **Notes** | Field engineering service logs with multi-photo attachments and AI report polishing |
| ⚙️ **Settings** | Personal profile, digital signature pad, custom work week, holiday imports, AI configuration, and backup vaults |

---

## Key Features

### 📅 Overview & Calendar
- **Interactive Calendar & Agenda Views:** Switch between a full Month Grid and a 6-month continuous Week Agenda.
- **Custom Work Week & Holiday Highlighting:** Configurable work week with imported public holidays highlighted in red.
- **Floating Quick-Add (FAB):** Rapidly log an Expense, OT shift, Task, or Note from anywhere.
- **Live Header Clock:** Real-time digital clock display in the top bar.

### 💰 Expense Reimbursement & AI Receipt Scanner
- **✨ Gemini Multimodal Vision Scanner:** Auto-extracts transaction dates (automatically converting Thai Buddhist Era พ.ศ. to Gregorian ค.ศ.) and grand total amounts directly into input fields.
- **Local OCR Fallback:** On-device Tesseract OCR engine suggests totals when offline or without an API key.
- **Smart Photo Sharing (Web Share Target):** Share receipt photos directly from your phone’s camera or gallery app into KUKA OS.
- **Statement Multi-Linking:** Link one bulk invoice/statement across multiple individual line items without duplicating image storage.
- **Mileage Calculator:** Quick calculation mode for distance-based claims (km × rate).
- **Formal Corporate PDF Export:** Generates formal English reimbursement reports with embedded signature, repeating headers, and high-res receipt appendix pages.

### 🕐 Overtime (OT) & Timesheet Generator
- **Automatic Shift & Midnight Splitting:** Overnight shifts crossing midnight are automatically split into two correctly-dated entries with dedicated after-midnight multiplier rates.
- **Duplicate Date Guard:** Warns and prompts to edit if an OT entry already exists on the selected date.
- **Dual Formal Document Exports:**
  1. **OT Approval Form (เอกสารขออนุมัติค่าล่วงเวลา):** Standard bilingual form grouping 1×, 1.5×, 3×, and custom multipliers.
  2. **Timesheet Form (ใบลงเวลาทำงาน):** Full monthly attendance log organized in weekly grid blocks, showing daily check-in/out times, non-working days, and public holidays.
- **Estimated OT Pay:** In-app real-time pay projection based on base salary (displayed in-app only; excluded from official PDF submissions).

### 📋 Tasks & 📝 Technical Site Notes
- **Tasks & Schedule:** Track job progress (Not Started / In Progress / Done) with full date range support across customer sites.
- **Field Service Notes:** Capture on-site findings with multi-photo attachments and instant full-text search.
- **Working Abroad Mode:** Toggle on any form to freely input international cities and countries outside Thailand.

### ✨ Domain-Aware AI Assistant (Gemini Flash)
- Integrated with **Google Gemini 3.5 Flash** for low-latency, zero-cost text and vision processing.
- **Context-Aware Engineering Polish:** Converts casual Thai, shorthand, or broken English into formal corporate English tailored for KUKA robotics and automation systems (preserving technical terms like *smartPAD, KRC4/KRC5, KRL, WorkVisual, mastering/EMD, resolver, PLC handshakes,* and *FOV vision calibration*).
- **Strict Semantic Accuracy:** Strict prompt guardrails ensure the AI never invents false diagnoses, phantom root causes, or unverified test results.

---

## Getting Started

1. Open the [Live App](https://tfn45.github.io/kuka-reimbursement/) in your mobile browser (Chrome/Edge on Android, Safari on iOS).
2. Add to Home Screen:
   - **Android:** Tap `⋮` (Menu) → **Install App** or **Add to Home Screen**.
   - **iOS:** Tap `Share` → **Add to Home Screen**.
3. Launch the app from your home screen icon.
4. Navigate to **Settings** to set up:
   - Employee details, position, and manager approval info.
   - Draw your digital signature (saved for all future PDF exports).
   - *(Optional)* Add your **Google Gemini API Key** (Free Tier from [Google AI Studio](https://aistudio.google.com/)) to enable AI Vision receipt scanning and English polishing.

---

## Data Privacy & Security

- **100% Client-Side Storage:** All database entries, receipts, and photos are stored inside your device's `IndexedDB`. No personal data is sent to any private backend server.
- **API Key Isolation:** Your Gemini API Key is stored strictly in local device storage and is **never included in backup files or CSV exports**.
- **External Network Calls:** API calls are made directly and exclusively from your device to official Google endpoints (`generativelanguage.googleapis.com`) only when you tap AI actions or attach receipts.

---

## Backup & Disaster Recovery

- **📸 Auto Backup Snapshots:** Internal rolling snapshots (with segment checksum verification) are saved automatically into a dedicated IndexedDB store every N days, with one-tap restore.
- **⬇ Year-Based JSON Export:** Exports structured data and full-resolution embedded images into an encrypted/portable `.json` file for off-device safeguarding (Google Drive, email, etc.).
- **Safe Merge Restore:** Importing a backup file adds missing months/records without overwriting or deleting existing local data.
- **📊 CSV Export:** Clean tabular export for spreadsheets, ERP systems, or SAP Concur integration.

---

## Tech Stack

- **Core:** Pure Vanilla HTML5, Modern CSS3 (Dark/Light OLED Theme), Vanilla JavaScript (ES6+).
- **Database:** Browser `IndexedDB` with fallback support.
- **PWA & Offline:** Service Worker cache-first shell + Web App Manifest (`manifest.json`) + Web Share Target API.
- **AI & Vision:** Google Gemini 3.5 Flash API (Multimodal Vision & NLP) + Tesseract.js (Offline fallback).
- **PDF Engine:** Native CSS Paged Media (`@page`, `@media print`) via `window.print()` — no heavy third-party PDF libraries required.

---

## Project Structure