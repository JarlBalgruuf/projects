var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session =  require('express-session');




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
var connect = mongoose.connect(url, options);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.use(session({   
  secret: 'Secret',
  resave: false,
  saveUninitialized: false
}));

const passport = require('passport');
const authenticate = require('./authenticate');

app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler


//Authentication

function Auth(req, res, next){
  console.log("Session data: ", req.session);

  if(req.user){
     next();
  }
  else{
      var err = new Error('Not authenticated');
      err.status = 403;
      //next(err);
      res.redirect('/')
  }
}

app.use(Auth);

var messagesRouter = require('./routes/messages');
app.use('/messages', messagesRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
