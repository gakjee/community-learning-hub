import express from 'express';
import { createUser, findUser } from '../models/userModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    await createUser(req.body);
    res.redirect('/login');
});

router.post('/login', async (req, res) => {
    const user = await findUser(req.body.username);
    if (user) {
        req.session.user = user;
        res.redirect('/user/dashboard');
    } else {
        res.send('Login failed');
    }
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
});

export default router;