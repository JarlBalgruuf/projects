//Setup
const port = 3000;
const hostname = 'localhost';
//const Messages = require('./models/messages'); 
const url = 'mongodb://localhost:27017/messagedb'; 
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false, 
    autoIndex: false,
    poolSize: 10,  
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,  
    family: 4 
};

const http = require('http');
const express = require('express')
//const mongodb = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
var session =  require('express-session');

var connect = mongoose.connect(url, options);

//Create app
var app = express();
app.use(morgan('dev'));

//use cookies
app.use(cookieParser());
//use session with secret key
app.use(session({   
        secret: 'Secret',
        resave: false,
        saveUninitialized: false
}));

const passport = require('passport');
const authenticate = require('./authenticate');

app.use(passport.initialize());
app.use(passport.session());

var userRouter = require('./routes/userRouter');
app.use('/users', userRouter);


//basic authentication
function Auth(req, res, next){
    console.log("Session data: ", req.session);

    if(req.user){
       next();
    }
    else{
        var err = new Error('Not authenticated');
        err.status = 403;
        next(err);
    }
}

app.use(Auth);

//get routes and mount
const msgRouter = require('./routes/messageRouter');
app.use('/messages', msgRouter);

//Create server
var server = http.createServer(app);

//Start server
server.listen(port, hostname, () => { console.log('Server started')});
