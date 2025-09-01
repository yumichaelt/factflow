# Development Roadmap

## Phase 1: Core Functionality (Mostly Complete)

*   [x] User authentication with Supabase.
*   [x] Core AI chat functionality with streaming responses.
*   [x] Basic frontend structure with a chat modal.

## Phase 2: Subscription Infrastructure (Next Steps)

*   **1. User Profile Management:**
    *   Create a `profiles` table in your Supabase database to store user data, including their current subscription tier (e.g., `free` or `pro`).
    *   This table will be linked to the `auth.users` table using the user's ID.

*   **2. Payment Integration:**
    *   Integrate a payment provider like **Stripe** to handle recurring subscriptions.
    *   Create a checkout page or component where users can upgrade to the Pro tier.
    *   **Important Note for Stripe Integration:**
        1.  Store Tier in Stripe: When you create your products in Stripe, add a "tier" key to the metadata. For example, for
            your "Pro" plan, add metadata: `tier: "pro"`. This will be automatically synced to the `metadata` column in your
            products table.
        2.  Query the View: You can now query the `user_profiles_with_tier` view to get a user's subscription tier, which will
            be `pro`, `free`, or `null`.

*   **3. Subscription Status Webhook:**
    *   Create a new API endpoint (e.g., `/api/stripe-webhook`) to listen for events from Stripe.
    *   When a user successfully subscribes or cancels, Stripe will send an event to this endpoint, and we'll update the user's subscription tier in our `profiles` table.

## Phase 3: Feature Implementation & Gating

*   **1. Fact History:**
    *   Create a `fact_history` table in Supabase to store the facts that users have viewed.
    *   On the frontend, fetch and display the user's fact history.
    *   Implement the logic to show the last 3 days for free users and unlimited history for Pro users.

*   **2. Usage Limits (Free Tier):**
    *   Implement logic to track daily usage for free users. This will likely involve adding columns to the `profiles` table to track the last reset date and daily counts for facts and chat messages.
    *   On the backend, protect the relevant API endpoints to enforce these limits.
    *   On the frontend, display a message to the user when they have reached their daily limit.

*   **3. Category Selection (Pro Tier):**
    *   Add a settings page or component where Pro users can select their preferred fact categories.
    *   Update the logic for fetching daily facts to respect the user's category preferences.

## Phase 4: Content Automation

*   **1. Create `facts` table:** Design and create a table in Supabase to store the library of facts.
*   **2. Create Scheduled Job:** Set up a daily scheduled job to generate new facts.
*   **3. Implement Fact Generation Logic:** Write the code to call the Gemini API, generate a new fact, and save it to the database.
*   **4. Update Fact Serving Logic:** Modify the application to serve daily facts from the new `facts` table.

## Phase 5: Pre-launch Polish

*   UI/UX improvements.
*   Testing and bug fixing.
*   Adding analytics and monitoring.

## Phase 6: Launch

*   Deploy the application to a hosting provider (e.g., Vercel).
