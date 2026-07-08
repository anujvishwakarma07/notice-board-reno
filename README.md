# Reno Notice Board

A premium, minimalist Notice Board web application built using **Next.js (Pages Router)**, **Prisma ORM**, **Neon PostgreSQL**, and **Tailwind CSS**.

This project provides a fully functional announcement board that supports full Create, Read, Update, and Delete (CRUD) operations. Urgent notices are automatically prioritized on the database level and highlighted on the dashboard with a clean left crimson accent bar.

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
2. **Optimistic UI Updates:** Integrate client-side state libraries like **SWR** or **React Query**. This would make the CRUD actions feel instantaneous by updating the UI immediately before waiting for the database server response.
3. **Advanced Search & Filtering:** Add a search bar at the top of the dashboard along with category tabs (Exam, Event, General) to help users quickly filter notices as the board grows.

---

## AI Usage Disclosure

In accordance with the submission guidelines, AI tools were utilized during the development of this project in the following capacities:
- **Prisma 7 Configuration Reference:** Used AI to reference the newly introduced `prisma.config.ts` specification in Prisma 7, ensuring database connection drivers and migrations were configured correctly under the new driver adapter standard.
- **Boilerplate & Layout Assistance:** Assisted in generating the standard initial responsive layouts and verifying CSS class alignment.
- **Debugging Reference:** Consulted AI to verify runtime connection pooling parameters when integrating Neon database drivers.
