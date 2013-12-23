//请求数据库连接
var mongodb = require('./db');
var collecting = require('./collection');
//function CarLoca(carloca){
//	this.carphone = carloca.carphone;
//	this.long = carloca.long;
//	this.lat = carloca.lat;
//	this.passphone = carloca.passphone;
//}
//定义对象
function Reser(reser){
	this.passphone = reser.passphone;
	this.names = reser.names;
	this.local = reser.local;
	this.dis = reser.dis;
	this.subtime = reser.subtime;
	this.usetime = reser.usetime;
	this.usecartime = reser.usecartime;
	this.bitmap = reser.bitmap;
};
//对外开放接口
module.exports = Reser;
//定义对象方法
Reser.prototype.save1 = function save1(callback){
	var reser ={
		passphone:this.passphone,
		names:this.names,
		local:this.local,
		dis:this.dis,
		subtime:this.subtime,
		usetime:this.usetime,
		usecartime:this.usecartime,
		carphone:this.carphone,
		bitmap:this.bitmap
		
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('reservation',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(reser,{safe:true},function(err,reser){
			mongodb.close();
				if(err){
					return callback(err);
				}
				return callback(err,reser);
				
			});
		});
	});
	

};
//查找函数
Reser.findAll = function findAll(bool,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('reservation',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({usetime:null},function(err,doc){
				if(err){
					console.log("约车信息查询出错");
				}
				if(doc){
					console.log("我查询到了数据//");
					doc.toArray(function(err,arr){
						//mongodb.close();
                        			if(err){
                           		 	console.log("results toArray error");
				         	mongodb.close();
                            			return;
                        			}
					 	mongodb.close();
                       			 	var a = arr;
                       			 	console.log(a);
					 	callback(err,a);
                    				});
				}
				return callback(err);
			});	
			
		});
		
	});
};
//数据更新
Reser.update = function update(reser,passphone){
	mongodb.open('reservation',function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('reservation',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update({"passphone":passphone,"usetime":null},{"$set":{"usetime":reser.usetime,"carphone":reser.carphone}},{upsert:true},function(err,doc){
			mongodb.close();
			if(err){
				return callback(err);
			}
			return callback(doc);
			});
		});
	});
};


