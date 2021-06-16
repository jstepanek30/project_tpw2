const express = require('express');
const hbs = require('hbs');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const db = require('./controller/database');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/articles', articleRoutes);

app.set('view engine', 'hbs');
app.set('views', './view');
hbs.registerPartials('./view/parts');

app.get('*', checkUser)
app.listen(3000);