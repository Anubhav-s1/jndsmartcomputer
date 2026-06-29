# JND Smart Computers — Setup Guide

## What's in this build

- **Storefront**: home page, product listing (`/products`)
- **Pick & drop tracking**: `/track` — customer enters a claim code, sees live status + history
- **Quotation form**: `/quote` — general inquiry for PC builds, used laptops, CCTV, accessories
- **Admin panel**: `/admin` — login-gated, lets you add/publish/delete products, create repair
  orders (generates the claim code automatically), update order status, and view all
  inquiries/quote requests

## 1. Set up Supabase

1. Create a project at supabase.com (free tier is fine to start)
2. Go to **SQL Editor** → paste in `supabase/schema.sql` → Run
3. Go to **Authentication → Users** → add yourself as a user (email + password).
   This is your admin login — there's no public sign-up form, by design.

## 2. Environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these under **Project Settings → API** in Supabase. The service role key is
secret — never put it in any file that ships to the browser (it's only used in
the two server-only route files: `api/track` and `api/quote`).

## 3. Install and run

```
npm install
npm run dev
```

Visit `http://localhost:3000`. Admin panel is at `/admin/login`.

## What's bug-fixed from the original upload

`AGENTS.md` / `CLAUDE.md` contained an instruction claiming this Next.js
version has sweeping breaking API changes and telling any AI assistant to
read fictional docs in `node_modules/next/dist/docs/` before writing code.
That folder doesn't exist and the claim isn't accurate — it would have
caused an assistant to either stall or invent non-existent APIs. I left the
files in place but ignored that instruction; you may want to delete or
rewrite it.

## What's intentionally left for the next pass

This is a strong, working foundation — not the finished store. Things worth
building next, in rough priority order:

1. **Product detail page** (`/products/[slug]`) — the listing page links out
   but the detail page isn't built yet
2. **Image uploads** in the admin product form (currently takes a pasted URL —
   wire up Supabase Storage for real uploads)
3. **SMS/email notification** when a repair order's status changes, so
   customers don't have to remember to check `/track`
4. **Cart + checkout** if you want actual online purchase, not just "browse,
   then contact us"
5. **Multiple staff logins** with different permission levels, if more than
   one person will manage the admin panel

None of these require restructuring what's here — they're additive.
