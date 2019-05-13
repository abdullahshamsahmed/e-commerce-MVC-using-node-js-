var express = require('express');
var userModel = require.main.require('./model/item-model');
var cartModel = require.main.require('./model/cart-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	
	userModel.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('buying/index', data);
	});
});
router.get('/', function(req, res){
	
	userModel.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('buying/index', data);
	});
});


module.exports = router;






