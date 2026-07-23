# ☕ Coffee Sample Tracking & Logistics Platform (PoC)

An elegant, real-time logistics monitoring and buyer confirmation platform designed to bridge global postal tracking with buyer communication channels.

![React](https://img.shields.io/badge/React-18-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State-purple) ![Vite](https://img.shields.io/badge/Vite-Build-yellow) ![CSS Modules](https://img.shields.io/badge/CSS_Modules-Scoped-green)

---

## Executive Summary

### The Problem

Global coffee exporters send high-value micro-lot coffee samples to buyers globally. Communication happens over email, and dispatches are handled via courier services (e.g., DHL Express). Once dispatched, sample tracking falls into an operational black hole:

- **Silence as default:** Buyers rarely email back proactively to confirm receipt or feedback upon delivery.
- **Data fragmentation:** DHL tracking webhooks, waybill numbers, and email threads live in disconnected silos.
- **Zero visibility on delivery performance:** The business lacks real-time operational visibility into regional delay rates, transit bottlenecks, and unconfirmed deliveries.

### The Solution

A unified command center that links **courier tracking pipelines** (DHL) directly with **email communication threads** (Gmail/Outlook). The system automatically tracks waybill milestones, triggers automated buyer receipt inquiries upon confirmed delivery, and provides real-time operational analytics on global dispatches.

---

## PoC Architecture & Technical Approach

In a production deployment, the platform operates as a multi-stage sync engine:

```

┌────────────────────────┐ ┌─────────────────────────┐
│ Gmail / Outlook API │ │ DHL Express Webhook API │
│ (Email Threads/Pings) │ │ (Transit Milestones) │
└───────────┬────────────┘ └────────────┬────────────┘
│ │
└───────────────┬────────────────┘
                ▼
┌──────────────────────────────────┐
│ Integration & Sync Pipeline      │
│ - Auto-detect Waybill & Buyer    │
│ - Trigger Post-Delivery Inquiries│
└────────────────┬─────────────────┘
                 ▼
┌──────────────────────────────────┐
│ Real-Time Dashboard (This PoC)   │
│ - Executive KPI Analytics        │
│ - Sample Ledger & Timeline View  │
└──────────────────────────────────┘

```

1. **Email Ingestion:** Automatically parses sample dispatch emails to map buyer contact details against assigned DHL waybills.
2. **DHL Transit Polling:** Listens to DHL status updates (`Picked Up` $\rightarrow$ `In Transit` $\rightarrow$ `Customs Delay` $\rightarrow$ `Delivered`).
3. **Automated Confirmation Loop:** When DHL emits a `Delivered` milestone, the platform queues a gentle follow-up ping requesting sample confirmation and cupping feedback.
4. **Logistics Analytics:** Aggregates delivery success rates, transit delays, and confirmation statuses into actionable KPIs.

---

## PoC Implementation Scope

This repository contains a lightweight **2-Page React Prototype** built to demonstrate the UX, system architecture, and core data flow.

### Feature Breakdown

#### Page 1: Executive Overview Dashboard

- **Dynamic KPI Cards:** Calculates live metrics from the dispatch dataset:
  - Total Dispatched Samples
  - Delivery Success Rate (%)
  - Delay / Issue Rate (%)
  - Unconfirmed Receipts (Action Required)
- **Regional Performance Breakdown:** Visual distribution of delivery success across geographic markets (Europe, Asia-Pacific, North America).
- **Attention Required Feed:** High-risk alert panel highlighting shipments encountering customs holds or pending buyer receipt confirmation past targeted SLAs.

#### Page 2: Sample Ledger & Deep Tracking

- **Interactive Data Ledger:** Clean, searchable table displaying Recipient, Sample Type, Waybill Number, Region, DHL Status, and Buyer Confirmation Status.
- **Multi-Parameter Filtering:** Real-time search by keyword, region, or carrier status.
- **Shipment Detail Drawer:** Slide-over modal showing:
  - Live-simulated DHL event timeline.
  - Ingested email communication logs associated with the sample.
  - **Interactive Action Trigger:** Ability to trigger a "Manual Buyer Ping", appending a real-time follow-up event to the email audit log.

#### Design System & Aesthetics

- **Theme:** Coffee/Espresso undertones (Dark Espresso `#2C1810`, Roasted Copper `#C87D55`, Warm Off-White surface).
- **Typography:** Self-hosted `Manrope` font bundled via `@fontsource/manrope`.
- **Dark Mode:** Native Dark Roasted theme support with system preference auto-detection (`prefers-color-scheme`) and manual toggle.

---

## Project Structure

```text
src/
├── app/
│   ├── store.js             # Redux Store Configuration
│   └── hooks.js             # Typed Redux Hooks & Theme Switcher Logic
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Header & Theme Switcher
│   │   └── Navbar.module.css
│   ├── overview/
│   │   ├── KpiCard.jsx      # Dynamic KPI Metric Card
│   │   ├── RegionBreakdown.jsx # Regional Analytics Progress Bar
│   │   ├── DelayedAlerts.jsx   # Attention Required Feed
│   │   └── Overview.module.css
│   ├── shipments/
│   │   ├── ShipmentTable.jsx      # Master Sample Ledger Table
│   │   ├── ShipmentFilter.jsx     # Search & Filter Controls
│   │   ├── ShipmentDetailModal.jsx# Drawer View (Timeline & Email Logs)
│   │   └── Shipments.module.css
│   └── ui/
│       ├── Badge.jsx        # Status Pills (Delivered, Delayed, etc.)
│       └── Badge.module.css
├── features/
│   └── shipments/
│       ├── shipmentsSlice.js # Redux State (Items, Filters, Pings)
│       └── dummyData.js      # Initial Sample Tracking Dataset
├── pages/
│   ├── OverviewPage.jsx     # Executive Overview View
│   └── ShipmentsPage.jsx    # Sample Tracker Ledger View
├── styles/
│   ├── variables.css        # Light & Dark Theme CSS Variables
│   └── global.css           # Global Typography & Viewport Resets
├── App.jsx                  # Root Layout Container
└── main.jsx                 # Entry Point & Font Imports

```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. Clone the repository and navigate to the project directory:

```bash
cd coffee-logistics-poc

```

2. Install dependencies (including Manrope typography and Redux Toolkit):

```bash
npm install

```

3. Run the development server:

```bash
npm run dev

```

4. Open your browser and navigate to `http://localhost:5173`.

---

## Production Roadmap (Phase 2)

| Component               | Technology                     | Purpose                                                          |
| ----------------------- | ------------------------------ | ---------------------------------------------------------------- |
| **Backend Integration** | Node.js / Azure Functions      | Event-driven microservices for email parsing and carrier polling |
| **Database**            | Azure Cosmos DB / PostgreSQL   | Persistent store for waybills, email logs, and buyer profiles    |
| **Courier Webhooks**    | DHL Express API                | Real-time transit updates without polling overhead               |
| **Email Service**       | Google Workspace / Outlook API | OAuth2 integration to send/receive sample feedback emails        |

```

```
