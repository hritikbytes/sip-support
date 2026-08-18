# ☕ Sip Support

> An independently developed full-stack project exploring creator monetization, payment integration, authentication, and server-side transaction verification.

[![Live Demo](https://img.shields.io/badge/Live_Demo-sip--support.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://sip-support.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2340?style=for-the-badge&logo=razorpay&logoColor=00BAF2)](https://razorpay.com/)

**Live demo:** https://sip-support.vercel.app

---

## Overview

Sip Support is an independently developed full-stack web application built with Next.js, React, MongoDB, and Razorpay.

The project explores how a creator-support platform could handle creator profiles, authentication, payment initiation, payment verification, and transaction persistence while supporting creator-specific payment configurations.

It was built as a personal project to experiment with multi-creator payment routing, server-side validation, database integration, and serverless application architecture.

---

## 📸 Preview

| Desktop | Mobile |
|:---:|:---:|
| <a href="https://sip-support.vercel.app"><img src="./screenshots/home.png" alt="Sip Support desktop interface" width="100%"></a> | <a href="https://sip-support.vercel.app"><img src="./screenshots/mobile.png" alt="Sip Support mobile interface" width="100%"></a> |
| *Desktop interface* | *Responsive mobile interface* |

---

## ✨ Core Features

### Creator Profiles

- Custom creator handles
- Public creator profile pages
- Profile avatars and cover images
- Creator discovery
- Creator-specific payment configuration

### Authentication

- GitHub OAuth
- Google OAuth
- NextAuth session management
- Automatic user provisioning
- Protected application routes

### Payment Integration

- Razorpay Checkout integration
- Creator-specific payment routing
- Server-side payment order creation
- Server-side payment signature verification
- Transaction persistence
- Payment status validation

### Creator Dashboard

- Profile management
- Creator handle configuration
- Cover and avatar management
- Payment integration configuration
- Creator-specific account information

### UI & Experience

- Responsive desktop and mobile layouts
- Dark glassmorphic interface
- Tailwind CSS v4
- Interactive hover states
- Micro-animations
- Responsive checkout experience

---

## 🏗️ Architecture

The application uses a Next.js full-stack architecture where the frontend, server-side application logic, authentication, and API routes are maintained within the same project.

```text id="9f9c12"
                         ┌─────────────────────┐
                         │       Browser       │
                         │   React / Next.js   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Next.js 16      │
                         │     App Router      │
                         │                     │
                         │ Server Components   │
                         │ Route Handlers      │
                         │ Server-side Logic   │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌───────────┐   ┌────────────┐   ┌─────────────┐
             │ NextAuth  │   │  MongoDB   │   │  Razorpay   │
             │   OAuth   │   │   Atlas    │   │   Payments  │
             └───────────┘   └────────────┘   └─────────────┘
                                    │
                                    ▼
                             ┌────────────┐
                             │   Vercel   │
                             └────────────┘
```

---

## 💳 Payment Flow

The payment workflow keeps order creation and payment verification on the server.

```text id="1b5d9e"
Supporter
    │
    ▼
Creator Profile
    │
    ▼
Payment Request
    │
    ▼
Server validates creator configuration
    │
    ▼
Razorpay Order Creation
    │
    ▼
Razorpay Checkout
    │
    ▼
Payment Completed
    │
    ▼
Server-side Signature Verification
    │
    ▼
Transaction Persistence
    │
    ▼
Payment Result
```

Client-side payment responses are not treated as trusted input. The server verifies the payment signature before accepting the transaction as verified.

---

## 🔐 Security Approach

The project keeps security-sensitive operations on the server where possible.

### Authentication

- GitHub and Google OAuth through NextAuth
- Server-side session handling
- Protected application routes
- Authenticated creator operations

### Payment Verification

Razorpay payment responses are verified server-side using cryptographic signature verification before the application accepts the payment as valid.

### Environment Variables

Secrets and credentials are supplied through environment variables rather than being committed to the repository.

```text id="b6i5fs"
.env.local       → local secrets
.env.example     → configuration reference
```

Production credentials should always be configured through the deployment environment.

---

## 🧠 Engineering Decisions

### 1. Server-side payment verification

Payment information returned to the browser cannot be trusted by itself.

The application verifies the Razorpay signature on the server before treating the payment as valid.

This keeps the verification logic outside the client and provides a controlled path for transaction validation.

---

### 2. Creator-specific payment routing

The project was designed around the idea that different creators can have their own payment configuration.

When a supporter initiates a payment, the server determines the relevant creator configuration before creating the Razorpay order.

This avoids treating all creators as a single payment account within the application logic.

---

### 3. MongoDB connection reuse

Serverless functions can create multiple application instances over time.

Creating a new MongoDB connection for every invocation can unnecessarily increase connection usage.

The application therefore uses a cached Mongoose connection/promise pattern so warm instances can reuse an existing connection where possible.

---

### 4. Dynamic creator discovery

Creator profiles and discovery data are retrieved dynamically from MongoDB so newly created or updated profiles can be reflected without relying entirely on build-time data.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** — App Router
- **React 19**
- **Tailwind CSS v4**
- **Heroicons**
- **React Icons**
- **Google Fonts — Outfit**

### Backend

- **Next.js Route Handlers**
- **Node.js**
- **NextAuth.js v4**
- **Mongoose**

### Database

- **MongoDB Atlas**

### Payments

- **Razorpay Checkout**
- **Razorpay Node SDK**
- Server-side payment signature verification

### Deployment & Tools

- **Vercel**
- **Git**
- **GitHub**
- **npm**

---

## 📁 Project Structure

```text id="8m3e6s"
sipsupport-patreonsite/
│
├── public/
│   └── assets/
│
├── screenshots/
│   ├── home.png
│   └── mobile.png
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── dashboard/
│   │   └── ...
│   │
│   ├── components/
│   ├── lib/
│   └── ...
│
├── .env.example
├── .gitignore
├── DEPLOYMENT_GUIDE.md
├── next.config.mjs
├── package.json
└── README.md
```

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account
- GitHub OAuth application
- Google OAuth application (optional)
- Razorpay account

### 1. Clone the repository

```bash id="8spjmm"
git clone https://github.com/hritikbytes/sipsupport-patreonsite.git
cd sipsupport-patreonsite
```

### 2. Install dependencies

```bash id="c0t6jx"
npm install
```

### 3. Configure environment variables

Create `.env.local` from the example file:

```bash id="g31qae"
cp .env.example .env.local
```

Configure the required variables:

```env id="xw6d6g"
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Payment configuration is handled through the creator payment integration flow.

Never commit `.env.local` or production credentials.

### 4. Start the development server

```bash id="q3jp2h"
npm run dev
```

Open:

```text id="0i5ezv"
http://localhost:3000
```

---

## 🔧 Environment Variables

| Variable | Purpose | Required |
|---|---|:---:|
| `MONGODB_URI` | MongoDB connection | Yes |
| `NEXTAUTH_SECRET` | NextAuth session secret | Yes |
| `NEXTAUTH_URL` | Authentication callback URL | Yes |
| `NEXT_PUBLIC_URL` | Application URL | Yes |
| `GITHUB_ID` | GitHub OAuth client ID | Yes |
| `GITHUB_SECRET` | GitHub OAuth secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |

---

## 🧪 Testing & Development

The project can be extended with automated testing around its most important flows.

Recommended coverage includes:

- Authentication
- Creator profile creation
- Payment order creation
- Invalid payment signature rejection
- Successful transaction persistence
- Protected route access
- Creator-specific payment configuration

For end-to-end testing, Playwright would be a suitable addition for validating the complete supporter payment journey.

---

## 🛣️ Future Improvements

- [ ] Subscription and recurring memberships
- [ ] Creator analytics dashboard
- [ ] Custom creator domains
- [ ] Supporter badges and recognition
- [ ] Multi-currency payment support
- [ ] Transaction history improvements
- [ ] Payment failure and retry handling
- [ ] Automated payment notifications
- [ ] End-to-end testing
- [ ] CI checks for linting and production builds

These are potential future extensions rather than features currently claimed as implemented.

---
## 📊 Project Status

**Status:** Personal project / deployed demo

Sip Support is an independently developed project created to explore full-stack web development, payment integrations, authentication, database design, and serverless application architecture.

The application is deployed on Vercel for demonstration purposes.

---

## 👨‍💻 Developer

**Hritik Sharma**

Web Developer focused on React, Next.js, TypeScript, and modern full-stack web development.

- **GitHub:** [@hritikbytes](https://github.com/hritikbytes)
- **LinkedIn:** [linkedin.com/in/hritiksharma0608](https://linkedin.com/in/hritiksharma0608/)
- **Email:** [hritiksharma.0608@gmail.com](mailto:hritiksharma.0608@gmail.com)

---

<div align="center">

**Built independently by Hritik Sharma**

[Live Demo](https://sip-support.vercel.app) · [GitHub Repository](https://github.com/hritikbytes/sipsupport-patreonsite)

</div>
