import { coursesDB } from '../db/datastore.js';

export async function getAllCourses() { return await coursesDB.find({}); }
export async function getCourseById(id) { return await coursesDB.findOne({ _id: id }); }
export async function addCourse(course) { return await coursesDB.insert(course); }
export async function updateCourse(id, updates) { return await coursesDB.update({ _id: id }, { $set: updates }); }
export async function deleteCourse(id) { return await coursesDB.remove({ _id: id }); }