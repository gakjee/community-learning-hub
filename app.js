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

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use('/', publicRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));