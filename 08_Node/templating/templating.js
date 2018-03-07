var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');

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

// routes
app.get('/basic', function(request, response) {
  response.render('basic', {title: 'Testing',
                            message: 'Testing 1 2 3...'});
});

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

app.get('/students', function(request, response) {
  var studentList = [{sid: '100200300',
                     firstName: 'Bender',
                     lastName: 'Rodriguez'},
                     {sid: '100200301',
                      firstName: 'Philip',
                      lastName: 'Fry'}];
  response.render('students', {title: 'Student List',
                               students: studentList});
});

app.get('/login', function(request, response) {
  response.render('login', {title: 'Please Log In'});
});

app.post('/processLogin', function(request, response) {
  var username = request.body.username;
  var password = request.body.pwd;

  if (username === 'admin') {
    // login success
    request.session.username = username;
    response.send('Login success!');
  } else {
    // Login failed
    response.send('Login failed!');
  }
});

app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
