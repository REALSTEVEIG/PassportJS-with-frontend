require('dotenv').config()
require('./config/oauth_google')

const express = require('express')
const app = express()
const port = 5000
const authRouter = require('./routes/auth')
// const authWithGoogle = require('./routes/oauth_google')
const pagesRouter = require('./routes/pages')
const path = require('path')
const connectDB = require('./db/connect')
const passport = require('passport')
const User = require('./model/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const {engine} = require('express-handlebars')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/public', express.static(path.join(__dirname, 'public')))


//express-session setup with mongostrore to store sessions in our database
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {     
        maxAge: 300000, // 5 minutes in milliseconds
        httpOnly: true,
        secure : false // set to true in production 
    }
}))

//passport initialize
app.use(passport.initialize())
app.use(passport.session())

//setup passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/', authRouter)

//signup with google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
  
app.use('/', pagesRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()