import { addCourse } from '../models/courseModel.js';

const courses = [
  {
    name: "Digital Skills — Getting Started with Smartphones",
    description: "A friendly, jargon-free introduction to using a smartphone confidently — texting, photos, video calls, and staying safe online.",
    courseType: "weekly",
    numSessions: 4,
    duration: "1.5 hours",
    startDate: "2026-09-08",
    startTime: "10:00",
    location: "Maryhill Community Hub, Glasgow",
    price: 15
  },
  {
    name: "Spanish Taster Day",
    description: "A one-off introduction to conversational Spanish — greetings, basic phrases, and a taste of the culture, no experience needed.",
    courseType: "single",
    numSessions: 1,
    duration: "3 hours",
    startDate: "2026-09-13",
    startTime: "11:00",
    location: "Govanhill Baths, Glasgow",
    price: 10
  },
  {
    name: "Pottery for Beginners",
    description: "Hand-building and basic wheel techniques over six weeks — all materials and firing included.",
    courseType: "weekly",
    numSessions: 6,
    duration: "2 hours",
    startDate: "2026-09-16",
    startTime: "18:30",
    location: "The Whisky Bond Studios, Glasgow",
    price: 85
  },
  {
    name: "Weekend Watercolour Workshop",
    description: "A relaxed weekend workshop covering colour mixing, brush technique, and painting a simple Glasgow skyline scene.",
    courseType: "single",
    numSessions: 1,
    duration: "4 hours",
    startDate: "2026-09-20",
    startTime: "10:00",
    location: "Kelvingrove Art Rooms, Glasgow",
    price: 30
  },
  {
    name: "Excel Basics for Everyday Life",
    description: "Learn to build simple spreadsheets — budgeting, lists, and basic formulas — at a gentle pace with plenty of support.",
    courseType: "weekly",
    numSessions: 3,
    duration: "1 hour",
    startDate: "2026-09-22",
    startTime: "14:00",
    location: "Bridgeton Community Learning Centre, Glasgow",
    price: 12
  },
  {
    name: "French Conversation Circle",
    description: "Small-group conversation practice for those with some French already — no textbooks, just talking.",
    courseType: "weekly",
    numSessions: 8,
    duration: "1 hour",
    startDate: "2026-09-10",
    startTime: "19:00",
    location: "Partick Library, Glasgow",
    price: 40
  }
];

async function seed() {
  for (const course of courses) {
    await addCourse(course);
    console.log(`Added: ${course.name}`);
  }
  console.log('Done seeding courses.');
  process.exit(0);
}

seed();