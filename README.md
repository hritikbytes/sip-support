# Sip Support

A creator tipping and support platform inspired by Buy Me a Coffee and Patreon. It allows independent creators to set up a public page and receive direct payments from supporters into their own Razorpay account.

**Live Demo:** https://sip-support.vercel.app  
**Status:** Personal project / deployed demo

---

## Preview

| Desktop | Mobile |
|:---:|:---:|
| <a href="https://sip-support.vercel.app"><img src="./screenshots/home.png" alt="Sip Support desktop preview" width="100%"></a> | <a href="https://sip-support.vercel.app"><img src="./screenshots/mobile.png" alt="Sip Support mobile preview" width="100%"></a> |

---

## What It Does

- **Creator Pages (`/[username]`):** Public creator profiles with custom avatar, cover image, supporter counter, recent supporter messages, and a payment widget.
- **Direct Supporter Payments:** Supporters can pick preset amounts (₹100, ₹300, ₹500) or enter a custom amount, add their name and a message, and check out via Razorpay.
- **Creator Dashboard (`/dashboard`):** Creators can customize their display name, handle, avatar/cover photo URLs, and input their personal Razorpay Key ID and Secret.
- **Authentication:** OAuth sign-in with GitHub and Google using NextAuth. New accounts are automatically provisioned with a unique handle in MongoDB.
- **Discovery Pages:**
  - `/explore` — Search creators by name, handle, or bio with category filtering.
  - `/creators` — Creator spotlights and directory of active registered creators.
  - `/about` — Platform overview and FAQ.

---

## Implementation Details

### 1. Dynamic Per-Creator Payment Routing
Instead of holding funds in a central platform account and manually disbursing payouts, each creator saves their own Razorpay Key ID and Secret in their dashboard settings.

When a supporter initiates a payment on `/[username]`:
1. The server action (`initiate`) looks up the creator's record in MongoDB.
2. It initializes a Razorpay instance using that specific creator's `razorpayId` and `razorpaySecret`.
3. An order is generated through Razorpay's Orders API and stored as an unverified payment record.
4. The client opens the Razorpay modal configured with that creator's public Key ID.

### 2. Server-Side HMAC Signature Verification
Payment success cannot be trusted purely from the client callback. Once Razorpay completes the transaction:
1. The payment response (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`) is sent to `/api/razorpay`.
2. The server fetches the recipient creator's secret and re-computes the HMAC SHA256 signature (`order_id + "|" + payment_id`).
3. Only if the signature matches does the server mark the payment as completed (`done: true`) in MongoDB and redirect the supporter with a success notification.

### 3. Serverless Database Connection Caching
Next.js API routes and server actions run in serverless functions where instances may freeze or spin down. `src/app/lib/db.js` caches the Mongoose connection and promise globally across invocations, preventing connection exhaustion on MongoDB Atlas during warm restarts.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Server Actions)
- **UI:** React 19, Tailwind CSS v4, Google Fonts (Outfit, Caveat)
- **Database:** MongoDB Atlas via Mongoose
- **Auth:** NextAuth.js v4 (GitHub & Google OAuth)
- **Payments:** Razorpay Node SDK & Razorpay Checkout modal
- **Deployment:** Vercel

---

## Project Structure

```text
├── public/              # Static assets (logos, default avatar, SVGs)
├── screenshots/         # Desktop and mobile UI previews
├── scripts/
│   └── seed.js          # MongoDB seeder for sample creators & donations
├── src/
│   ├── actions/
│   │   └── useractions.js  # Server actions (orders, payments, profile)
│   ├── app/
│   │   ├── [username]/  # Dynamic public creator profile
│   │   ├── about/       # Platform FAQ and explainer
│   │   ├── api/
│   │   │   ├── auth/    # NextAuth route handler
│   │   │   └── razorpay/# Razorpay webhook & verification redirect
│   │   ├── components/  # Navbar, Footer, PaymentPage, Toast, CardSpotlight
│   │   ├── creators/    # Creator spotlight directory
│   │   ├── dashboard/   # Creator settings and Razorpay key setup
│   │   ├── explore/     # Search and category-filtered discovery
│   │   ├── lib/
│   │   │   └── db.js    # Cached Mongoose connection
│   │   ├── models/      # User & Payment Mongoose schemas
│   │   ├── globals.css  # Tailwind v4 theme and styling
│   │   ├── layout.js    # Root layout with providers and fonts
│   │   └── page.js      # Landing page
```

---

## Local Development

### 1. Clone & Install

```bash
git clone https://github.com/hritikbytes/sipsupport-patreonsite.git
cd sipsupport-patreonsite
npm install
```

### 2. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/sipsupport?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### 3. Seed Sample Data (Optional)

To populate sample creators (`@alexrivera`, `@elenacart`, etc.) and sample supporter history:

```bash
npm run seed
```

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Author

**Hritik Sharma**
- GitHub: [@hritikbytes](https://github.com/hritikbytes)
- LinkedIn: [linkedin.com/in/hritiksharma0608](https://www.linkedin.com/in/hritiksharma0608/)
- Email: hritiksharma.0608@gmail.com
