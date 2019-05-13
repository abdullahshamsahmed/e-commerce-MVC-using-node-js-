var db = require('./db2');


module.exports = {
	get: function(itemId, callback){
		var sql = "select * from item where id=?";
		db.getResults(sql, [itemId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from item";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(item, callback){
		var sql = "insert into item values(null, ?, ?, ?,?,?,?,?)"
		db.execute(sql, [item.pname, item.brand, item.ram,item.storage,item.monitor,item.disktype,item.price], function(success){
			callback(success);
		});
	},
	update: function(item, callback){
		var sql = "update item set pname=?, brand=?, ram=?,storage=?,monitor=?,disktype=?,price=? where id=?";
		db.execute(sql, [item.pname, item.brand, item.ram,item.storage,item.monitor,item.disktype,item.price,item.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(item, callback){
		var sql = "delete from item where id=?";
		db.execute(sql, [item.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}