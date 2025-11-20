# About the Product AI Usage Guide

This document defines the product vision, audience, purpose, and evolving direction of the application.  
It provides **contextual memory** for the AI to ensure all code and features align with the products goals and identity.

---

## AI Interaction Rules

1. **Always review this document before implementing, refactoring, or suggesting new features.**  
   Use this file to align development choices with the products intent, tone, and audience.

2. **When updating or refining product details:**

   - Edit only the relevant sections (Purpose, Target Audience, etc.).
   - Maintain the existing Markdown heading structure.
   - Avoid removing historical context unless its outdated or replaced with updated data.
   - When a major change occurs (like a new direction or rebrand), summarize it in the Product Evolution Log.

3. **When adding new information:**

   - Place it under the correct section heading.
   - Use clear, concise, human-readable language.
   - Maintain professional tone and formatting consistency.

4. **Do not change section titles or structure.**

   - Keep this format intact so the AI can reliably read and update fields.

5. **Use dates for all updates.**
   - Include timestamps in Product Evolution Log whenever meaningful updates occur.

---

## Product Information Schema

Use the following structure to describe the product.  
Each section contains reserved comment blocks (`<!-- -->`) that signal where to write or edit content.

---

## Product Name

AutoPomo

Automated Pomodoro flow for focused work.

---

## Purpose / Mission

AutoPomo removes the mental overhead of managing timers and task transitions so users can maintain deep focus. It automates Pomodoro cycles and task progression with a single, low‑friction action.

---

## Target Audience

- Solo developers, coding students, and knowledge workers who value minimal setup and uninterrupted focus.
- People who prefer simple timeboxing without configuration or distraction.

---

## Core Value Proposition

- Start one flow and let the app handle work/break sequencing automatically.
- Minimal UI and predictable transitions that preserve flow and reduce context switching.

---

## MVP Objective

Deliver a dependable, single‑flow automated Pomodoro web app: task queue with pomodoro assignments, one prominent `Start Flow` action, automated timer sequencing (25m work, 5m short breaks, 15m long break every 4 pomodoros), and simple audible/visual cues. Exclude analytics, customization, and multi‑device sync for the initial release.

---

## Long-Term Vision

- Add lightweight customization and session history so users can optionally track progress.
- Offer optional cloud persistence and integrations (calendar, notifications, team sync) while keeping the core one‑tap start and distraction‑free experience.

---

## Design & Experience Principles

- Minimal: prioritize a single clear primary action and defer non-essential controls.
- Predictable feedback: clearly communicate state transitions with unobtrusive visual and audio cues.
- Non‑intrusive: avoid modal interruptions; allow users to keep working without dismissing dialogs.
- Accessible: ensure readable typography, sufficient contrast, and keyboard support for core actions.

---

## Technical Overview

- Frontend (MVP): React + Vite (small SPA) or lightweight vanilla JS for a minimal bundle.
- Storage (MVP): `localStorage` for ephemeral session state and simple persistence between reloads.
- Optional backend (post‑MVP): Supabase (Postgres) or a small serverless API for session history and multi‑device sync.
- Deployment: static hosting (Vercel, Netlify, or similar) for fast, low‑cost delivery.

---

## Product Structure Overview

- Start Screen: prominent `Start Flow` control and task input area with assigned pomodoros.
- Timer Component: single source of truth for countdowns, state transitions, and notifications.
- Task Queue: simple list showing task names and remaining pomodoros.
- Session Summary: brief end‑of‑session feedback (deferred details for post‑MVP).

---

## Product Evolution Log

> _Chronological updates describing how the product concept, goals, or positioning have changed over time._

- 2025-11-19 Product name confirmed as AutoPomo; initial product schema and MVP summary added to `about-the-product-schema.md`.

---

## File Integrity Notes

- Preserve Markdown headings and section order.
- Keep whitespace between sections.
- Avoid embedding raw code here this file is conceptual, not technical.
- AI should write clear, concise, descriptive English.
- Always timestamp meaningful updates.
