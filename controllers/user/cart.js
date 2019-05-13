var express = require('express');
var userModel = require.main.require('./model/user-model');
var itemModel=require.main.require('./model/item-model');
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
		res.render('home/index', data);
	});
});


router.get('/cartconfirm/:id', function(req, res){

	itemModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('./cart/cartconfirm',result);
		}else{
			res.redirect('/ustart');
		}
	});
});

router.post('/cartconfirm/:id', function(req, res){

	var item = {
        id: req.params.id,
		pname: req.body.pname,
		brand: req.body.brand,
		ram: req.body.ram,
		storage: req.body.storage,
		monitor: req.body.monitor,
		disktype: req.body.disktype,
		price: req.body.price
		};
        
    cartModel.insert(item, function(status){

		if(status){
			res.redirect('/ustart');
		}else{
			res.send('failejjjjd');
		}
	});
});
router.get('/cartlist',function(req,res){
      cartModel.getAll(function(results){
         var data = {
			name: req.session.un,
			uList: results
		};
          res.render('./cart/cartlist',data);
      });
});

router.get('/cartdelete/:id', function(req, res){

	cartModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('./cart/cartdelete', result);
		}else{
			res.redirect('failed');
		}
	});
});
router.post('/cartdelete/:id', function(req, res){

	var item = {
        id: req.params.id,
		pname: req.body.pname,
		brand: req.body.brand,
		ram: req.body.ram,
		storage: req.body.storage,
		monitor: req.body.monitor,
		disktype: req.body.disktype,
		price: req.body.price
		};
        
    cartModel.delete(item, function(status){

		if(status){
			res.redirect('/cart/cartlist');
		}else{
			res.send('failed');
		}
	});
});
router.get('/thanks', function(req, res){

	
			res.render('./cart/thanks',);
		
	
});
router.post('/thanks', function(req, res){
    cartModel.delete2();
    res.send("done");
    });


module.exports = router;






