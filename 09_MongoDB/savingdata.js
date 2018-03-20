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
//var usernames = [];
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

app.post('/deleteStudent', function(request, response) {
  var sid = request.body.sid;
  Student.remove({sid: sid}, function(error) {
    if (error) {
      console.log('error deleting student: ' + error);
      reloadStudentList(request, response, 'Unabled to delete student');
    } else {
      reloadStudentList(request, response, 'Student deleted');
    }
  });
});

app.post('/addOrUpdateStudent', function(request, response) {
  var sid = request.body.sid;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var gpa = parseFloat(request.body.gpa);

  var studentData = {sid: sid,
                     firstName: firstName,
                     lastName: lastName,
                     gpa: gpa};

  Student.find({sid: sid}).then(function(results) {
    if (results.length > 0) {
      // update the student
      Student.update({sid: sid},
                     studentData,
                     {multi: false},
                     function(error, numAffected) {
        if (error || numAffected != 1) {
          console.log('Unable to update student: ' + error);
          reloadStudentList(request, response, 'Unable to update student');
        } else {
          reloadStudentList(request, response, 'Student updated');
        }
      });
    } else {
      // save a new student
      var newStudent = new Student(studentData);
      newStudent.save(function(error) {
        if (error) {
          console.log('Unable to save student');
          reloadStudentList(request, response, 'Unable to add student');
        } else {
          reloadStudentList(request, response, 'Student added');
        }
      });
    }
  });
});

app.get('/register', function(request, response) {
  response.render('register', {title: 'Register'});
});

app.post('/processRegistration', function(request, response) {
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.pwd;
  var hashedPassword = bcrypt.hashSync(password);

  var newUser = new User({username: username,
                          email: email,
                          hashedPassword: hashedPassword});
  newUser.save(function(error) {
    if (error) {
      console.log('Unable to register: ' + error);
      response.render('register', {errorMessage: 'Unable to register user.'});
    } else {
      request.session.username = username;
      response.render('registrationSuccess', {username: username,
                                              title: 'Welcome aboard!'});
    }
  });
});

app.get('/login', function(request, response) {
  response.render('login', {title: 'Please Log In',
                            errorMessage: ''});
});

app.post('/processLogin', function(request, response) {
  var username = request.body.username;
  var password = request.body.pwd;

  User.find({username: username}).then(function(results) {
    if (results.length == 0) {
      // Login failed
      response.render('login', {title: 'Please Log In',
                                errorMessage: 'Login Incorrect'});
    } else {
      // login success
      if (bcrypt.compareSync(password, results[0].hashedPassword)) {
        request.session.username = username;
        response.render('loginSuccess', {username: username,
                                         title: 'Login Success'});
      }
    }
  });
});

app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
