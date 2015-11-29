var http = require('http');
var express = require('express');
var passport = require('passport');

var app = express();
var server = http.createServer(app);

var clientComm = require('./modules/client-comm');
var routingConfig = require('./modules/routing-config');
var authConfig = require('./modules/auth-config');

routingConfig.configure(app, passport);
authConfig.configure(passport);

app.post('/api/:project/:result', function(req, res){
  clientComm.processRequest(req.params.project, req.params.result);
  res.send('ok');
});

var port = process.env.PORT || 8080;
server.listen(port);
clientComm.init(server);

console.log("Listening on port: " + port + " :)");