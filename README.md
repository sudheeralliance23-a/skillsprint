# SkillSprint — Mobile App & Web Platform

An AI-powered, gamified skill-development platform built with **React Native (Expo)**, **Firebase Auth & Firestore**, and **React Navigation**.

---

## ⚡ Instant Vercel Deployment

This project is pre-configured with [`vercel.json`](./vercel.json) for automatic continuous deployment to Vercel.

### Method 1: Deploy with Vercel CLI (Fastest)
1. Open PowerShell or Terminal in this folder:
   ```bash
   cd C:\Users\chvss\.gemini\antigravity\scratch\skillsprint
   ```
2. Run Vercel CLI:
   ```bash
   npx vercel
   ```
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

### Method 2: Deploy via GitHub / Vercel Web Dashboard
1. Push this folder to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial SkillSprint commit"
   git remote add origin https://github.com/YOUR_USERNAME/skillsprint.git
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new) and select **Import**.
3. Vercel automatically reads `vercel.json` with the pre-set build settings:
   - **Build Command**: `npm run build:web` (`expo export --platform web`)
   - **Output Directory**: `dist`
   - **SPA Routing**: Handled automatically via `rewrites` in `vercel.json`
4. Click **Deploy** to get your live URL (e.g. `https://skillsprint-app.vercel.app`).

---

## 📱 Local Development & Mobile Preview

### Run Web App Locally
```bash
node serve_app.js
# Opens on http://localhost:8080
```

### Run on iOS / Android via Expo Go
```bash
npx expo start
```
- Scan QR code with the **Expo Go** mobile app.
- Press `w` to open in browser.
- Press `a` for Android Emulator / `i` for iOS Simulator.
