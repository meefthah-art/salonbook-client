# SalonBook

A salon appointment booking platform. Customers browse services, request appointments and pay online once an appointment is confirmed. The admin manages services, appointments, customers and transactions.

**Live website: https://salonbook-client-l63f.vercel.app
**Client repository: https://github.com/meefthah-art/salonbook-client.git
**Server repository: https://github.com/meefthah-art/salonbook-server.git

## Important Features

- Browse active services with search by name, category filter and price sorting
- Better Auth sign up and sign in with email and password or Google
- Role based dashboards for customers and the admin, checked again on the server
- Customers can request appointments, cancel pending requests and pay for confirmed ones
- Stripe Checkout payments, with the payment status updated only by a verified webhook
- Admin can add, update, delete, activate and deactivate services, with image upload through ImgBB
- Admin can confirm or cancel appointments, block or unblock customers and view transactions
- Profile update for every user, fully responsive layout

## Technology Stack

Next.js (App Router), JavaScript, Tailwind CSS, DaisyUI, Better Auth, Express.js, MongoDB, JWT, Stripe, ImgBB

## Installation

```
git clone <this repo>
cd salonbook-client
npm install
```

## How to Run Locally

1. Copy `.env.example` to `.env.local` and fill in the values
2. Start the server project first (see the server README)
3. Run `npm run dev` and open http://localhost:3000

## Required Environment Variables

Names only:

- `API_URL`
- `INTERNAL_SECRET`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `MONGODB_URI`
- `DB_NAME`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `IMGBB_API_KEY`
