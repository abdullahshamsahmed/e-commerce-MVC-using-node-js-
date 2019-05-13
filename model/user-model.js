var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=? and type=?";
		db.getResults(sql, [user.uname, user.password,user.utype], function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
	insert: function(user, callback){
		var sql = "insert into user values(null, ?, ?, ?)"
		db.execute(sql, [user.uname, user.password, user.type], function(success){
			callback(success);
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?, password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password, user.type, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}