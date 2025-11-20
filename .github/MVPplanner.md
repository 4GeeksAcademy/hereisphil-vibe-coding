# MVP Product Planner: Automated Pomodoro Flow App

## Problem

Pomodoro users experience mental overhead and broken flow states due to manually tracking tasks, timers, and transitions between work sessions and breaks. This constant context-switching defeats the purpose of the productivity technique.

## Core Benefit

An automated flow app that handles timer sequencing, task transitions, and break intervals without user intervention, allowing users to maintain deep focus throughout their work sessions.

## Core Features

1. **Task Queue with Pomodoro Assignment**

- Simple task input field with ability to assign number of pomodoros (25-min work blocks) needed per task
- Visual task list showing remaining pomodoros for each task

2. **Automatic Timer & Transition Flow**

- Single "Start Flow" button that runs through tasks sequentially
- Auto-progression: 25-min work → 5-min break → next pomodoro (with 15-min break after 4 pomodoros)
- Audio/visual notification when transitioning between states

3. **Minimal Session Display**

- Current task name and pomodoro count displayed during work sessions
- Simple timer countdown showing remaining time
- Clear indication of current state (working/short break/long break)

## User Flow

1. User adds 3-5 tasks with assigned pomodoro counts (e.g., "Write report - 3 pomodoros")
2. User clicks "Start Flow" button once
3. App automatically cycles through: work timer → break → next work session → break (repeating until all tasks complete)
4. User works without touching the app until flow completes or manually stopped
5. Session ends when all assigned pomodoros are completed

## Success Metric

**80% of users complete at least one full task sequence (4 pomodoros) without manually intervening**, measured within first week of use.

---

This MVP focuses solely on removing manual tracking friction. Features intentionally excluded: statistics, customization, notifications settings, task editing, project grouping. These can be validated later if the core automation solves the stated problem.
