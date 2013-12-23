var mongodb = require('./db');

//定义司机接单记录模型
function CarRecord(carrecord){
	this.carid = carrecord.carid;
	this.time = carrecord.time;
	this.passphone = carrecord.passphone;
	this.locallong = carrecord.locallong;  //接单地址
	this.locallat = carrecord.locallat;
	this.destlong = carrecord.destlong;//目的地址
	this.destlat = carrecord.destlat;
};

module.exports = CarRecord;
//出租车接单记录保存函数
CarRecord.prototype.save = function save(callback){
	//存入mongodb的文档
	var carrecord = {
	carid : this.carid,
	time : this.time,
	passphone : this.passphone,
	locallong : this.locallong,
	locallat : this.locallat,
	destlong : this.destlong,
	destlat : this.destlat
	};
	
	mongodb.open(function(err,db){
		if(err){
		return callback(err);
		}
		db.collection('CarRecord',function(err, collection){
		if(err){
			mongodb.close();
			return callback(err);
		}
		
		//为passphonenum建立索引
		//collection.ensureIndex('',{unique: true});
		//将信息吸入到passenger集合中
		collection.insert(carrecord,{safe:true},function(err,carrecord){
			mongodb.close();
			callback(err,carrecord);
		});
		});
	});
	
};

//查询方法
CarRecord.findAll = function findAll(carid,callback){
	mongodb.open(function(err,db){
	if(err){
		return callback(err);
	}
	//链接集合
	db.collection('CarRecord',function(err,collection){
		if(err){
			mongodb.close();
			return callback(err);
		}
		collection.find({"carid":carid},function(err,doc){
			mongodb.close();
			if(doc){
				console.log("我已经查到了所有的出车记录。");
				callback(err,doc);
				
			}else{
				callback(err);
			}
		});
	});
	});
}
//对外开放

