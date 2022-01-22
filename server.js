const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const db = mongoose.connection;
const session = require('express-session');
const passport = require('passport');
const app = express();
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes')
require('dotenv').config()

/* MIDDLEWARE */
app.use(cors({ 
    origin: process.env.CLIENT_HOMEPAGE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({ 
  secret: 'anything',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.setup')

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);
app.use('/auth', authRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bulletin-board/build/index.html'));
});

/* MONGOOSE */
mongoose.connect(process.env.MONGODB_URL, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
