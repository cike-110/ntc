var mongodb = require('./db');

function Carinf(carinf){
	this.carname = carinf.carname;
	this.phonenum = carinf.phonenum;
	this.drivelic = carinf.drivelic;
	this.licplnum = carinf.licplnum;
	this.company = carinf.company;
	this.carnum = carinf.carnum;
};

module.exports = Carinf;

//将出租车注册信息保存到数据库中
Carinf.prototype.save = function save(callback){
	//存入mongoDb的文档
	var carinf = {
	carname:this.carname,
	phonenum:this.phonenum,
	drivelic:this.drivelic,
	licplnum:this.licplnum,
	company:this.company,
	carnum:this.carnum
	};
	
	mongodb.open(function(err,db){
		if(err){
		return callback(err);
		}
		db.collection('Car',function(err,collection){
		if(err){
			mongodb.close();
			return callback(err);
		}
		
		//为phonenum属性添加索引
		collection.ensureIndex('phonenum', {unique: true});
		//写入Car文档
		collection.insert(carinf,{safe: true}, function(err,carinf){mongodb.close();
		callback(err, carinf);});
		});
	});
};


Carinf.get = function get(phone, callback){
	mongodb.open(function(err, db){
		if(err){
		mongodb.close();
		return callback(err);
		}
		
		//读取CARinf集合
		db.collection('Car',function(err, collection){
			if(err){
			mongodb.close();
			return callback(err);
			}
			//查找phonenum属性为phone的文档
			var s;
			collection.findOne({"phonenum":phone},function(err, doc){
			mongodb.close();
			if(doc){
			//降文档封装成Carinf对象
			//var carinf = new Carinf(doc);
			 s = JSON.stringify(doc);
                       			console.log(s);
                       			mongodb.close();
                       			//"{d:1}"
					callback(err,s);
			}else{
				callback(err, null);
				//Console.log("没有查询到！");
			}
			});
			
		});
	});	
	};
