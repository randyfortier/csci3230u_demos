var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

// middleware
app.use(function(request, response, next) {
	console.log('REQUEST: url = ' + request.url);
  next();
});

// routes
app.get('/', function(request, response) {
  console.log('Somebody wanted /');
  response.send('Hello, world!');
});

app.get('/myfolder/index.html', function(request, response) {
  console.log('Someone wanted /myfolder/index.html');
  response.send('Someone wanted /myfolder/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node.js/Express is listening on port ' + app.get('port'));
});
