import express from "express";
import {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} from "../models/courseModel.js";
import { getParticipantsForCourse } from "../models/bookingModel.js";
import { getAllUsers, deleteUser, updateUserRole } from "../models/userModel.js";

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.session.user?.role === "admin") return next();
  res.send("Unauthorized");
}

router.get("/", isAdmin, async (req, res) => {
  const courses = await getAllCourses();
  res.render("admin-dashboard", { courses });
});

router.get("/add-course", isAdmin, (req, res) => {
  res.render("course-form", { formAction: "/admin/add-course" });
});

router.post("/add-course", isAdmin, async (req, res) => {
  await addCourse(req.body);
  res.redirect("/admin");
});

router.get("/edit-course/:id", isAdmin, async (req, res) => {
  const course = await getCourseById(req.params.id);
  res.render("course-form", {
    course,
    formAction: `/admin/edit-course/${req.params.id}`
  });
});

router.post("/edit-course/:id", isAdmin, async (req, res) => {
  await updateCourse(req.params.id, req.body);
  res.redirect("/admin");
});

router.post("/delete-course", isAdmin, async (req, res) => {
  await deleteCourse(req.body.id);
  res.redirect("/admin");
});

router.get("/participants/:courseId", isAdmin, async (req, res) => {
  const course = await getCourseById(req.params.courseId);
  const participants = await getParticipantsForCourse(req.params.courseId);
  res.render("participants", { course, participants });
});

router.get("/users", isAdmin, async (req, res) => {
  const users = await getAllUsers();
  res.render("admin-users", { users });
});

router.post("/users/delete", isAdmin, async (req, res) => {
  await deleteUser(req.body.id);
  res.redirect("/admin/users");
});

router.post("/users/toggle-role", isAdmin, async (req, res) => {
  const newRole = req.body.currentRole === "admin" ? "user" : "admin";
  await updateUserRole(req.body.id, newRole);
  res.redirect("/admin/users");
});

// TEMPORARY — seeds sample Glasgow courses. Remove after use.
router.get("/seed-courses", isAdmin, async (req, res) => {
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

  for (const course of courses) {
    await addCourse(course);
  }

  res.send("Seeded 6 courses. <a href='/admin'>Go to admin dashboard</a>");
});

export default router;