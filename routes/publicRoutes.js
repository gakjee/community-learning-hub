import express from 'express';
import { getAllCourses } from '../models/courseModel.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/courses', async (req, res) => {
    const courses = await getAllCourses();
    res.render('courses', { courses });
});

router.get('/login', (req, res) => {
    res.render('login');
});

export default router;