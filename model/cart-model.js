var db = require('./db3');


module.exports = {
	get: function(cartId, callback){
		var sql = "select * from cart where id=?";
		db.getResults(sql, [cartId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from cart";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
    addprice: function(callback){
		var sql = "select sum(price)  from cart";
        
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(cart, callback){
		var sql = "insert into cart values(null, ?, ?, ?,?,?,?,?)"
		db.execute(sql, [cart.pname, cart.brand, cart.ram,cart.storage,cart.monitor,cart.disktype,cart.price], function(success){
			callback(success);
		});
	},
	update: function(cart, callback){
		var sql = "update cart set pname=?, brand=?, ram=?,storage=?,monitor=?,disktype=?,price=? where id=?";
		db.execute(sql, [cart.pname, cart.brand, cart.ram,cart.storage,cart.monitor,cart.disktype,cart.price,cart.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(cart, callback){
		var sql = "delete from cart where id=?";
		db.execute(sql, [cart.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
    delete2: function(){
		var sql = "delete from cart";
		db.execute(sql,[],);
	}
    
      
    
		 
		
	
   /* addprice:function(cart, callback){
		var sql = " * from cart";
		db.execute(sql, [cart.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}*/
}