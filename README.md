# ☕ Sip Support — Creator Crowdfunding & Direct Monetization Platform

> Empowering independent creators to monetize their passion through frictionless micro-donations and direct-to-bank peer-to-peer payouts with zero platform intermediary fees.

[![Live Demo](https://img.shields.io/badge/Live_Demo-sip--support.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://sip-support.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS 4](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_M0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Razorpay](https://img.shields.io/badge/Payment-Razorpay-0C2340?style=for-the-badge&logo=razorpay&logoColor=00BAF2)](https://razorpay.com/)

---

## 📸 Preview

| Desktop Experience | Mobile Responsive |
| :---: | :---: |
| ![Landing Page](./public/logo.svg) <br><sub>*Modern Glassmorphic Dark-Mode Landing Page*</sub> | ![Mobile View](./public/logo.svg) <br><sub>*Mobile-First Fluid Checkout Experience*</sub> |

*(Tip: Place your actual application screenshots in `./screenshots/home.png` and `./screenshots/mobile.png`)*

---

## 🚀 Key Features

- **⚡ Direct Creator-to-Bank Payouts:** Implemented dynamic Razorpay gateway routing where each creator connects their own API keys, bypassing platform escrow and eliminating intermediary cut fees.
- **🔐 Robust OAuth Authentication & Session Management:** Engineered passwordless authentication using NextAuth v4 (GitHub & Google OAuth providers) with automatic user provisioning and edge session synchronizations.
- **🎨 Glassmorphic Dark-Mode UI & Interactive Micro-Animations:** Designed a bespoke, modern dark-themed interface built on Tailwind CSS v4 and Google Outfit typography, featuring card spotlight hover effects and interactive pulse inputs.
- **📊 Real-time Creator Dashboard:** Provides creators with comprehensive profile customization (custom handles, cover banners, avatars) and direct integration management for secure payout credentials.
- **🛡️ Server-Side Cryptographic Signature Verification:** Secured payment webhooks and status verifications using server-side HMAC-SHA256 checksums to prevent transaction spoofing.
- **🔍 Dynamic Discovery & Spotlight Leaderboards:** Leveraged Next.js dynamic server components (`force-dynamic`) with Mongoose connection pooling for high-performance creator discovery and live leaderboards.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS
- **Icons & Typography:** Heroicons, React Icons, Google Fonts (Outfit)

### **Backend & Database**
- **Runtime:** Node.js (Serverless on Vercel Edge/Lambdas)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Mongoose ODM)
- **Authentication:** [NextAuth.js v4](https://next-auth.js.org/)
- **Payment Processing:** [Razorpay Node SDK & Checkout JS](https://razorpay.com/docs/)

### **Tools & DevOps**
- **Hosting:** [Vercel](https://vercel.com/)
- **Version Control:** Git & GitHub
- **Package Manager:** npm

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/hritikbytes/sipsupport-patreonsite.git
cd sipsupport-patreonsite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local`:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sipsupport?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_32_byte_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start the development server
```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## 💡 Technical Challenges & Learning

Architecting a decentralized creator payout system on serverless infrastructure presented two notable technical hurdles:

1. **Serverless Database Connection Churn:** On Vercel's ephemeral serverless instances, traditional MongoDB connections risk exhausting connection pools across distributed invocations. To solve this, I engineered a cached global Mongoose promise singleton pattern with auto-reset fallback routines to guarantee zero connection leakage during cold starts and warm function reuse.
2. **Multi-Tenant Gateway Routing & Verification:** Rather than centralizing funds into a platform master account, the platform dynamically fetches each creator's encrypted Razorpay credentials to generate distinct orders at runtime. The payment callback then computes a strict `HMAC-SHA256` digest comparing the incoming `razorpay_order_id`, `razorpay_payment_id`, and the creator's secret key, ensuring ironclad financial integrity and instantaneous transaction validation.

---

## 🛣 Roadmap

- [ ] **Subscription & Tiered Memberships:** Introduce monthly recurring supporter subscriptions alongside one-time tips.
- [ ] **Custom Creator Domains:** Support custom CNAME domain mapping (e.g., `tips.creatorname.com`).
- [ ] **Supporter Leaderboard & Badges:** Gamified supporter recognition with top-backer badges and custom emojis.
- [ ] **Multi-Currency Payouts:** Integrate Stripe to support international creators and multi-currency billing.
- [ ] **Creator Analytics:** Visual graphs tracking earnings, top patrons, and conversion metrics over time.

---

## 🤝 Contact

**Developer:** Hritik Sharma  
- **LinkedIn:** [linkedin.com/in/hritiksharma0608](https://www.linkedin.com/in/hritiksharma0608/)  
- **GitHub:** [@hritikbytes](https://github.com/hritikbytes)  
- **Email:** [hritiksharma.0608@gmail.com](mailto:hritiksharma.0608@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ by <b>Hritik Sharma</b>. If you find this project inspiring, please consider giving it a ⭐!</sub>
</div>
