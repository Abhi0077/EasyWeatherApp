"use strict"


function registerdao(mongoose,log){

	this.getregisterModel = function(){

		var model = undefined;

		try{
			if(mongoose.model('user')){
				model = mongoose.model('user');
			}
		} catch(e){
			if(e.name == "MissingSchemaError"){
				var schema = mongoose.Schema({
					'name':{type:String, required:false},
					'email':{type:String, required:true},
					'password':{type:String, required:true},
					'address' : {type:String, required:false},
					'about' : {type:String, required:false},
					'iname' : {type: String, required:false}
				},{collection:'user'});
				model = mongoose.model('user',schema);
			}
		}
		return model;
	};

	this.initUser = function(email,callback){
		var registerModel = this.getregisterModel();
		registerModel.findOne({email:email}, function(err,result){
			if(result != null){
				callback(true);
			} else {
				callback(false);
			}
		});
	};

	this.register = function(data,callback){
       var registerModel = this.getregisterModel();
       this.initUser(data.email, function(status){
       		if(!status){
       			var saveData = new registerModel(data);
       			saveData.save(function(err,result){
       				if(result != null){
       					callback({status:0,data:result});
       				} else {
       					callback({status:1,data:"Technically Error"});
       				}
       			})
       		} else {
       			callback({status:1, data:'User has Already Registered'});
       		}
       }.bind(this));
	};

	this.login = function(data,callback){
		var registerModel = this.getregisterModel();
		registerModel.findOne({email:data.email,password:data.password}, function(err,result){
			if(result != null){
				callback({status:0,data:result});
			} else {
				callback({status:1,data:'plz enter correct details'});
			}
		})
	};
	this.update =function(data,callback){
		var registerModel=this.getregisterModel();
		registerModel.findOneAndUpdate({email:data.email}, {$set:data},{new:true}, function(err, result){
			if(result !=null){
				callback({status:0,data:result});
			} else {
				callback({status:1, data:'enter correct details'});
			}

		})
	};

	this.fileSave =function(data,callback){
		var registerModel=this.getregisterModel();
		registerModel.findOneAndUpdate({email:data.email}, {$set:data},{new:true}, function(err,result){
			if(result !=null){
				callback({status:0,data:result});
			} else {
				callback({status:1, data:'file name saved'});
			}
		})

	};

	this.change= function(data,callback){
		var registerModel=this.getregisterModel();
		
		registerModel.findOneAndUpdate({email:data.email},{password:data.newpassword},{new:true},function(err, result){

			if(result !=null){
				console.log(result);
				callback({status:0,data:result});
			} else {
				callback({status:1, data:'password not changed'});
			}


		})
	};








};

module.exports = registerdao;