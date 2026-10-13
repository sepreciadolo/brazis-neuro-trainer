# Brazis Neuro Trainer — Deployment & Mobile Installation Guide

This guide describes how to deploy the application privately and install it as an offline Progressive Web Application (PWA) on your mobile phone (iOS / Android).

---

## 1. Security & Copyright Gate

Because *Localization in Clinical Neurology* (Brazis et al.) is copyrighted material for **personal study only**, the app includes a client-side study lock:

- **Default Study Passcode:** `brazis`
- **Custom Passcode:** When deploying, you can optionally set the environment variable:
  ```env
  VITE_STUDY_PIN=your_custom_pin_here
  ```
- **How it works:** Once you enter the passcode on your phone, your session is permanently authorized in local storage. You will never need to enter it again on that phone, and the app will function 100% offline.
- **Locking:** You can re-lock the app at any time in **Settings > Security & Access > Lock Now**.

---

## 2. Option A: Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select `sepreciadolo/brazis-neuro-trainer`.
3. Vercel automatically detects Vite settings using the bundled [`vercel.json`](file:///c:/Users/rodri/Desktop/Brazis/vercel.json).
4. *(Optional)* Under **Environment Variables**, add:
   - `VITE_STUDY_PIN` = `your_secret_passcode`
5. Click **"Deploy"**.
6. In ~60 seconds, your private URL will be active (e.g. `https://brazis-neuro-trainer.vercel.app`).

---

## 3. Option B: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and log in with your GitHub account.
2. Click **"Add new site" > "Import an existing project"** and connect GitHub repository `sepreciadolo/brazis-neuro-trainer`.
3. Netlify automatically reads [`netlify.toml`](file:///c:/Users/rodri/Desktop/Brazis/netlify.toml).
4. Click **"Deploy"**.

---

## 4. Installing on your Mobile Phone (Offline PWA)

### On iOS (iPhone / iPad)
1. Open your deployed URL in **Safari**.
2. Tap the **Share** button (the square with an arrow pointing up at the bottom).
3. Scroll down and tap **"Add to Home Screen"** (*Añadir a pantalla de inicio*).
4. Tap **Add**. An app icon will appear on your home screen.
5. Launch the app from your home screen, enter the passcode once, and you can study offline anywhere, even in airplane mode inside the hospital.

### On Android
1. Open your deployed URL in **Google Chrome**.
2. Tap the three dots (menu) at the top right, or wait for the bottom prompt **"Install Brazis Neuro Trainer"**.
3. Tap **"Install"** or **"Add to Home screen"**.
4. The app installs as a standalone application.
