# Sip Support

A creator support platform built with Next.js, MongoDB, and Razorpay.

Creators get a public profile where supporters can leave a message and make a payment.

**Live:** https://sip-support.vercel.app/

## Preview

| Desktop | Mobile |
|:---:|:---:|
| ![Desktop](./screenshots/home.png) | ![Mobile](./screenshots/mobile.png) |

## What you can do

- Sign in with GitHub or Google
- Create a public creator profile
- Customize your profile and images
- Explore and search other creators
- Send a payment with a message
- View supporter activity on a creator page

## The payment flow

The payment flow was the main part I wanted to get right.

When a supporter starts a payment, the server creates the Razorpay order and stores the initial payment record in MongoDB. After checkout, the payment response is sent back to the server rather than being trusted directly in the browser.

The server verifies the Razorpay signature using the payment details and the creator's credentials before marking the payment as completed.

This keeps the final payment state on the server instead of relying on the client callback alone.

## A few other things

Authentication is handled with NextAuth and GitHub/Google OAuth. New users get a unique handle when their account is created.

MongoDB connections are cached between warm serverless invocations so each request doesn't unnecessarily create a new database connection.

The creator pages use dynamic routes (`/[username]`), while the explore page combines text search with category filtering.

## Built with

Next.js · React · JavaScript · Tailwind CSS · MongoDB · Mongoose · NextAuth · Razorpay

## Run locally

    git clone https://github.com/hritikbytes/sipsupport-patreonsite.git
    cd sipsupport-patreonsite
    npm install

Copy `.env.example` to `.env.local` and add the required MongoDB, OAuth, NextAuth, and Razorpay configuration.

Optional sample data:

    npm run seed

Start the development server:

    npm run dev

Then open `http://localhost:3000`.

## Status

Personal project / deployed demo.
