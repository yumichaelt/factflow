# Architecture Overview

This document provides an overview of the FactFlow AI application architecture.

## 1. Overview

FactFlow AI is a web application built with Next.js and TypeScript. It appears to be a chat-based application that leverages Google's Generative AI. User authentication and backend services are handled by Supabase.

## 2. Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React framework)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication & Backend:** [Supabase](https://supabase.io/)
- **AI:** [Google Generative AI](https://ai.google/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linting:** [ESLint](https://eslint.org/)

## 3. Project Structure

The project follows a standard Next.js App Router structure.

```
/
├── .next/              # Next.js build output
├── node_modules/       # Project dependencies
├── public/             # Static assets (images, fonts, etc.)
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── auth/       # Authentication pages and logic
│   │   ├── login/      # Login page
│   │   ├── signup/     # Signup page
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Main application page
│   ├── components/     # Reusable React components
│   └── lib/            # Libraries and helper functions
│       └── supabase/   # Supabase client and server setup
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 4. Authentication

Authentication is implemented using Supabase. The flow is as follows:

1.  **User Actions:** Users can sign up or log in through the `/signup` and `/login` pages.
2.  **Supabase Client:** The Supabase client in `src/lib/supabase/client.ts` is used on the client-side to interact with Supabase Auth.
3.  **Server-Side:** The Supabase server client in `src/lib/supabase/server.ts` is used for server-side authentication checks and operations.
4.  **Middleware:** `src/middleware.ts` and `src/lib/supabase/middleware.ts` likely handle session management and protecting routes.
5.  **Callbacks:** The `/auth/callback/route.ts` handles the OAuth callback from Supabase.

## 5. API Endpoints

The primary API endpoint is `/api/chat`.

### `/api/chat`

-   **File:** `src/app/api/chat/route.ts`
-   **Purpose:** This endpoint likely handles the chat functionality of the application. It probably receives user messages, interacts with the Google Generative AI API, and streams the response back to the client.

## 6. Frontend

The frontend is built with React and Tailwind CSS.

-   **`src/app/page.tsx`:** The main entry point of the application's UI.
-   **`src/app/layout.tsx`:** The root layout component, which likely includes the `Header` and `Footer`.
-   **`src/components/`:** This directory contains reusable components:
    -   `Header.tsx`: The application header.
    -   `Footer.tsx`: The application footer.
    -   `ChatModal.tsx`: The UI for the chat interface.
