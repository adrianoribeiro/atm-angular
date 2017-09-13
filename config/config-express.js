var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');

module.exports = function(){
	
	var app = express();
	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	app.use(express.static('./public'));
	
	consign()
		.into(app);
	
	return app;
}
