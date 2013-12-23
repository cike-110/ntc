var mongodb = require('./db');
var coll,err;
//集合链接函数
module.exports = function collecting(collectionname,callback){
	mongodb.open(function(err,db){
		if(err){
		mongodb.close();
		return callback(err);
		}
		//链接集合
		db.collection(collectionname,function(err,collection){
			if(err){
				cansole.log("集合链接失败！！！");
				mongodb.close();
				return callback(err);
			}
			coll = collection;
			err = err;
			//return callback(err,collection);

				});
		});
		//return callback(err,collection);

};
function getcoll(){
return coll;
}
