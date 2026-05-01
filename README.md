This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

Before running the application, you need to set up Firebase configuration:

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure Firebase credentials:**
   - Open `.env.local` and replace the placeholder values with your actual Firebase configuration
   - You'll need credentials for TWO Firebase projects:
     - **Main App** (thesportify): For general authentication and data
     - **RKM Registration** (sportify-iitm): For Rashtriya Khel Mahotsav registration

3. **Get Firebase credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the configuration values to your `.env.local` file

### Run the development server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

This project uses environment variables to securely store Firebase configuration. 

### Important Security Notes:

⚠️ **NEVER commit `.env.local` to version control** - It contains sensitive API keys
✅ **DO commit `.env.example`** - It serves as a template for other developers
🔒 **Keep your Firebase keys secure** - Don't share them publicly

### Available Environment Variables:

#### Main Firebase App (thesportify)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

#### RKM Registration Firebase (sportify-iitm)
- `NEXT_PUBLIC_RKM_FIREBASE_API_KEY`
- `NEXT_PUBLIC_RKM_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_RKM_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_RKM_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_RKM_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_RKM_FIREBASE_APP_ID`
- `NEXT_PUBLIC_RKM_FIREBASE_MEASUREMENT_ID`

### Deployment

When deploying to production (Vercel, Netlify, etc.), make sure to add all these environment variables in your hosting platform's dashboard.

