"use strict"

var registerdao = require('../dao/registerdao');
var multer = require('multer');

function registerController(app,mongoose,log){

	var registerDao = new registerdao(mongoose,log);

	app.post('/api/register', function(req,res){
		registerDao.register(req.body, function(response){
			res.send(response);
		})
	});

	app.post('/api/login', function(req,res){
		registerDao.login(req.body, function(response){
			res.send(response);
		})
	});

	app.post('/api/profile', function(req,res){
		registerDao.update(req.body, function(response){
			res.send(response);
		})
	});
	app.post('/api/changepass', function(req,res){
		registerDao.change(req.body,function(response){
			res.send(response);
		})
	});

	app.post('/api/fileSave',function(req,res){
		registerDao.fileSave(req.body,function(response){
			res.send(response);
		})
	});



var storage = multer.diskStorage({
  		destination: "A:/weather App/server/uploads",
  		filename: function (req, file, cb) {
    		cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  		}
	})

	var upload = multer({ storage: storage });

	app.post('/api/fileUpload', upload.single('file'), function(req,res){
    console.log('Uploade Successful ', req.file);
	 console.log(req.file.filename);
        res.send(req.file.filename);
    });

}

module.exports = registerController;