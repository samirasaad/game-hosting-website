# Game Hosting Website 🎮

A Next.js + Tailwind CSS web application for hosting and discovering game servers — a landing / catalog site for game-hosting services.

## 🚀 Live Demo

[https://game-hosting-website-weld.vercel.app](https://game-hosting-website-weld.vercel.app)

---

## 📄 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup (Local)](#installation--setup-local)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Implemented Features](#implemented-features)


---

## 🧾 About

This project is a frontend application built with Next.js and styled with Tailwind CSS and used zustand as state management, intended as a “game hosting website” — where users can browse hosting plans/servers, or get information about hosting services.  
It’s designed to be responsive, accessible, and easy to extend.

---

## ✅ Features

- Responsive design — works on desktop & mobile.
- Clean modern UI using Tailwind CSS.
- Pages/routes handled by Next.js.
- Modular, maintainable codebase with TypeScript support.
- Easy to deploy (e.g. on Vercel).
- Placeholder for dynamic content — ready for backend/API integration or static content expansion.

---

## 🛠️ Tech Stack

- Next.js (React-based, with file-based routing)
- Tailwind CSS for styling
- TypeScript for type-safety
- PostCSS / Tailwind config for CSS processing
- (Optional) Any preferred package manager: npm, yarn, pnpm

---

## 🔧 Installation & Setup (Local)

1. Clone the repository

   ```bash
   git clone https://github.com/samirasaad/game-hosting-website.git
   cd game-hosting-website

   ```

2. Install dependencies  
   npm install
    or
   yarn install
    or
   pnpm install

3.  Start development server
    npm run dev
      or
    yarn dev
      or
     pnpm dev

4. Open your browser at http://localhost:3000 to see the website.

---

📂 Project Structure

game-hosting-website/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Source code: pages, components, styles, Store
├── .gitignore              
├── README.md               # This file  
├── package.json            
├── tailwind.config.ts      
├── postcss.config.mjs      
├── next.config.ts          
└── tsconfig.json    


---


⚙️ Configuration & Environment Variables

For now, the project does not rely on any secret keys or external APIs.

---

 ✅ Implemented Features

- Next App router
- Tailwind CSS integration
- Zustand for state management
- saving games and filter and categories in persistent state using zustand state management library with middleware
- TypeScript support
- Home page with featured games carousel, search bar, and filtering options
- Favorites page to view saved games
- Footer component
- Navbar component with logo, home/favourites, featured links and mode toggle
- GameCard component for displaying individual game info with Hover effects and smooth transitions
- Play btn redirect to game details page
- Game details page with game preview and additional information
- Game reviewers section
- Game rating display
- Fullscreen mode for game iframe
- Search by game name 
- Filtering by game category 
- Game categories sidebar
- Multiple categories can be selected
- Clearing filters functionality
- Fully responsive design
- Dark mode support
- Mark game as favourite/unfavourite functionality
- Game details page
- Game preview
- Handling data not found in games search  section and favourites page
- Handling iframe error for invalid/broken url [if game cant load] in games list and preview modal
- Handling share functionality 
- Real-time search results
- Smooth animations and transitions
- Accessibility considerations (ARIA roles, keyboard navigation)


---


🔴 important version of used packages can be found in package.json file.
