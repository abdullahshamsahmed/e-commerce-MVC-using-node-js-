var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


//ROUTES


router.get('/', function(req, res){
	
	userModel.getAll(function(results){
		var data = {
			name: req.session.un,
			//uList: results
		};
		res.render('./registration', data);
	});
});



router.get('/registration', function(req, res){
	//res.render('./registration');
});


router.post("/", function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};
    
	userModel.insert(user, function(status){

		if(status){
            res.render('./regConfirm');
          
			
            
		}else{
			res.redirect('failed');
		}
	});
});

module.exports = router;






