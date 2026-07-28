import express from "express";
import { getParticipantsForCourse } from "../models/bookingModel.js";
import { getAllUsers, deleteUser, updateUserRole } from "../models/userModel.js";
import {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} from "../models/courseModel.js";

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

export default router;