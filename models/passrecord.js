var mongodb = require('./db');

function PassRecord(passrecord){
	this.passid = passrecord.passid;
	this.time = passrecord.time;
	this.carphone = passrecord.carphone;
	this.locallong = passrecord.locallong;
	this.locallat = passrecord.locallat;
};

module.exports = PassRecord;

PassRecord.prototype.save = function save(callback){
	var passrecord = {
		passid:this.passid,
		time:this.time,
		carphone:this.carphone,
		locallong:this.locallong,
		locallat:this.locallat
	};
	
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('passengerRecord',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(passrecord,{safe:true},function(err,passrecord){
			mongodb.close();
			callback(err,passrecord);
			});
		});
	});
};

PassRecord.findAll = function findAll(passid,callback){
	mongodb.open(function(err,db){
	if(err){
		return callback(err);
	}
	//链接集合
	db.collection('passengerRecord',function(err,collection){
		if(err){
			mongodb.close();
			return callback(err);
		}
		collection.find({"passid":passid},function(err,doc){
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
