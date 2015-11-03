var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var path = require('path');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '..', 'client/views'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

var port = process.env.PORT || 8080;

app.get('/:project', function (req, res) {
  res.render('index', {project: req.params.project});
});

app.post('/api/:project/:result', function(req, res){
	clientComm.processRequest(req.params.project, req.params.result);
	res.send('ok');
});

server.listen(port);
console.log("Listening on port: " + port + " :)");

var clientComm = require('./clientComm');

clientComm.init(server);