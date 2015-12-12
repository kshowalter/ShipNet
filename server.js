var express = require('express');
var http = require('http');

var port = process.env.PORT || 2342;

var app = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.use(express.static(__dirname + '/public'));
//app.listen(port); // server.listen or app.listen ???

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
var port = process.env.PORT || '2342';
server.listen(port);

var db = require('./server/db')();
require('./server/io')(server, db);

console.log('Shipnet server started on http://localhost:2342');
