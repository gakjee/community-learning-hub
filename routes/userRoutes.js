import express from 'express';
import { createUser, findUser, verifyPassword } from '../models/userModel.js';
import { getAllCourses, getCourseById } from '../models/courseModel.js';
import { createBooking, getBookingsForUser, deleteBooking } from '../models/bookingModel.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const existing = await findUser(req.body.username);
    if (existing) {
        return res.send('Username already taken. <a href="/user/register">Try again</a>');
    }
    await createUser(req.body);
    res.redirect('/login');
});

router.post('/login', async (req, res) => {
    const user = await findUser(req.body.username);
    if (user && await verifyPassword(req.body.password, user.password)) {
        req.session.user = { _id: user._id, username: user.username, role: user.role };
        res.redirect('/user/dashboard');
    } else {
        res.send('Login failed. <a href="/login">Try again</a>');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
});

router.post('/enrol/:courseId', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    await createBooking(req.session.user._id, req.params.courseId);
    res.redirect('/user/my-enrolments');
});

router.get('/my-enrolments', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const bookings = await getBookingsForUser(req.session.user._id);
    const courses = await Promise.all(
        bookings.map(async (b) => ({
            bookingId: b._id,
            ...(await getCourseById(b.courseId))
        }))
    );
    res.render('my-enrolments', { courses });
});

router.post('/unenrol', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    await deleteBooking(req.body.bookingId);
    res.redirect('/user/my-enrolments');
});



export default router;