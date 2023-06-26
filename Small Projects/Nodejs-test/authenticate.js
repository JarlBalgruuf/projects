var passport = require('passport');
//const keys = require('./config/keys');
var LocalStrategy = require('passport-local').Strategy;

//const GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('./models/user');

//passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));

//const keys = require('./config/keys');
/*
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}));
*/

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());