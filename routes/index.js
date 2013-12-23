var mongodb = require('../models/db.js');
//出租车注册信息
var Carinf = require('../models/carinf.js');
//用户注册信息
var Passenger = require('../models/passenger.js');
//用户定位信息对象
var PassLoca = require('../models/passloca.js');
//出租车定位信息对象
var CarLoca = require('../models/carloca.js');
//出租车接单记录对象
var CarRecord = require('../models/carrecord.js');
//获取乘客打车记录对象
var PassRecord = require('../models/passrecord.js');
//约车信息记录对象
var Reser = require('../models/reservation.js');
module.exports = function(app){
//var Carinf = require('../models/carinf.js');
	app.get('/',function(req,res){
	res.render('index',{
		title:'express 首页！！！'
	});
	});
	//////app.user方法
	app.get('/user',function(req, res){
  		res.send("respond with a resource");
	});
	
	//app.chuzuche
	app.get('/chu',function(req,res){
	console.log("/chu");
		res.render('chuzuche');
	});
	//app.chuzuche注册方法
	app.post('/chu',function(req,res){
	//console.log('提交的注册信息中电话不能为空1234');
		if(req.body.phonenum==""||req.body['phonenum']==null){
		console.log('提交的注册信息中电话不能为空');
		}else{
		
		var newCarinf = new Carinf({
			carname:req.body.carname,
			phonenum:req.body.phonenum,
			drivelic:req.body.drivelic,
			licplnum:req.body['licplnum'],
			company:req.body['company'],
			carnum:req.body['carnum']
		});
		
		//检测用户是否存在
		Carinf.get(newCarinf.phone,function(err,carinf){
			if(carinf)
			err = "phonenum already exists.";
			if(err){
			//req.flash('error',err);
			return res.redirect('/chu');
			}
			
			//如果不存在这个用户就将其插入到数据库中
			newCarinf.save(function(err){
				if(err){
				//req.flash('error',err);
				console.log("出租车用户注册失败！！！请重新注册吧。");
				return res.redirect('/chu');
				}
				//seq.flash('success','注册成功！');
				console.log("出租车用户注册成功！！！");
				res.redirect('/');
			});
		});
		}
	});
	
	//注册passenger用户的接受方法
	app.get('/passenger',function(req,res){
		res.render('passenger');
	});
	//passenger用户注册信息接受方法
	app.post('/passenger',function(req,res){
		//var passenger = require('../models/passenger.js');
	//console.log('提交的注册信息中电话不能为空1234');
		if(req.body.passphonenum==""||req.body['passphonenum']==null){
		console.log('提交的注册信息中电话不能为空');
		}else{
		
		var newpassenger = new Passenger({
			passengername:req.body.passengername,
			passphonenum:req.body.passphonenum,
		});
		
		//检测用户是否存在
		Passenger.get(newpassenger.passphonenum,function(err,passenger1){
			if(passenger1)
			err = "phonenum already exists.";
			if(err){
			//req.flash('error',err);
			return res.redirect('/passenger');
			}
			
			//如果不存在这个用户就将其插入到数据库中
			newpassenger.save(function(err){
				if(err){
				//req.flash('error',err);
				console.log("乘客用户注册失败！！！请重新注册吧。");
				return res.redirect('/passenger');
				}
				//seq.flash('success','注册成功！');
				console.log("乘客用户注册成功！！！");
				//res.redirect('/');
			});
		});
		}
		res.send("非常欢迎！！！<br/>你已经进入的打车用户注册页面！！！");
	
	});
	
	//用户定位信息模拟注册
	app.get('/passloca',function(req,res){
		console.log("passloca");
		res.render('passengerlocation');
	});
	
	//用户定位模拟信息接收注册
	app.post('/passloca',function(req,res){
	//获取提交信息构建存储对象
		var passloca = new PassLoca({
		passphone:req.body.passphone,
		long:req.body.long,
		lat:req.body.lat,
		carphone:req.body.carphone
		});
		
		passloca.save(function(err){
			if(err){
			console.log("用户定位信息上传失败。");
			return res.redirect('/passloca');
			}
			console.log("乘客用户注册成功！！！");
			res.redirect('/');
					//进行数据库查询
		});
	});
	app.post("/passlocationupdate",function(req,res){
		//获取提交信息构建存储对象
		var passloca = new PassLoca({
		passphone:req.body.passphone,
		long:parseFloat(req.body.ls),
		lat:parseFloat(req.body.lat),
		carphone:req.body.carphone
		});
		PassLoca.updatePassLoca(req.body.passphone,passloca,function(err){
			if(err){
				console.log('乘客信息更新出错');
			}
					//进行数据库查询
		CarLoca.findAll(passloca.long,passloca.lat,function(err,doc){
			if(err){
				console.log("返回页面出错");
				mongodb.close();
				}
				mongodb.close();
				console.log("我现在查询到了我周围车的位置信息");
				console.log(doc);
				res.send(doc);
		});
			console.log('乘客定位信息更新成功！');
		});
	});
	
	//注册出租车定位信息模拟注册
	app.get('/carloca',function(req,res){
		console.log("carloca");
		res.render('carlocation');
	});
	
	app.post('/carloca',function(req,res){
		var carloca = new CarLoca({
		carphone:req.body.carphone,
		long:parseFloat(req.body.long),
		lat:parseFloat(req.body.lat),
		passphone:req.body.passphone
		});
		
		carloca.save(function(err){
			if(err){
				console.log('出租车定位信息保存出错！');
				return res.redirect('/carloca');
			}
			console.log('出租车定位信息保存成功！');
			res.redirect('/');
		});
	
	});
	
	
	//出租车定位信息更新页面
	app.get('/carlocaupdate',function(req,res){
		//console.log("出租车定位信息更新页面");
		res.render('updatecar');
	});
	
	app.post('/carlocaupdate',function(req,res){
		var carloca = new CarLoca({
		carphone:req.body.carphone,
		long:parseFloat(req.body.long),
		lat:parseFloat(req.body.lat),
		passphone:req.body.passphone
		});
		console.log("--------------------");
		CarLoca.update1(req.body.carphone,carloca,function(err){
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
			if(err){
				console.log("出租车定位升级失败！");
				return res.redirect('/updatecar');
			}
			
			console.log('出租车定位信息更新成功！');
			res.redirect('/');
		});
	});
	//同上方法相同此方法只为满足移动端访问请求
	//定位更新
	app.post("/carupdate",function(req,res){
		var carloca = new CarLoca({
		carphone:req.body.carphone,
		long:parseFloat(req.body.longs),
		lat:parseFloat(req.body.lat),
		passphone:req.body.passphone
		});
		console.log("--------------------");
		CarLoca.update1(req.body.carphone,carloca,function(err){
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
			if(err){
				console.log("出租车定位升级失败！");
				return res.redirect('/updatecar');
			}
			
			console.log('出租车定位信息更新成功！');
			//res.redirect('/');
			PassLoca.findAll(carloca.long,carloca.lat,function(err,doc){
				if(err){
					console.log("乘客信息查询错误");
				}
				res.send(doc);
			});
			
		});
	});
	
	
	
	
	
	//司机接单记录访问页面
	app.get('/carrecordin',function(req,res){
		res.render('carrecordin');
	});
	//司机接单参数接受注册
	app.post('/carrecordin',function(req,res){
		var carrecord = new CarRecord({
			carid:req.body.carid,
			time:new Date(),
			passphone:req.body.passphone,
			locallong:parseFloat(req.body.locallong),
			locallat:parseFloat(req.body.locallat),
			destlong:parseFloat(req.body.destlong),
			destlat:parseFloat(req.body.deatlat)
		});
		carrecord.save(function(err){
			if(err){
			console.log("用户定位信息上传失败。");
			return res.redirect('/carrecordin');
			}
			console.log("乘客用户注册成功！！！");
			res.redirect('/');
		});
	
	});
	//注册乘客打车记录页面访问路径
	app.get('/passrecordin',function(req,res){
		res.render('passrecord');
	});
	
	app.post('/passrecordin',function(req,res){
		var passrecord = new PassRecord({
			passid:req.body.passid,
			time:new Date(),
			carphone:req.body.carphone,
			locallong:req.body.locallong,
			locallat:req.body.locallat
		});
		passrecord.save(function(err){
			if(err){
				console.log("乘客打车记录记录失败");
				return res.redirect('/passrecordin');
			}
			console.log("乘客打车记录记录成功！！");
			PassRecord.findAll(this.passid,function(err,doc){
				console.log(doc);
			});
			res.redirect('/');
		});
	});
	//对外开放
	app.get('/subrefore',function(req,res){
		res.render('subrefore');
	});
	//在移动应用客户端打开之后又为提出打车请求之前获取司机信息的服务器方法
	app.post('/subrefore',function(req,res){
		var lat = Number(req.body.lat);
		var lon = Number(req.body.ls);
		console.log(lon);
		//进行数据库查询
		CarLoca.findAll(lon,lat,function(err,doc){
			if(err){
				console.log("返回页面出错");
				mongodb.close();
				}
				mongodb.close();
				console.log("我现在查询到了我周围车的位置信息");
				console.log(doc);
				res.send(doc);
		});
		});
		
	//接受约车请求
	app.post('/reservation',function(req,res){
		var reservation1 = new Reser({
		passphone:req.body.passphone,
		names:req.body.names,
		local:req.body.local,
		dis:req.body.dis,
		subtime:req.body.subtime,
		usetime:null,
		usecartime:req.body.usecartime,
		bitmap:null
		});
		console.log(reservation1.passphone+"____"+reservation1.names+"---"+reservation1.dis+"***"+reservation1.subtime);
		reservation1.save1(function(err,doc){
		if(err){
			console.log("约车信息保存失败");
			res.send("约车信息保存出错了");
		}else{
		if(doc){
		console.log("约车成功");
		res.send("约车信息发布成功");
		}
		}
		
		});
	});
	
	
	//测试方法
	app.get('/a',function(req,res){
		CarLoca.findAll(4,4,function(err,arr){
			if(err){
				console.log("返回页面出错");
			}
			console.log("我现在查询到了我周围车的位置信息");
			var string;
			//console.log(string);
			var las = parseInt(arr.length);
			var e = '';
			//for(var i = 0;i<las;i++){
			//	mongodb.close();
			//	string = JSON.stringify(arr[i]);
			//	Carinf.get("5",function(err,carinf){
			//	console.log("ddddddddddarr+i[lat]."+string);
			//	//var obj=eval('('+jsonString+')')
			//	
			//	e = e+','+subString1(string,carinf);
			//	
			//	console.log(e);
			//	//e ="{刺客：邓国涛ggfdgdfgdfgdfgdfgdfgdfgdfgd}"
			//	if(e !== ""|| e !== null)
			//	res.send(e);
			//	});
			//	//arr[i] = e;
			//	}
			//res.render('get', {
			//	title:req.params.name+'|电影|管理|moive.me',
			//	label:arr[0].carphone,
			//	la:las
			//	});
			mongodb.close();
			res.send(arr);
			});
	});
	function subString1(a,b){
	var alen =a.length;
	var a1 = a.substring(0,alen-1);
	var blen = b.length;
	var b1 = b.substring(0,blen);
	var c = a1+','+b1;
	return c;
	}
	
};
