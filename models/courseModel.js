import { coursesDB } from '../db/datastore.js';

export async function getAllCourses() { return await coursesDB.find({}); }
export async function addCourse(course) { return await coursesDB.insert(course); }
export async function deleteCourse(id) { return await coursesDB.remove({ _id: id }); }