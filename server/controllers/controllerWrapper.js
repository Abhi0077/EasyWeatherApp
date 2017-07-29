"use strict"

var bodyParser = require('body-parser');
var registerController = require('./registerController');

function controllerWrapper(app,mongoose,log){

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json());

	new registerController(app,mongoose,log);

}

module.exports = controllerWrapper;