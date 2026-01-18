require("dotenv").config();
const express = require("express");
const app = express();

const methodOverride = require("method-override");
const morgan = require("morgan");
const authRoutes = require("./controllers/auth")
const foodsController = require('./controllers/foods.js')
const usersController = require('./controllers/user.js')
const session = require('express-session')
// server.js
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;
//Middlewares
require('./db/connection')



// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('tiny'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

//Routes

app.use(passUserToView)
app.use( '/auth',authRoutes)


app.get('/',(req,res) => {
    res.render('index.ejs')
})
//ROutes below this you must be signed in
app.use(isSignedIn)


app.use('/users', usersController)

app.use('/users/:userId/foods', foodsController)






app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
