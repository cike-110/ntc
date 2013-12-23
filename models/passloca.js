var mongodb = require('./db');

function PassLoca(passloca){
	this.passphone = passloca.passphone;
	this.long = passloca.long;
	this.lat = passloca.lat;
	this.carphone = passloca.carphone;
};

module.exports = PassLoca;

PassLoca.prototype.save = function save(callback){
	//将数据保存到数据库
	var passloca = {
	passphone:this.passphone,
	long:this.long,
	lat:this.lat,
	carphone:this.carphone
	};
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
		return callback(err);
		}
		db.collection('passengerlocation',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//建立索引
			collection.ensureIndex('passphone',{unique:true});
			//数据保存
			collection.save(passloca,{safe:true},function(err,passloca){
			mongodb.close();
			callback(err,passloca);
			});
		});
	});
	
};

//数据查询方法
//PassLoca.get = function get(car){};
PassLoca.updatePassLoca = function updatePassLoca(passphone,passlocaobj,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('passengerlocation',function(err,collection){
			if(err){
				console.log("数据库链接错误");
				mongodb.close();
				return callback(err);
			}
			collection.update({"passphone":passphone},{$set:{"long":passlocaobj.long,"lat":passlocaobj.lat}},{upsert:true},function(err,a){
			mongodb.close();
			console.log("我在更改了乘客定位信息后关闭了数据库");
			if(err){
			 callback(err);
			}else{
			console.log(a);
			callback(a);
			
			}
			});
		});
	});
};

//PassLoca.prototype.upsert = function upsert(callback){
//将数据保存到数据库
//	var passloca = {
//	passphone:this.passphone,
//	long:this.long,
//	lat:this.lat,
//	carphone:this.carphone
///	};
//	mongodb.open(function(err,db){
//	if(err){
//		mongodb.close();
//		return callback(err);
//	}
//	db.collection('passengerlocation',function(err,collection){
//		if(err){
//			mongodb.close();
//			return callback(err);
//		}
//		collection.upsert
//	});
//	
//	});
//};

PassLoca.findOnly = function findOnly(passphone,callback){
	mongodb.open(function(err,db){
	if(err){
		mongodb.close();
		return callback(err);
	}
	db.collection('passengerlocation',function(err,collection){
	if(err){
		console.log('数据库链接错误');
				mongodb.close();
				return callback(err);
	}
	
	collection.find({"passphone":passphone},function(err,doc){
		mongodb.close();
		if(doc){
			console.log(doc);
			callback(doc);
		}else{
			callback(err);
		}
	});
	});
	});
};

PassLoca.findAll = function findAll(long,lat,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('passengerlocation',function(err,collection){
			if(err){
			        mongodb.close();
			        return callback(err);
			}
			collection.find({"long":{"$lte":long+2.0,"$gte":long-2.0},"lat":{"$lte":lat+2.0,"$gte":lat-2.0},"carphone":""},function(err,doc){
				//mongodb.close();
				if(doc){
					doc.toArray(function(err,arr){
					 	//mongodb.close();
                        			if(err){
                           				console.log("results toArray error");
				        		mongodb.close();
                            				return;
                        			}
                        			
                       			 	var a = arr;
                       			 	console.log(a);
					 	//mongodb.close();
					 	callback(err,a);
                    				});
				}else{
					callback(err,null);
					console.log("没有找到");
				}
			});
		});
	});
};



