# ⚡ BARATH — THOR 3D CINEMATIC DEVELOPER PORTFOLIO & GITHUB UNIVERSE

> **An immersive, cinematic 3D Norse Thunder developer experience and GitHub profile redesign for Barath ([@barathcbe06-gif](https://github.com/barathcbe06-gif)).**
> Built with **React 19**, **Three.js**, **React Three Fiber (v9)**, **@react-three/drei**, **TypeScript**, **Vite**, and **Native Web Audio API**.

---

## 🌩️ Highlights & Features

1. **Real-time 3D Hero Scene (`React Three Fiber` & `WebGL`):**
   - **Norse Thunder Warrior:** Procedural Asgardian armored bust with winged battle helm, glowing cyan lightning eyes, cuirass with 6 pulsating power nodes, and wind-simulated flowing crimson cape.
   - **Detailed Mjölnir Hammer:** Beveled Asgardian Uru metal head, glowing Elder Futhark rune bands, leather-wrapped spiral grip shaft, silver pommel cap, and floating electric spark aura.
   - **Procedural Lightning Storm:** Fractal recursive branching lightning bolts flashing dynamically from the clouds down to Mjölnir, illuminating the scene with real-time dynamic point and directional flashlights.
   - **Volumetric Storm Atmosphere:** Translucent layered rolling storm clouds and 280+ floating electric plasma sparks and dust motes.
   - **Interactive Summon:** Click anywhere in the 3D scene or press the **"SUMMON THUNDER"** button to call down a thunderbolt with screen shake and sound.

2. **Native Web Audio API Synthesizer (Zero External Dependencies):**
   - Synthesizes deep resonant brown-noise thunder claps, high-frequency electric sparks, and tactical cybernetic HUD hover blips natively in the browser with zero latency and zero broken asset links.
   - Interactive Sound Toggle (`[-- SOUND OFF / ON --]`) matching the reference video.

3. **Cybernetic Targeting Crosshair Cursor:**
   - Custom HUD reticle with red/cyan targeting rings, crosshair ticks, and a `"BARATH"` callout label matching the reference video.

4. **Complete Portfolio Sections Aligned with Visual Reference:**
   - **01 // ORIGIN (About Me):** Glassmorphic metallic dossier covering Barath's M.Sc Data Science background, environmental AI, and core philosophies.
   - **02 // ARSENAL (System & Technology):** Segmented LED progress bars (`■■■■■■■■□□□`) with power ratings and an interactive **Rotating Circular Holographic Radar Gauge** ("GT" telemetry dial) that updates on hover!
   - **03 // MISSIONS (Featured Projects):** 3D-styled mission cards featuring Barath's genuine GitHub repositories (`Smart Rice Crop Monitoring`, `DataLens AI`, `PlacementIQ`, `EcoServe-AI`, `TerraMind AI`) with an interactive **Mission Inspector Modal**.
   - **04 // TELEMETRY (GitHub Overview):** Real-time canvas oscilloscope rendering animated sine telemetry waves (Education, Technology, Career) matching video frame 00:17, plus live GitHub API integration and language distributions.
   - **05 // TRANSMIT (Contact Section):** *"READY TO BUILD SOMETHING EXTRAORDINARY?"* section with terminal dispatch transmission form, celebratory electric confetti, and direct email copy.

5. **GitHub Profile README Redesign (`github-profile/`):**
   - Custom animated Thor banner (`assets/thor-banner.gif` and `assets/thor-banner.svg`).
   - Ready-to-copy Markdown profile for `github.com/barathcbe06-gif/barathcbe06-gif`.

---

## 🚀 Quick Start — Running Locally

### 1. Prerequisites
- **Node.js** (v18 or higher recommended; verified on Node v24.11)
- **npm** (v9 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to experience the 3D portfolio!

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Barath Thor 3D Cinematic Portfolio"
   git branch -M main
   git remote add origin https://github.com/barathcbe06-gif/barath-Portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click **Deploy**!

### Deploy to Netlify
1. Connect repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy!

### Deploy to GitHub Pages
Add `"base": "/<repo-name>/"` to `vite.config.ts` and deploy `dist` using the standard GitHub Pages Action.

---

## 📁 Project Structure

```
repository ai/
├── dist/                          # Production build output
├── github-profile/                # GitHub Profile README assets
│   ├── assets/
│   │   ├── thor-banner.gif        # Animated lightning banner GIF
│   │   └── thor-banner.svg        # Responsive animated SVG banner
│   └── README.md                  # Profile README for barathcbe06-gif/barathcbe06-gif
├── public/                        # Static assets (favicons, banners)
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ThorScene.tsx      # Master 3D WebGL Canvas
│   │   │   ├── ThorWarrior.tsx    # Procedural Norse Thunder Warrior
│   │   │   ├── MjolnirHammer.tsx  # Detailed 3D Mjölnir with glowing runes
│   │   │   ├── LightningStorm.tsx # Procedural dynamic branching lightning
│   │   │   └── VolumetricClouds.tsx # Storm clouds and floating electric sparks
│   │   ├── icons/
│   │   │   └── GithubIcon.tsx     # Crisp SVG GitHub icon
│   │   ├── AboutSection.tsx       # Origin / Dossier section
│   │   ├── ContactSection.tsx     # Transmit / Extraordinary CTA
│   │   ├── CyberCursor.tsx        # Custom targeting crosshair cursor
│   │   ├── Footer.tsx             # Footer with Elder Futhark runes
│   │   ├── GitHubTelemetrySection.tsx # Oscilloscope waveforms & live stats
│   │   ├── Hero.tsx               # Cinematic hero overlay & summons
│   │   ├── Navbar.tsx             # HUD navigation with status indicators
│   │   ├── ProjectModal.tsx       # Interactive mission inspector modal
│   │   ├── ProjectsSection.tsx    # My Missions project cards
│   │   ├── SoundToggle.tsx        # Sound control toggle button
│   │   └── TechStackSection.tsx   # Segmented LEDs & rotating HUD radar
│   ├── types/
│   │   └── index.ts               # Data interfaces
│   ├── utils/
│   │   └── audio.ts               # Web Audio API sound synthesizers
│   ├── App.tsx                    # Master application component
│   ├── index.css                  # Master Vanilla CSS design system
│   └── main.tsx                   # Entry point
├── generate_banner_gif.py         # Generator script for animated banner GIF
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ How to Update Your GitHub Profile

To apply the redesigned Thor-themed profile to your personal GitHub account:
1. Open your special GitHub repository: [`https://github.com/barathcbe06-gif/barathcbe06-gif`](https://github.com/barathcbe06-gif/barathcbe06-gif).
2. Upload `github-profile/assets/thor-banner.gif` (and/or `thor-banner.svg`) into an `assets/` folder in that repo.
3. Replace the contents of the `README.md` with the contents of [`github-profile/README.md`](github-profile/README.md).
4. Commit the changes, and your GitHub profile will immediately showcase the cinematic Thor experience!

---

*Forged with React, Three.js & Asgardian Thunder by Barath P.*
