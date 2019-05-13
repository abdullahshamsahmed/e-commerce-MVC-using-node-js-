var express = require('express');
var userModel = require.main.require('./model/user-model');
var itemModel = require.main.require('./model/item-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.un != null && req.session.type==="admin"){
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

router.get('/userlist', function(req, res){

	userModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/userlist', data);
	});
});
//item
router.get('/productlist', function(req, res){

	itemModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
        
		res.render('home/productlist', data);
	});
});
///item
router.get('/profile', function(req, res){

	userModel.get(req.session.uid, function(result){

		if(result != ""){
			res.render('home/profile', result);
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/adduser', function(req, res){
	res.render('home/adduser');
});


router.post("/adduser", function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel.insert(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/adduser');
		}
	});
});
//add product
router.get('/addproduct', function(req, res){
	res.render('home/addproduct');
});


router.post("/addproduct", function(req, res){

	var item = {
		pname: req.body.pname,
		brand: req.body.brand,
		ram: req.body.ram,
		storage: req.body.storage,
		monitor: req.body.monitor,
		disktype: req.body.disktype,
		price: req.body.price
		
		
	};
   

	itemModel.insert(item, function(status){

		if(status){
			res.send('success');
		}else{
			res.send('failed');
		}
	});
});
///addproduct
router.get('/edit/:id', function(req, res){

	userModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/edit', result);
		}else{
			res.redirect('/home/userlist');
		}
	});
});

router.post("/edit/:id", function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/edit:'+req.params.id);
		}
	});
});
//item edit
router.get('/pedit/:id', function(req, res){

	itemModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/pedit', result);
		}else{
			res.redirect('/home/productlist');
		}
	});
});

router.post("/pedit/:id", function(req, res){

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
        console.log(req.body.pname);
    itemModel.update(item, function(status){

		if(status){
			res.redirect('/home/productlist');
		}else{
			res.send('failed');
		}
	});
});

///item edit
router.get('/delete/:id', function(req, res){

	userModel.get(req.params.id, function(result){
        
		if(result != ""){
			res.render('home/delete', result);
		}else{
			res.redirect('/home/userlist');
		}
	});
});

router.post("/delete/:id", function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel.delete(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/delete:'+req.params.id);
		}
	});
});
//product delete

router.get('/pdelete/:id', function(req, res){

	itemModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/pdelete', result);
		}else{
			res.send('failed');
		}
	});
});

router.post("/pdelete/:id", function(req, res){

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

	itemModel.delete(item, function(status){

		if(status){
			res.redirect('/home/productlist');
		}else{
			res.send('failed');
		}
	});
});

///product delete
module.exports = router;






