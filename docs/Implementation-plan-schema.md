# Implementation Plan AI Usage Guide

This document serves as a **living implementation record** for the project.  
It defines all planned and completed features, milestones, and technical steps required to reach and evolve the MVP.

---

## AI Interaction Rules

1. **Always read this file before beginning any new feature or code change.**  
   Use it to understand what features exist, their current status, and dependencies.

2. **When adding a new feature:**

   - Duplicate the Feature Implementation Plan Model shown below.
   - Replace all placeholder fields (`[Feature Name]`, etc.) with real details.
   - Insert the new feature under the appropriate section (MVP, Post-MVP, or Other).
   - Maintain consistent formatting.

3. **When updating progress:**

   - Update the **Status** field.
   - Check off relevant items in **Implementation Steps** and **Acceptance Criteria**.
   - Update the **Last Updated** date.
   - If implementation details evolve, expand the Technical Breakdown or Testing Notes.

4. **When completing a major milestone (e.g., MVP deployment):**

   - Add a short summary entry at the bottom under Development Notes describing what changed or was achieved.

5. **Do not delete or overwrite past feature sections.**
   - Instead, mark them as Complete and update the timestamp.
   - This document should reflect a chronological record of development history.

---

## Feature Implementation Plan Model

Use this exact structure when creating or updating feature entries.

### Example Template

## Feature: [Feature Name]

**Purpose:**  
_Describe the intent and reason for this feature._

**User Story / Use Case:**  
_As a [user type], I want to [perform an action] so that I can [achieve benefit]._

**Dependencies / Prerequisites:**  
_List related systems, APIs, libraries, or other features required before this one can function._

**Technical Breakdown:**

- _Frontend components/pages to build_
- _Backend endpoints or database tables needed_
- _Key logic or architectural notes_

**Implementation Steps:**

- [ ] Step 1: _Define or set up structure_
- [ ] Step 2: _Build primary functionality_
- [ ] Step 3: _Integrate with data sources or APIs_
- [ ] Step 4: _Add validations/tests_
- [ ] Step 5: _UI/UX refinements_

**Acceptance Criteria:**

- [ ] _Feature works as intended_
- [ ] _No errors in console/build_
- [ ] _Responsive layout verified_
- [ ] _Feature integrated with related systems_

**Testing & Validation Notes:**  
_Specify how to test functionality and what tools to use._

**Post-Implementation Actions:**  
_Follow-ups such as documentation, styling, or refactoring._

**Status:** Not Started / In Progress / Blocked / Complete  
**Last Updated:** YYYY-MM-DD

---

## Recommended Tech Stack

This project uses the following stack for the MVP and near-term roadmap. Supabase is the required database/backend.

- Frontend: React + Vite + TypeScript — component-driven, fast dev experience, and good DX.
- Styling: Tailwind CSS for rapid, consistent styling and minimal custom CSS.
- State: React Context for app-level state; optionally Zustand for a small, focused store if needed.
- Time utilities: `date-fns` for lightweight date/time manipulation and time-delta calculations.
- Persistence: `localStorage` for guest/anonymous sessions; Supabase (Postgres) for optional persisted routines and sessions.
- Backend / DB: Supabase (Postgres) — required. Use `@supabase/supabase-js` client for DB and Auth integrations.
- Auth: Supabase Auth (magic link / OAuth) optional; default guest mode uses `localStorage` with an option to migrate to a Supabase account.
- Testing: Vitest + React Testing Library for unit/integration; Playwright for E2E (optional).
- Linting & Formatting: ESLint + Prettier + TypeScript rules.
- CI/CD & Hosting: GitHub Actions for CI; deploy static frontend to Vercel or Netlify. Store build env vars securely (SUPABASE_URL, SUPABASE_ANON_KEY).
- Monitoring: Sentry (optional) for error reporting; rely on Supabase logs for DB diagnostics.

Rationale: This stack prioritizes fast iteration, small bundles, strong Supabase support, and an easy upgrade path to add persistence and auth later without reworking the frontend architecture.

---

## Implementation Sections

Below are the main phases of implementation.  
Each section contains **reserved space** where the AI (or a developer) should insert detailed feature entries using the model above.

---

## MVP Features

> _Core functionalities required to achieve a Minimum Viable Product._

<!--
    Insert feature implementation plans for all MVP-level features here.
    Each feature entry should follow the Feature Implementation Plan Model.
-->

## Feature: Task Queue with Pomodoro Assignment

**Purpose:**
Allow users to create a simple task list and assign the number of pomodoros required per task so the flow can progress automatically.

**User Story / Use Case:**
As a user, I want to add tasks and assign pomodoro counts so the app can consume tasks in sequence without my intervention.

**Dependencies / Prerequisites:**

- Frontend components (Task input, Task list UI).
- Local `localStorage` fallback and Supabase table `tasks`/`routines` for optional persistence.

**Technical Breakdown:**

- Frontend: `TaskInput`, `TaskList` components; state model `[{id, title, remaining_pomos, original_pomos}]`.
- Persistence: write/read to `localStorage` (MVP) and optional Supabase `tasks` table when user opts in.
- UX: quick-add input, ability to set integer pomodoro count (default 1), visual remaining count decrementing after each completed pomodoro.

**Implementation Steps:**

- [ ] Create `TaskInput` component (title + pomodoro count input).
- [ ] Implement `TaskList` with remaining pomodoro display.
- [ ] Implement data layer: `TaskStore` that reads/writes `localStorage` and exposes CRUD functions.
- [ ] Add integration hooks to the Timer flow to decrement remaining pomodoros.
- [ ] Add basic tests for TaskStore read/write logic.

**Acceptance Criteria:**

- [ ] Tasks can be added with a positive integer pomodoro count.
- [ ] Task list displays remaining counts and updates after a pomodoro completion.
- [ ] Data persists across page reloads via `localStorage`.

**Testing & Validation Notes:**

- Manual: add 3 tasks, start flow, confirm counts decrement and tasks are marked complete when counts reach 0.
- Unit: TaskStore read/write and CRUD operations.

**Post-Implementation Actions:**

- Consider UI polishing and accessibility checks.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

## Feature: Automatic Timer & Transition Flow

**Purpose:**
Run the Pomodoro cycle automatically (work → short break → work → ... → long break) and progress through tasks without user input.

**User Story / Use Case:**
As a user, I want the app to run the sequence of timers and switch between work and break states automatically so I can maintain focus.

**Dependencies / Prerequisites:**

- Accurate timer component that runs reliably in the browser.
- Task Queue integration to pick the current task and decrement counts.

**Technical Breakdown:**

- Frontend: `Timer` component with internal state machine: {idle, working, short_break, long_break, paused}.
- Timing rules: work=25m, short break=5m, long break=15m after 4 completed pomodoros.
- Persistence: current timer state persisted to `localStorage` to survive reloads; optional Supabase `sessions` row for authenticated users.
- Edge cases: tab visibility, system clock changes, device sleep — implement time-delta based recovery rather than relying solely on setInterval.

**Implementation Steps:**

- [ ] Implement `Timer` state machine and countdown display.
- [ ] Add accurate time-tracking using timestamps (startTime + duration) and `requestAnimationFrame`/`setInterval` fallback.
- [ ] Wire Timer to TaskStore to mark pomodoro completion and trigger next state.
- [ ] Add pause/resume and manual stop controls (hidden secondary actions but required for user control).
- [ ] Add tests for state transitions and time recovery logic.

**Acceptance Criteria:**

- [ ] Timer cycles through work and break states automatically following the defined rules.
- [ ] Completing a work period decrements the current task's remaining pomodoros.
- [ ] After four pomodoros, the app schedules a long break.

**Testing & Validation Notes:**

- Simulate fast-forwarded timers in unit tests to validate transitions.
- Manual: create tasks and run a short simulated session to observe automatic progression.

**Post-Implementation Actions:**

- Optimize timer accuracy across browsers and mobile devices.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

## Feature: Minimal Session Display

**Purpose:**
Provide a succinct, low-distraction view that shows current task, remaining pomodoro count, and countdown timer.

**User Story / Use Case:**
As a user, I want to see what I'm working on and how much time remains without clutter or extra controls.

**Dependencies / Prerequisites:**

- Timer and TaskQueue components.

**Technical Breakdown:**

- Frontend: `SessionView` component that reads current task and timer state and renders a minimal UI.
- Accessibility: keyboard focus, readable fonts, high contrast.

**Implementation Steps:**

- [ ] Create `SessionView` component with task title, progress (x/y pomodoros), and countdown.
- [ ] Integrate state updates from Timer and TaskStore.
- [ ] Add responsive layout and accessible labels.

**Acceptance Criteria:**

- [ ] Session view displays current task and remaining time during a work period.
- [ ] Visual state clearly indicates Working / Short Break / Long Break.

**Testing & Validation Notes:**

- Manual verification across desktop and narrow/mobile widths.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

## Feature: Start Flow Control

**Purpose:**
Expose a single, prominent `Start Flow` action that begins the automated sequence for the queued tasks.

**User Story / Use Case:**
As a user, I want one clear primary action to begin a focused session without configuring multiple settings.

**Dependencies / Prerequisites:**

- TaskQueue must contain at least one task.
- Timer component available to begin a work period.

**Technical Breakdown:**

- Frontend: `StartButton` component placed on the Start Screen; disabled state when no tasks exist.
- Logic: on click, compute session plan (sequence of work/break intervals) and kick off Timer state machine.

**Implementation Steps:**

- [ ] Create `StartButton` with clear affordance and disabled state when task list empty.
- [ ] Implement workflow to lock UI to session state when flow starts (prevent accidental edits).
- [ ] Add visual confirmation and immediate timer start.

**Acceptance Criteria:**

- [ ] Clicking `Start Flow` launches the Timer and begins automatic progression.
- [ ] UI prevents destructive edits to active tasks while session is running.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

## Feature: Audio / Visual Notifications

**Purpose:**
Provide subtle audio and visual cues at state transitions (work → break and break → work) to inform users without breaking flow.

**User Story / Use Case:**
As a user, I want unobtrusive cues when a state changes so I can notice transitions even if I'm not watching the screen.

**Dependencies / Prerequisites:**

- Browser audio API and simple SVG/CSS visuals.

**Technical Breakdown:**

- Frontend: small `Notifier` utility that plays an audio short clip and flashes a visual indicator.
- Respect user agent rules: require user gesture before playing audio; fall back to visual-only if audio not allowed.

**Implementation Steps:**

- [ ] Add a short unobtrusive audio asset and `Notifier` wrapper.
- [ ] Trigger notifier on Timer transition events.
- [ ] Provide a mute/unmute toggle stored in `localStorage`.

**Acceptance Criteria:**

- [ ] Notifications trigger at each state transition.
- [ ] Audio is only played after a user gesture; otherwise visual notification is shown.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

## Feature: Persistence & Supabase Integration (Optional Routines)

**Purpose:**
Allow users who opt-in to save and load named routines (task sets) to Supabase without requiring them to create an account; support optional sign-in for cross-device sync.

**User Story / Use Case:**
As a user, I want to save a routine so I can reuse it later on another device when I sign in.

**Dependencies / Prerequisites:**

- Supabase project and client library.
- `routines`, `tasks`, and `sessions` tables in Supabase.

**Technical Breakdown:**

- Supabase schema (initial):

  - `users` (optional): `id(uuid)`, `email` (nullable), `created_at`
  - `routines`: `id`, `user_id` (nullable), `name`, `metadata`, `created_at`, `updated_at`
  - `tasks`: `id`, `routine_id`, `title`, `pomodoro_count`, `order_index`
  - `sessions`: `id`, `user_id` (nullable), `routine_id` (nullable), `started_at`, `ended_at`, `events(jsonb)`

- Auth model: anonymous guest mode (no auth required) that uses `localStorage`. When user signs in via Supabase Auth, offer to copy local routines to the user's account.
- RLS & Security: public `routines` rows only editable by owner; allow read access for routines marked public (future). Use Supabase Row Level Security policies for `routines`/`tasks` tables.

**Implementation Steps:**

- [ ] Provision Supabase project, create initial schema and seed minimal demo routine.
- [ ] Add Supabase client to frontend and wire environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) via build env.
- [ ] Implement optional Save/Load routine UI (Save to Supabase when user chooses to persist).
- [ ] Implement sign-in flow (Supabase OAuth or email magic link) as optional feature.
- [ ] Implement migration plan for schema changes.

**Acceptance Criteria:**

- [ ] Supabase tables created and accessible by the app using env vars.
- [ ] Users can save a routine to Supabase and load it after signing in.

**Testing & Validation Notes:**

- Integration tests for Supabase client connectivity (mocked) and local->remote sync.

**Post-Implementation Actions:**

- Add backup and data export options; add analytics later if needed.

**Status:** Not Started
**Last Updated:** 2025-11-20

---

---

## Post-MVP Enhancements

> _Additional features, polish, and quality-of-life improvements planned after MVP deployment._

<!--
    Insert Post-MVP feature implementation plans here.
-->

---

## Experimental / Optional Features

> _Experimental or stretch features for exploration or testing._

<!--
    Insert optional or experimental features here.
-->

---

## Deployment & Integration Tasks

> _Steps for hosting, MCP setup, and production pipeline configuration._

<!--
    Insert deployment or infrastructure-related feature entries here.
-->

---

## Development Notes

> _Chronological updates, milestones, or reflection logs (AI or developer-written)._

<!--
    Use this section to summarize development sessions, bug fixes, or major updates.
    Example: "2025-10-10  Completed MVP login flow; integrated Supabase + Clerk."
-->

- 2025-11-19 Confirmed product name `AutoPomo` and added initial product schema to `docs/about-the-product-schema.md`.
