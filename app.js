import express from 'express';
import mustacheExpress from 'mustache-express';
import session from 'express-session';

import publicRoutes from './routes/publicRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Make user/role info available to every view automatically
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.isAdmin = req.session.user?.role === 'admin';
    next();
});

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

// Manual layout wrapping (bypasses mustache-express's built-in layout option entirely)
app.use((req, res, next) => {
    const originalRender = res.render.bind(res);
    res.render = (view, options = {}) => {
        originalRender(view, options, (err, innerHtml) => {
            if (err) {
                console.error('Render error (inner view):', err);
                return res.status(500).send('Template error: ' + err.message);
            }
            originalRender('layout', { ...options, body: innerHtml }, (err2, fullHtml) => {
                if (err2) {
                    console.error('Render error (layout):', err2);
                    return res.status(500).send('Layout error: ' + err2.message);
                }
                res.send(fullHtml);
            });
        });
    };
    next();
});

app.use('/', publicRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));