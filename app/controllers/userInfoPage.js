var UserInfoNoVideo = require("../models/userInfoPage");
var _ = require('underscore');

exports.userInfoDetail = function(req,res){
	console.log("-----contr/UserInfoPage.js--- UserInfo detail function")
	var infoId = req.params.infoId;
	UserInfoNoVideo.findById(infoId,function(err,info){
		if(err){
			console.log(err);
		}
		console.log(JSON.stringify(info));
		res.render('pageUserInfoDetail',{
			commentInfo: info,
			movie: {title:info.pagename}
		});
	});
}

exports.showUserInfo = function(req,res){
	console.log("-----contr/UserInfoPage.js--- showUserInfo function")
	var id = req.params.id;

	var title = "home page";
	if (id == "1") {
		title = "video list page";
	}

	console.log("detail get params id="+id + " title = " + title);
	
	UserInfoNoVideo.findByPageId(id,function(err,infos){
		if(err){
			console.log(err);
			res.render('404',{});
		}
		else{
			console.log("infos.length = " + infos.length);
			console.log(JSON.stringify(infos));
			res.render('pageUserInfoList',{
				comments: infos,
				title: title
			});
		}
	});
}

exports.submitUserInfo = function(req,res){
	console.log("-----contr/UserInfoPage.js--- submitUserInfo function")

	//var oid = req.body.Movie._id;
	//console.log("oid = " + oid);
	var pageid = req.body.id;
	var pagename = "";
	if (pageid == "0") {
		pagename = "home page";
	} else {
		pagename = "video list page";
	}

	var browserType = req.body.browserType;
	var browserVersion = req.body.browserVersion;
	var userAgent = req.body.userAgent;
	var cookieEnabled = req.body.cookieEnabled;
	var platform = req.body.platform;
	var systemType = req.body.systemType;
	var pluginsCount = req.body.pluginsCount;
	var plugins = req.body.plugins;
	var userLanguage = req.body.userLanguage;
	var javaEnabled = req.body.javaEnabled;
	var flash = req.body.flash;
	var screenWidth = req.body.screenWidth;
	var screenHeight = req.body.screenHeight;
	var color = req.body.color;
	var pixel = req.body.pixel;
	var ip = req.body.ip;
	var address = req.body.address;
	
	console.log("pageid = " + pageid);

	_userInfo = new UserInfoNoVideo({
		pageid: pageid,
		pagename: pagename,
		browserType: browserType,
		browserVersion: browserVersion,
		userAgent: userAgent,
		cookieEnabled: cookieEnabled,
		platform: platform,
		systemType: systemType,
		pluginsCount: pluginsCount,
		plugins: plugins,
		userLanguage: userLanguage,
		javaEnabled: javaEnabled,
		flash: flash,
		screenWidth: screenWidth,
		screenHeight: screenHeight,
		color: color,
		pixel: pixel,
		ip: ip,
		address: address
	});

	_userInfo.save(function(err,userInfo){
		if(err){
			console.log(err);
		}else{
			console.log("userInfo in homepage or listpage saved succeed!");
			// res.json({result : 1});
		}
	});
}