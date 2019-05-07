var express = require('express'),
	app = express();
	path = require('path'),
	bunyan = require('bunyan'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	bodyparser = require('body-parser'),
	controllerWrapper = require('./server/controllers/controllerWrapper'),
	http = require('http').createServer(app).listen('9090');

	var log = bunyan.createLogger({
  		name: 'weatherapp',
  		streams: [
    		{
      			level: 'debug',
      			stream: process.stdout            // log INFO and above to stdout
    		},
    		{
      			level: 'warn',
      			path: 'error.log'  // log ERROR and above to a file
    		}
  		]
	});

	app.use(cors());

	app.use('/', express.static(path.join(__dirname + '/client')));

	app.use('/static', express.static(path.join(__dirname + '/server/uploads')));

	function reqSerializer(req) {
    	return {
        	method: req.method,
        	url: req.url,
        	headers: req.headers,
        	params:req.params,
        	body:req.body
    	};
	};

	log.debug(__dirname);

	log.addSerializers({req: reqSerializer});

	mongoose.connect('mongodb://localhost:27017/weatherapp');

	var db = mongoose.connection;

	db.once('open', function callback () {
  		log.debug({data:'Database is Connected with the server'});
  		new controllerWrapper(app,mongoose,log);
	});

	db.on('error', function(err){
		log.warn({data:err});
	});




