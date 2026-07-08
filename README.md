# Reno Notice Board

A premium, minimalist Notice Board web application built using **Next.js (Pages Router)**, **Prisma ORM**, **Neon PostgreSQL**, and **Tailwind CSS**.

This project provides a fully functional announcement board that supports full Create, Read, Update, and Delete (CRUD) operations. Urgent notices are prioritized on the database level and highlighted on the dashboard with a custom crimson border bar and pulsing indicator dot.

---

## Technical Stack
- **Framework:** Next.js (Pages Router)
- **Database Access:** Prisma Client (v7)
- **Database:** Hosted Neon PostgreSQL
- **Styling:** Tailwind CSS (v4)
- **Hosting:** Vercel (Hobby Tier)

---

## How to Run the Project Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd notice-board
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root of your project and add your hosted database connection string:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint].[region].aws.neon.tech/[dbname]?sslmode=require"
```

*Note: Since this project uses Prisma 7, the database connection URL is managed dynamically via `prisma.config.ts`.*

### 5. Run Database Migrations
Synchronize your database schema with Neon:
```bash
npx prisma migrate dev --name init
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Future Improvements (With More Time)

If given more time, I would implement the following enhancements:
1. **Cloud-Based Image Uploads:** Currently, the optional image field takes an external URL string. I would integrate **Supabase Storage** or **Cloudinary** so users can upload files directly from their local device instead of pasting URLs.
2. **User Authentication & Role-Based Access Control (RBAC):** Integrate NextAuth.js or Clerk to secure the admin controls. This would restrict notice creation, editing, and deletion to authorized staff and faculty, while keeping the public dashboard read-only for students.
3. **Server-Side Search & Pagination:** Transition the search bar and category filters from client-side state filtering to database-level queries with cursor-based pagination. This ensures the application remains highly performant even when notice boards scale to thousands of entries.

---

## AI Usage Disclosure

In accordance with the submission guidelines, AI tools (including **GitHub Copilot**) were utilized as collaborative coding assistants during the development of this project in the following capacities:
- **Architectural & Conceptual Alignment:** Used AI to explore and lay out a clean structure using the Next.js Pages Router, establishing clean boundary lines between the front-end layout and server-side CRUD controllers.
- **Boilerplate & Setup Speed:** Assisted in generating the standard initial boilerplate configuration for the Prisma 7 client connection, Neon driver adapter integration, and baseline SQL migrations.
- **UI Design & Tailwind Composition:** Utilized AI to speed up design iterations for the notice board's custom aesthetic. AI assisted in composing the custom Tailwind utility groupings for the responsive grid, mapping the Plus Jakarta Sans and JetBrains Mono typography config, and fine-tuning the visual layout of the dashboard slip-memo cards and urgent alert states.
