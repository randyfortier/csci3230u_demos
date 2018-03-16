var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var assert = require('assert');

// database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/university');
                 //,{useMongoClient: true});

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
  genid: function(request) {
    return uuid();
  },
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true},
  secret: 'apollo slackware prepositional expectations'
}));

// utility code
var usernames = [];
function userExists(toFind) {
  for (var i = 0; i < usernames.length; i++) {
    if (usernames[i] === toFind) {
      return true;
    }
  }
  return false;
}

// database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {type: String,
             unique: true,
             index: true},
  email: String,
  hashedPassword: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);

var studentSchema = new Schema({
  sid: {type: String,
        validate: [/^1[0-9]{8}$/, 'must be 9 digits'],
        unique: true,
        index: true},
  firstName: String,
  lastName: {type: String,
             index: true},
  gpa: {type: Number,
        min: 0.0,
        max: 4.3},
  startDate: Date,
  fullTime: Boolean
}, {collection: 'students'});
var Student = mongoose.model('student', studentSchema);

// routes
app.get('/', function(request, response) {
  var session = request.session;
  var username = '';
  if (session.username) {
    username = session.username;
  }
  response.render('index', {title: 'Index',
                            description: 'This is the main page',
                            username: username});
});

function reloadStudentList(request, response, errorMessage) {
  Student.find().then(function(results) {
    response.render('students', {title: 'Student List',
                                 students: results,
                                 errorMessage: errorMessage});
  });
}

app.get('/students', function(request, response) {
  reloadStudentList(request, response, '');
});

app.get('/register', function(request, response) {
  response.render('register', {title: 'Register'});
});

app.post('/processRegistration', function(request, response) {
  var username = request.body.username;
  var password = request.body.pwd;

  if (userExists(username)) {
    response.render('register', {title: 'Register',
                                 errorMessage: 'Username in use'});
  } else {
    usernames.push(username);

    request.session.username = username;

    response.render('registrationSuccess', {username: username,
                                            title: 'Welcome aboard!'});
  }

});

app.get('/login', function(request, response) {
  response.render('login', {title: 'Please Log In',
                            errorMessage: ''});
});

app.post('/processLogin', function(request, response) {
  var username = request.body.username;
  var password = request.body.pwd;

  if (userExists(username)) {
    // login success
    request.session.username = username;
    response.render('loginSuccess', {username: username,
                                     title: 'Login Success'});
  } else {
    // Login failed
    response.render('login', {title: 'Please Log In',
                              errorMessage: 'Login Incorrect'});
  }
});

app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
