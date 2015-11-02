var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '..', 'client/views'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(port);
console.log("Listening on port: " + port + " :)");

