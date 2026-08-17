# Free Production Deployment Guide: Vercel + MongoDB Atlas

This guide walks you through deploying **Sip Support** 100% free using **Vercel** (for hosting the Next.js app) and **MongoDB Atlas** (for the database).

---

## 📋 Prerequisites Checklist
- [x] Next.js project prepared for serverless deployment
- [ ] Free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) Account
- [ ] Free [Vercel](https://vercel.com/signup) Account
- [ ] GitHub Repository for your project

---

## Step 1: Set Up MongoDB Atlas (Free M0 Cluster)

1. **Sign Up / Log In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. **Create a Free Cluster**:
   - Click **Create Deployment** / **Build a Database**.
   - Choose the **M0 Free (Shared)** tier.
   - Choose a cloud provider and region closest to your users (e.g., AWS / `ap-south-1` Mumbai or `us-east-1` N. Virginia).
   - Click **Create**.
3. **Create Database User Credentials**:
   - In **Security** > **Database Access**, click **Add New Database User**.
   - Select **Password Authentication**.
   - Enter a username (e.g. `dbuser`) and secure password (avoid special characters like `@` or `:` in the password, or URL-encode them).
   - Set privileges to **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access (Crucial for Vercel)**:
   - In **Security** > **Network Access**, click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`). *(This is required because Vercel uses dynamic serverless IP pools).*
   - Click **Confirm**.
5. **Get Connection String**:
   - Go to **Databases** > Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
   - Add the database name `/sipsupport` before the `?` query string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sipsupport?retryWrites=true&w=majority
     ```

---

## Step 2: Configure OAuth Providers for Production

NextAuth requires OAuth apps configured with your production domain.

### A. GitHub OAuth App
1. Go to [GitHub Developer Settings > OAuth Apps](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in the details:
   - **Application name**: `Sip Support`
   - **Homepage URL**: `https://your-app-name.vercel.app` (or your custom domain)
   - **Authorization callback URL**: `https://your-app-name.vercel.app/api/auth/callback/github`
4. Register the app, then copy your **Client ID** and generate a **Client Secret**.

### B. Google OAuth App (Optional / Recommended)
1. Go to [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials).
2. Create or select a project.
3. Configure the **OAuth Consent Screen** (User type: External, add App Name & support email).
4. Go to **Credentials** > **Create Credentials** > **OAuth client ID**.
5. Choose **Web application**.
6. Under **Authorized redirect URIs**, add:
   - `https://your-app-name.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local development)
7. Save and copy the **Client ID** and **Client Secret**.

---

## Step 3: Deploy on Vercel (Free Hobby Tier)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "chore: prepare codebase for Vercel and MongoDB Atlas deployment"
   git push origin main
   ```

2. **Import Project to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** > **Project**.
   - Connect your GitHub account and click **Import** next to your `patreonsite` repository.
   - Framework Preset: **Next.js** (Auto-detected).
   - Root Directory: `./`.

3. **Add Environment Variables in Vercel**:
   In the **Environment Variables** section before clicking Deploy, add the following:

   | Key | Value | Description |
   |---|---|---|
   | `MONGODB_URI` | `mongodb+srv://.../sipsupport?retryWrites=true&w=majority` | Atlas connection string |
   | `NEXTAUTH_SECRET` | *(Generate via `openssl rand -base64 32`)* | JWT signing secret |
   | `NEXTAUTH_URL` | `https://your-app-name.vercel.app` | Canonical site URL |
   | `NEXT_PUBLIC_URL` | `https://your-app-name.vercel.app` | Public app URL |
   | `GITHUB_ID` | `Iv1.xxxxxxxxxxxx` | GitHub Client ID |
   | `GITHUB_SECRET` | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | GitHub Client Secret |
   | `GOOGLE_CLIENT_ID` | `xxxx-xxxx.apps.googleusercontent.com` | Google Client ID |
   | `GOOGLE_CLIENT_SECRET` | `GOCSPX-xxxxxxxxxxxx` | Google Client Secret |

4. **Deploy**:
   - Click **Deploy**.
   - Vercel will build and deploy your application in under 1 minute.
   - If your production Vercel URL is different from what you guessed, copy your actual `.vercel.app` domain and update `NEXTAUTH_URL`, `NEXT_PUBLIC_URL`, and your OAuth callback URLs accordingly.

---

## Step 4: Verification & Creator Setup

1. **Visit your live URL**: `https://your-app-name.vercel.app`.
2. **Log In**:
   - Click **Login** and authenticate with GitHub or Google.
   - Verify that your user is automatically saved into MongoDB Atlas (check Collections in Atlas Dashboard > `users`).
3. **Set Up Creator Settings**:
   - Go to **Dashboard**.
   - Customize your display name, handle (`username`), and profile details.
   - Add your test/live **Razorpay Key ID** and **Razorpay Key Secret** to enable payouts on your creator page.
4. **Test Payments**:
   - Navigate to `https://your-app-name.vercel.app/<username>`.
   - Make a test payment to ensure Razorpay modal opens and processes correctly.
