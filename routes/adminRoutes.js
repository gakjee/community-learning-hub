import express from "express";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
} from "../models/courseModel.js";

import { bookingsDB } from "../db/datastore.js";

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.session.user?.role === "admin") return next();
  res.send("Unauthorized");
}

router.get("/", isAdmin, async (req, res) => {
  const courses = await getAllCourses();
  res.render("dashboard", { courses });
});

router.post("/add-course", isAdmin, async (req, res) => {
  await addCourse(req.body);
  res.redirect("/admin");
});

router.post("/delete-course", isAdmin, async (req, res) => {
  await deleteCourse(req.body.id);
  res.redirect("/admin");
});

const courses = await getCourses();

for (let course of courses) {
  const count = await bookingsDB.count({ courseId: course._id });
  course.bookings = count;
}

export default router;
