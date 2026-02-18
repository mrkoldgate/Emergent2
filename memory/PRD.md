# OpenClaw Mission Control Dashboard PRD

## Overview
A premium mission control dashboard for monitoring and controlling autonomous AI agents running on OpenClaw. Built with Next.js 15, Convex, Tailwind CSS v4, Framer Motion, ShadCN UI, and Lucide icons.

## Architecture
- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Real-time Backend**: Convex (schema defined, mock data fallback)
- **Styling**: Tailwind CSS v4 + custom dark theme
- **Animations**: Framer Motion
- **Components**: Custom ShadCN-style UI components
- **API Routes**: Next.js API routes for filesystem data

## What's Been Implemented

### Date: Feb 18, 2026

**Pages (8 total)**:
1. **Home (/)** - Dashboard overview with system health, agent status, cron health, revenue tracker, content pipeline, quick stats, activity feed
2. **Ops (/ops)** - 3 tabs: Operations (server health, branch status, observations, priorities), Tasks (suggested tasks with approve/reject), Calendar
3. **Agents (/agents)** - 2 tabs: Agent cards with detail panels (soul, rules, capabilities), Models inventory table
4. **Chat (/chat)** - 2 tabs: Chat interface with sessions sidebar and messages, Command terminal
5. **Content (/content)** - Kanban board (Draft → Review → Approved → Published)
6. **Comms (/comms)** - 2 tabs: Communication hub (Discord, Telegram, notifications), CRM kanban
7. **Knowledge (/knowledge)** - 2 tabs: Knowledge base search, Ecosystem product grid with detail pages
8. **Code (/code)** - Repository cards with branch status, commits, language breakdown

**Components**:
- Nav (horizontal navigation)
- TabBar (animated tab switching)
- DashboardOverview, ActivityFeed
- OpsView, SuggestedTasksView, CalendarView
- AgentsView, ModelsView
- ChatCenterView (with voice input support)
- ContentView (kanban)
- CommsView, CRMView
- KnowledgeBase, EcosystemView
- CodePipeline

**API Routes**:
- `/api/system-state` - Server health
- `/api/agents` - Agent registry
- `/api/cron-health` - Scheduled jobs
- `/api/revenue` - Revenue tracking
- `/api/content-pipeline` - Content status
- `/api/suggested-tasks` - Task management
- `/api/health` - System health check

**Design**:
- Dark mode only (JARVIS/Bloomberg terminal aesthetic)
- Glass effects (backdrop-blur-xl, bg-white/[0.03])
- Rounded corners (16-20px)
- Stagger animations on card grids
- Custom scrollbar styling
- Inter font

## Prioritized Backlog

### P0 (Critical)
- ✅ Core dashboard with all 8 pages
- ✅ Navigation and routing
- ✅ Glass morphism UI components
- ✅ Mock data for all views

### P1 (High Priority)
- [ ] Connect to real Convex backend
- [ ] Real filesystem reading from ~/.openclaw/workspace/
- [ ] Voice input for chat
- [ ] Drag-to-create calendar events

### P2 (Medium Priority)
- [ ] WebSocket real-time updates
- [ ] Export/import configurations
- [ ] Advanced filtering and search
- [ ] Mobile-optimized touch interactions

## Tech Stack
- Next.js 15.2.1
- Convex 1.20.0
- Framer Motion 12.4.7
- Tailwind CSS 4
- Lucide React
- Radix UI primitives

## Running
Frontend runs on port 3000 via `next dev`
