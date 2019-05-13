var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
			
		var user = {
			uname: req.body.uname,
			password: req.body.password,
            utype:req.body.utype
		};
    
   

		userModel.validate(user, function(result){
			if(result != ""){
				req.session.un = req.body.uname;
				req.session.type = req.body.utype;
				req.session.uid = result.id;
                if (req.body.utype==="admin")
				res.redirect('/home');
                else{
                    res.redirect('/ustart');
                }
			}else{
				res.redirect('/login');
			}		
		});
		//console.log(results);
});

module.exports = router;






