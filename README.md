# 🛠️ Next.js DevOps Deployment Guide

This guide is for DevOps teams deploying and managing a **Next.js** application using the native Node.js build and start workflow (`npm run build && npm run start`).

---

## 📦 Project Overview

- **Framework**: Next.js (React)
- **Rendering**: Hybrid (SSG + SSR)
- **Deployment Target**: Bare metal / VM / Cloud (Node.js runtime)
- **CI/CD**: GitHub Actions / GitLab CI / Jenkins
- **Start Command**: `npm run build && npm run start`

---

## 🚀 Deployment Instructions

### 1. **System Requirements**

- Node.js ≥ 18.x
- npm ≥ 9.x
- PM2 or similar process manager (recommended)

### 2. **Build & Run**

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Start the server
npm run start
```
