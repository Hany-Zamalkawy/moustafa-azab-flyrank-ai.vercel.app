<div align="center">

# ⚡ HANY'S WORLD V2
### *Cyber-Minimalist Software Engineer Portfolio & Interactive Resume Platform*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Cloud_Run-4be277?style=for-the-badge&logo=google-cloud&logoColor=0e150e)](https://hany-s-world-597716960036.europe-west2.run.app/)
[![GitHub Repo](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br />

[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Google Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat-square&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Framer Motion](https://img.shields.io/badge/Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://motion.dev/)

<br />

> **"Code. Ship. Impact."**  
> A high-performance, futuristic terminal-inspired digital identity, interactive portfolio, and resume engineering hub for **Moustafa Hany Azab (HANY ZAMLKAWY)**.

[Explore Live Demo](https://hany-s-world-597716960036.europe-west2.run.app/) • [Report Bug](https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD/issues) • [Request Feature](https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Backend API Specification](#-backend-api-specification)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Showcased Projects](#-showcased-projects)
- [About the Author](#-about-the-author)
- [Contributing & Feedback](#-contributing--feedback)
- [License](#-license)

---

## 🔭 Overview

**HANY'S WORLD V2** is a cyber-minimalist portfolio website and interactive resume engine engineered with modern web standards. Designed to bridge high-aesthetic terminal UX with software engineering rigor, it showcases professional experiences, production projects, specialized architectural services, and verified credentials.

Built on **React 19**, **TypeScript**, and **Tailwind CSS v4** with a dedicated **Express backend API layer**, the platform delivers blazing-fast render performance, native-feeling micro-interactions, complete bidirectional internationalization (English & Arabic), and an in-browser PDF compiler.

---

## ✨ Key Features

### 💻 Cyber-Minimalist Terminal Aesthetic
- **Authentic Retro-Future Styling:** Monospace typography, CRT scanline overlays, ambient phosphor glow (`#4be277`), and dynamic dot grids.
- **Dual Theme Support:** Seamless toggle between the default **Cyber Dark** mode and a clean **Classic Terminal Light** mode with state persistence.

### 🌐 Full Bilingual Internationalization (i18n & RTL/LTR)
- Instant one-click toggle between **English (LTR)** and **Arabic (RTL)**.
- Document-level synchronization (`dir="rtl"` / `dir="ltr"` and `lang="ar"` / `lang="en"`) ensuring typographic balance and layout integrity.

### 📄 Interactive In-Browser Resume Engine
- **Direct PDF Export:** Client-side vector-perfect A4 PDF resume generation powered by `jsPDF`.
- **Multi-Format Export:** Instant copy to clipboard in formatted **Markdown** or structured **JSON**.
- **Print Optimization:** Dedicated print stylesheet (`window.print()`) for clean physical or digital document export.

### 🎯 Interactive Skill Cross-Filtering Matrix
- Dynamic categorization across **Languages**, **Frameworks**, **Cloud/DevOps**, and **Databases**.
- Selecting any skill badge highlights and filters matching career timeline entries and showcase projects across the entire page.

### 🚀 Full-Stack Express Backend
- Unified single-server architecture orchestrating both development (via Vite middleware) and production static asset serving.
- Built-in REST endpoints for system health telemetry, dynamic profile payload retrieval, and contact inquiry validation.

### 📬 Validated Contact Pipeline
- Interactive contact dispatch interface with client and server-side RFC-compliant email validation and structured error handling.

### 🤖 AI-Ready Integration
- Integrated `@google/genai` SDK support prepared for Gemini LLM query extensions and intelligent assistant workflows.

---

## 🏗️ System Architecture

```
                       ┌───────────────────────────────────────┐
                       │               Client                  │
                       │   (React 19 + TypeScript + Vite)     │
                       └──────────────────┬────────────────────┘
                                          │
                        REST API Requests │ Static Assets / SPA Route
                                          ▼
                       ┌───────────────────────────────────────┐
                       │            Express Server             │
                       │             (dev-server.ts)               │
                       ├──────────────────┬────────────────────┤
                       │  /api/health     │  Health Telemetry  │
                       │  /api/profile    │  JSON Profile Data │
                       │  /api/contact    │  Inquiry Pipeline  │
                       └──────────────────┴────────────────────┘
                                          │
                         AI Agents / LLM  │ Google Gemini SDK
                                          ▼
                       ┌───────────────────────────────────────┐
                       │           Google Gemini API           │
                       │           (@google/genai)             │
                       └───────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/), [TypeScript 5.8](https://www.typescriptlang.org/), [Vite 6](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), Custom Cyber Scanlines |
| **Motion & FX** | [Motion (Framer Motion)](https://motion.dev/) |
| **Backend API** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/) |
| **Document Generation** | [jsPDF](https://github.com/parallax/jsPDF) |
| **AI Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini API) |
| **Deployment & Hosting** | [Google Cloud Run](https://cloud.google.com/run), Docker |

---

## 📁 Project Directory Structure

```text
HANY'S WORLD V2/
├── assets/                     # Static media and platform assets
├── src/
│   ├── components/
│   │   ├── EducationSection.tsx    # Academic degrees, certifications & milestones
│   │   ├── ExperienceTimeline.tsx  # Career trajectory & internship timeline
│   │   ├── Footer.tsx              # Terminal footer, socials, quick email copy
│   │   ├── Hero.tsx                # Terminal intro, bio, and primary CTAs
│   │   ├── Navbar.tsx              # Sticky HUD, language & theme switcher
│   │   ├── ProjectsShowcase.tsx    # Live project gallery with skill links
│   │   ├── ResumeModal.tsx         # Live resume view, PDF compiler & JSON export
│   │   ├── ServicesSection.tsx     # Full-Stack, Data Eng, AI & Cloud services
│   │   └── SkillsSection.tsx       # Interactive skill badges & category filter
│   ├── services/
│   │   └── api.ts                  # Clean frontend API client for backend routes
│   ├── App.tsx                     # Core application orchestrator & state manager
│   ├── data.ts                     # Profile data, skill taxonomy, history & projects
│   ├── index.css                   # Tailwind v4 directives, scanline & theme styles
│   ├── main.tsx                    # React DOM root entry point
│   ├── translations.ts             # Bilingual i18n dictionaries (English & Arabic)
│   └── types.ts                    # Strict TypeScript interfaces & data models
├── .env.example                # Sample environment variable template
├── .gitignore                  # Git untracked files specification
├── index.html                  # HTML5 boilerplate & SEO metadata
├── metadata.json               # Application capability metadata
├── package.json                # Project dependencies and script commands
├── dev-server.ts                   # Express server, Vite middleware & REST endpoints
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite bundler, React & Tailwind plugin configuration
```

---

## 📡 Backend API Specification

The built-in Express server exposes a lightweight, production-ready REST API:

### 1. Health Telemetry
- **Endpoint:** `GET /api/health`
- **Description:** Returns server uptime, status, and health timestamp.
- **Sample Response:**
  ```json
  {
    "status": "ok",
    "uptime": 142.85,
    "timestamp": "2026-09-08T02:00:00.000Z",
    "service": "HANY'S WORLD Portfolio API"
  }
  ```

### 2. Profile Metadata
- **Endpoint:** `GET /api/profile`
- **Description:** Supplies biographical details, focus specializations, and social handles in structured JSON.
- **Sample Response:**
  ```json
  {
    "name": "Moustafa Hany Azab",
    "alias": "HANY ZAMLKAWY",
    "role": "Software Engineer",
    "mission": "Code. Ship. Impact.",
    "email": "moustfahhany5@gmail.com",
    "focus": [
      "Software Engineer",
      "Full-Stack Developer",
      "Data Engineering",
      "AI Automation"
    ],
    "socials": {
      "github": "https://github.com/Hany-Zamalkawy",
      "linkedin": "https://www.linkedin.com/in/moustafa-hany-45b0a331a/",
      "whatsapp": "https://wa.me/201021464402"
    }
  }
  ```

### 3. Contact Submission
- **Endpoint:** `POST /api/contact`
- **Description:** Validates and handles contact form messages.
- **Payload (`application/json`):**
  ```json
  {
    "name": "Alex Carter",
    "email": "alex@example.com",
    "message": "Hi Moustafa, I'd like to collaborate on an upcoming project."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Your message has been received! Moustafa will respond to your inquiry shortly.",
    "receivedAt": "2026-09-08T02:05:00.000Z"
  }
  ```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your workstation.

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Package Manager:** `npm` (v9+), `pnpm`, or `yarn`

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD.git
   cd My-Portfolio-HANY-S-WORLD
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Populate the configuration values:

```env
# Google Gemini API key (optional for AI feature extensions)
GEMINI_API_KEY="your-gemini-api-key"

# Application Base URL
APP_URL="http://localhost:3000"

# Port (defaults to 3000)
PORT=3000
```

### Development Server

Launch the full-stack development environment (runs `dev-server.ts` with `tsx` and hot-module reloading via Vite):

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```

### Production Build

To compile a production bundle and run the high-performance optimized server:

```bash
# 1. Build client assets and bundle server
npm run build

# 2. Launch production Express server
npm start
```

---

## 💼 Showcased Projects

| Project | Description | Stack | Live / Source |
| :--- | :--- | :--- | :--- |
| **HANY'S WORLD V2** | Cyber-minimalist portfolio, terminal HUD & live PDF resume compiler. | React 19, TypeScript, Tailwind v4, Express | [Live](https://hany-s-world-597716960036.europe-west2.run.app/) / [Code](https://github.com/Hany-Zamalkawy/My-Portfolio-HANY-S-WORLD) |
| **FarmFlow** | Python farm-to-consumer e-commerce and inventory platform developed at NTI. | Python, E-Commerce Logic, Git | [Live](https://hany-zamalkawy.github.io/NTI_Summer_Intership_Project/) / [Code](https://github.com/Hany-Zamalkawy/NTI_Summer_Intership_Project) |
| **Leon Agency** | Modern, responsive digital agency platform with scroll animations. | HTML5, CSS3, Vanilla JS, Git | [Live](https://hany-zamalkawy.github.io/Leon-Agency/) / [Code](https://github.com/Hany-Zamalkawy/Leon-Agency) |
| **VOLT Sports** | Athletic performance analysis and interactive sports visualization web app. | JavaScript, HTML, CSS, Git | [Live](https://hany-zamalkawy.github.io/-VOLT-Sports/) / [Code](https://github.com/Hany-Zamalkawy/-VOLT-Sports) |
| **Artisan Table** | Full-stack restaurant digital ordering platform and interactive menu. | React, JavaScript, CSS, GitHub | [Live](https://hany-zamalkawy.github.io/restaurant_Artisan_Table/) / [Code](https://github.com/Hany-Zamalkawy/restaurant_Artisan_Table) |

---

## 👨‍💻 About the Author

<div align="center">

### **Moustafa Hany Azab**  
*(HANY ZAMLKAWY)*  
**Software Engineer • Full-Stack Developer • Data & AI Engineer**

*Business Information Systems (BIS) Student | Higher Institute for Computer & Information Systems (Abu Qir, Alexandria)*

[![GitHub](https://img.shields.io/badge/GitHub-Hany--Zamalkawy-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hany-Zamalkawy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Moustafa_Hany-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/moustafa-hany-45b0a331a/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/201021464402)
[![Telegram](https://img.shields.io/badge/Telegram-Contact-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/Hany_Zamlkawy)
[![Email](https://img.shields.io/badge/Email-moustfahhany5%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:moustfahhany5@gmail.com)

</div>

---

## 🤝 Contributing & Feedback

Contributions, feature suggestions, and code reviews are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Engineered with precision by <strong>Moustafa Hany Azab (Hany Zamalkawy)</strong>. Built to inspire.</sub>
</div>
