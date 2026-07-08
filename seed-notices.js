const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');

let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      const match = envFile.match(/DATABASE_URL=["']?([^"'\n\r]+)["']?/);
      if (match) {
        databaseUrl = match[1];
      }
    }
  } catch (err) {
    console.error('Could not read .env file:', err.message);
  }
}

if (!databaseUrl) {
  console.error('Error: DATABASE_URL is not set in environment or .env file.');
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const dummyNotices = [
  {
    title: "Urgent: Midterm Exam Schedule Released",
    body: "The official midterm examination schedule for Spring semester has been published. All students must check their portals to view their exam rooms and timings. Report any clashes to the controller office immediately.",
    category: "Exam",
    priority: "Urgent",
    publishDate: new Date("2026-07-08T09:00:00.000Z"),
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Annual Hackathon 2026 Registrations Open",
    body: "Ready to build the future? Registrations for Reno Hackathon 2026 are now open! Gather a team of 2-4 members and register before July 15. Grand prize of $5,000 for the winning team.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-07-07T14:30:00.000Z"),
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Campus Wi-Fi Maintenance Downtime",
    body: "The campus IT department will be upgrading core switches this Saturday from 10:00 PM to 4:00 AM. Expect intermittent internet connectivity in residential halls and main libraries during this window.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-07-08T11:00:00.000Z"),
    image: null
  },
  {
    title: "Urgent: Library Extended Study Hours",
    body: "To support students preparing for upcoming midterms, the central library will remain open 24/7 starting tonight through July 22. Student ID cards are required for entry after 10:00 PM.",
    category: "General",
    priority: "Urgent",
    publishDate: new Date("2026-07-08T08:00:00.000Z"),
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Math 101 Remedial Class Timings",
    body: "A remedial session for Calculus I (Math 101) will be held this Thursday at 4:00 PM in Seminar Room 3. Recommended for all students who scored below 50% in Quiz 2.",
    category: "Exam",
    priority: "Normal",
    publishDate: new Date("2026-07-06T10:00:00.000Z"),
    image: null
  },
  {
    title: "Guest Lecture: AI in Modern Architecture",
    body: "Join us for a guest lecture by Dr. Sarah Jenkins on the integration of neural networks in urban architecture. The lecture will take place in the Main Auditorium at 2:00 PM on Friday.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-07-05T09:00:00.000Z"),
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lost and Found: Key Fob Found in Gym",
    body: "A black Honda key fob was found near the locker rooms of the university gymnasium yesterday afternoon. Owner can claim it at the main administrative helpdesk after verifying details.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-07-04T16:00:00.000Z"),
    image: null
  },
  {
    title: "Physics Lab Exam Instructions",
    body: "Instructions for the upcoming Physics Lab Practical Exam have been uploaded to the course drive. Please review the safety guidelines and experimental setups before your assigned lab slots next week.",
    category: "Exam",
    priority: "Normal",
    publishDate: new Date("2026-07-03T11:30:00.000Z"),
    image: null
  },
  {
    title: "Urgent: Blood Donation Drive Tomorrow",
    body: "Our annual campus blood drive starts tomorrow morning at 9:00 AM in the Student Center. Donors are requested to bring their student identity card and eat a healthy breakfast before arriving.",
    category: "Event",
    priority: "Urgent",
    publishDate: new Date("2026-07-08T06:30:00.000Z"),
    image: null
  },
  {
    title: "Parking Lot C Temporary Closure",
    body: "Parking Lot C will be closed for resurfacing work starting Monday morning. Please utilize Parking Lot E and the parking structure during this time. Vehicles left in Lot C after Monday 6:00 AM will be towed.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-07-02T08:00:00.000Z"),
    image: null
  },
  {
    title: "Programming Club Weekly Meetup",
    body: "The Programming Club will meet this Wednesday at 6:30 PM in Lab 4. We will be discussing graph traversal algorithms and preparing for the upcoming collegiate coding contest.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-07-01T15:00:00.000Z"),
    image: null
  },
  {
    title: "Placement Cell Notice: Mock Interviews",
    body: "Final year students can register for mock interview slots conducted by visiting industry professionals. Slots are limited and allocated on a first-come, first-served basis. Register via placement portal.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-06-30T10:00:00.000Z"),
    image: null
  },
  {
    title: "Urgent: Chemistry Lab Safety Quiz Block",
    body: "All sophomore Chemistry students must clear the safety quiz by Friday midnight to be allowed in the inorganic synthesis labs starting Monday. No exceptions will be entertained.",
    category: "Exam",
    priority: "Urgent",
    publishDate: new Date("2026-07-08T05:00:00.000Z"),
    image: null
  },
  {
    title: "Cultural Fest Coordinator Applications",
    body: "Applications are open for Student Coordinator positions for the upcoming Spring Cultural Fest. Active leadership experience is preferred. Submit your portfolio to the student affairs desk.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-06-29T09:00:00.000Z"),
    image: null
  },
  {
    title: "Urgent: Scholarship Application Deadline Extended",
    body: "The submission window for the Merit-cum-Means Financial Scholarship has been extended to July 18 due to network outages on the state portals. Ensure all tax certificates are attached.",
    category: "General",
    priority: "Urgent",
    publishDate: new Date("2026-07-07T16:00:00.000Z"),
    image: null
  },
  {
    title: "Biology Practical Examination Clashes",
    body: "Students who have overlapping slots for the Cell Biology practical and Math minor quiz must report their IDs to Room 204 to adjust their exam roster before Friday 4:00 PM.",
    category: "Exam",
    priority: "Normal",
    publishDate: new Date("2026-06-28T14:00:00.000Z"),
    image: null
  },
  {
    title: "Inter-College Debate Championship",
    body: "Reno Campus will host the state-level debate league this Saturday in Auditorium 2. Come and cheer for our team as they debate against visiting universities. Registrations for audience close tomorrow.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-06-27T11:00:00.000Z"),
    image: null
  },
  {
    title: "Hostel Fee Payments Semester Notice",
    body: "All hostel residents must clear their mess and electricity utility balances for the current semester to avoid late fine surcharges. Online billing links have been dispatched to registered emails.",
    category: "General",
    priority: "Normal",
    publishDate: new Date("2026-06-26T10:00:00.000Z"),
    image: null
  },
  {
    title: "Computer Science Final Project Guidelines",
    body: "The grading rubric and submission pipeline for the senior capstone project have been published on the course page. Please ensure github link structures match specifications.",
    category: "Exam",
    priority: "Normal",
    publishDate: new Date("2026-06-25T15:00:00.000Z"),
    image: null
  },
  {
    title: "Guest Seminar: Security Practices in Modern SaaS",
    body: "Join us for a dynamic presentation by Senior Security Architect Michael Vance on cloud networking vulnerabilities and mitigation strategies. Starts at 11:30 AM in CS Conference Hall.",
    category: "Event",
    priority: "Normal",
    publishDate: new Date("2026-06-24T09:00:00.000Z"),
    image: null
  }
];

async function main() {
  console.log('Connecting to database...');
  console.log('Seeding 20 notices...');
  
  for (const notice of dummyNotices) {
    await prisma.notice.create({ data: notice });
  }
  
  console.log('Successfully seeded 20 dummy notices!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
