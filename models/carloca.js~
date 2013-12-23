var mongodb = require('./db');
var collecting = require('./collection');
function CarLoca(carloca){
	this.carphone = carloca.carphone;
	this.long = carloca.long;
	this.lat = carloca.lat;
	this.passphone = carloca.passphone;
};

module.exports = CarLoca;

CarLoca.prototype.save = function save(callback){
	var carloca = {
	carphone:this.carphone,
	long:this.long,
	lat:this.lat,
	passphone:this.passphone
	};
	mongodb.open(function(err,db){
		db.collection('Carlocation',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//建立索引
			collection.ensureIndex('carphone',{unique:true});
			//保存数据
			collection.save(carloca,{safe:true},function(err,carloca){
			mongodb.close();
			callback(err,carloca);
			});
		});
	});
};

//数据更新
CarLoca.update = function update(findString,Carlocation,callback){
	collecting(Carlocation,function(err){
		console.log('***********************'+getcoll());
		getcoll().update({'carphone':findString},{$set:{'long':findString}},{upsert:true});
	});
};

CarLoca.update1 = function update1(carphonei,carlocaobj,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		//connect------Carlocation ----- collection
		db.collection('Carlocation',function(err,collection){
			if(err){
				console.log("数据库链接错误");
				mongodb.close();
				return callback(err);
			}
		//update phonenumber is carphone items
			collection.update({"carphone":carphonei},{$set:{"long":carlocaobj.long,"lat":carlocaobj.lat}},{upsert:true},function(err,a){
			mongodb.close();
			console.log("我关了数据库");
			if(err){
				callback(err);
			}else{
				callback(a);
			}
			});
			
		});
	});
	
};
//此方法为进入到导航功能之后的数据查询方法
CarLoca.findOnly = function findOnly(carphone,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection('Carlocation',function(err,collection){
			if(err){
				console.log('数据库链接错误');
				mongodb.close();
				return callback(err);
			}
			
			collection.find({"carphone":String(carphone)},function(err,doc){
				if(doc){
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
                    			
                    			//callback(err,doc);
				}else{
					callback(err);
				}
			});
		});
	});
};

//此方法为在某个范围内的用户提供周围信息的
CarLoca.findAll = function findAll(long,lat,callback){
	mongodb.open(function(err,db){
		if(err){
			mongodb.close();
			return callback(err);
		}
		db.collection("Carlocation",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			if(!collection)
			console.log("collection 出错了！！！");
			collection.find({"long":{"$lte":long+2.0,"$gte":long-2.0},"lat":{"$lte":lat+2.0,"$gte":lat-2.0}},function(err,doc){
			//collection.find(function(err,doc){
				//mongodb.close();
				if(err){
					return callback(err);
					mongodb.close();
					console.log("出错了！！！");
				}else
				if(doc){
				var s = "邓国涛";
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
                    				//mongodb.close();
				}else{
					callback(err,null);
					console.log("没有找到");
				}
			});
		});
	});
};


