# Khushi Bari - Full-Stack Developer Portfolio

This is a premium, high-performance, responsive full-stack developer portfolio for Khushi Bari. It features a React-based frontend styled with Tailwind CSS, fluid animations with Framer Motion, 3D tilt effects, and an Express/Node.js backend with structured dynamic API loading.

## Architecture

- **`backend/`**: Express.js server providing portfolio statistics and details, input validation, and contact form handling (saving messages locally and routing notifications via optional SMTP).
- **`frontend/`**: Vite + React SPA styled with custom Glassmorphism and active neon border-glow tokens. Fits all desktop, tablet, and mobile breakpoints.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your system.

### 1. Booting the Backend Server

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The backend will boot on port `5000` (http://localhost:5000).*

### 2. Booting the Frontend Client

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development environment:
   ```bash
   npm run dev
   ```
   *The frontend will run on Vite's default port, usually http://localhost:5173.*

---

## Key Features

1. **Fully Dynamic API Integration**: The frontend does not hardcode any details; it fetches everything from `GET /api/portfolio` on load, making future edits as simple as editing `backend/data/portfolio.json`.
2. **Mathematical 3D Tilt Card**: Project, education, and skill cards rotate dynamically along their 3D perspective axes based on the user's cursor position.
3. **Interactive Water Ripple Background**: Clicking anywhere on the layout (excluding input elements/links) registers an expanding liquid water-drop ripple.
4. **Input Validated Form handling**: The contact form features input-sanitizing validation rules on the backend and instant success/error feedback alerts on the frontend.
5. **SEO & High Performance Ready**: Includes custom meta titles, descriptions, preconnected Google fonts, and modular assets for optimal page loading metrics.
