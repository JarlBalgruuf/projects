const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-Parser');
const session = require('express-session');
const passport = require('passport');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

//routes
//userRouter.route('/')

userRouter.get('/signup', (req, res, next) =>{
    console.log('1#-Singup');
    res.render('signup');
});


// post singup
userRouter.post('/signup', (req, res, next) =>{
    console.log('1#-Singup');

    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if(err){
            err.status = 500;
            res.setHeader('Content-type', 'application/json');
            //res.json({err: err});
            res.redirect('/users/signup')
        }
        else{                                      // virhe?
            passport.authenticate('local', 
            {
                successRedirect: '/messages',
                failureRedirect: '/'
            })(req, res, () =>{
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json({status: 'Registeration successful, user logged in'});
            });
        }
    });

/*
    var err = new Error('User name was not given');
    err.status = 403;
    next(err);
*/

});

// post login
userRouter.post('/login', passport.authenticate('local',
                                            {successRedirect: '/messages',
                                            failureRedirect: '/'
                                            }),(req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.json({status: 'User logged in'});
});

//userRouter.get('/google', passport.authenticate('google'),{scope: ['profile', 'email']});

// get logout
userRouter.get('/logout',(req, res, next)=>{
    if(req.session){
        req.session.destroy();
        console.log('Session destroyed');
        res.clearCookie('sessien-id');
        console.log('Cookie cleared');
        res.redirect('/');
    }
    else{
        var err = new Error('You are not logged in!');
        next(err);
    }
});


//var user = require('user');
//const { application } = require('express');
module.exports = userRouter;
