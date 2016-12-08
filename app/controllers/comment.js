var Movie = require("../models/movie")
var Comment = require("../models/comment");
var nodeExcel = require('excel-export');
var fs = require('fs');  //node.js核心的文件处理模块

var _ = require('underscore');

exports.commentDetail = function(req,res){
	console.log("-----contr/Comment.js--- Comment detail function")
	var movieId = req.params.movieId;
	var commentId = req.params.commentId;
	Movie.findById(movieId,function(err,Movie){
		if(err){console.log(err);}
		Comment.findById(commentId,function(err,commentData){
			if(err){
				console.log(err);
			}
			console.log(JSON.stringify(commentData));
			res.render('movieCommentDetail',{
				commentInfo: commentData,
				movie: Movie
			});
		});
	});
}

//下载视频信息文件
exports.getAllComments = function(req,res){
	console.log("-----controller/comments ----- getAllComments----------------");

	var headers = [
		{caption:'Video Name',type:'string',width:20},
	 	{caption:'Content',type:'number',width:10},
	 	{caption:'Quality',type:'number',width:10},
	 	{caption:'Fluency',type:'number',width:30},
	 	{caption:'Satisfaction',type:'number',width:10},
	 	{caption:'ip',type:'string',width:15},
	 	{caption:'address',type:'string',width:15},
	 	{caption:'Commit Time', type:'string',width:30},
	 	{caption:'screenWidth',type:'number',width:15},
	 	{caption:'screenHeight',type:'number',width:15},
	 	{caption:'color',type:'number',width:15},
	 	{caption:'pixel',type:'number',width:15},
	 	{caption:'playTime',type:'number',width:15},
	 	{caption:'bufferTime',type:'number',width:15},
	 	{caption:'browserType',type:'string',width:30},
	 	{caption:'browserVersion',type:'string',width:25},
	 	{caption:'userAgent',type:'string',width:20},
	 	{caption:'platform',type:'string',width:15},
	 	{caption:'systemType',type:'string',width:15},
	 	{caption:'pluginsCount',type:'string',width:15},
	 	{caption:'plugins',type:'string',width:15},
	 	{caption:'userLanguage',type:'string',width:15},
	 	{caption:'cookieEnabled',type:'string',width:15},
	 	{caption:'javaEnabled',type:'string',width:15},
	 	{caption:'flash copyright',type:'string',width:15}];

	 var rows = [];

	 Movie.findById(id, function(err, movie){
	 	if (err) { console.log(err); }
	 	Comment.fetch(function(err, comments){
	 		if (err) { console.log(err); }
	 		for (var i = 0; i < comments.length; i++) {
	 			var temp_row = [];
	 			temp_row[0] = movie.title;
	 			temp_row[1] = parseInt(comments[i].vcontent);
	 			temp_row[2] = parseInt(comments[i].clarity);
	 			temp_row[3] = parseInt(comments[i].loadSpeed);
	 			temp_row[4] = parseInt(comments[i].quality);
	 			temp_row[5] = comments[i].ip;
	 			temp_row[6] = comments[i].address;
	 			temp_row[7] = comments[i].meta.createAt.toString();
	 			temp_row[8] = parseInt(comments[i].screenWidth);
	 			temp_row[9] = parseInt(comments[i].screenHeight);
	 			temp_row[10] = parseInt(comments[i].color);
	 			temp_row[11] = parseInt(comments[i].pixel);
	 			temp_row[12] = parseFloat(comments[i].currentTime);
	 			temp_row[13] = parseFloat(comments[i].bufferTime);
	 			temp_row[14] = comments[i].browserType;
	 			temp_row[15] = "v"+comments[i].browserVersion.toString();
	 			temp_row[16] = comments[i].userAgent;
	 			temp_row[17] = comments[i].platform;
	 			temp_row[18] = comments[i].systemType;
	 			temp_row[19] = parseInt(comments[i].pluginsCount);
	 			temp_row[20] = comments[i].plugins;
	 			temp_row[21] = comments[i].userLanguage;
	 			temp_row[22] = comments[i].cookieEnabled;
	 			temp_row[23] = comments[i].javaEnabled;
	 			temp_row[24] = comments[i].flash;
	 			rows[i] = temp_row;
	 		}

	 		// console.log("rows = " + rows);
			var result = exportExcel(headers,rows);
			var filePath = "public/download/" + movie.title+"_comments.xlsx";
			fs.writeFile(filePath, result, 'binary',function(err){
				if(err){
					console.log(err);
				}
				console.log("create " + movie.title+"_comments.xlsx" + " success!");
				res.json({success:1, filename:filePath});
			});

	 	});
	 });
}

//下载视频信息文件
exports.getVideoComments = function(req,res){
	console.log("-----controller/comments ----- getVideoComments----------------")
	var id = req.params.id;
	var headers = [
		{caption:'Video Name',type:'string',width:20},
	 	{caption:'Content',type:'number',width:10},
	 	{caption:'Quality',type:'number',width:10},
	 	{caption:'Fluency',type:'number',width:30},
	 	{caption:'Satisfaction',type:'number',width:10},
	 	{caption:'ip',type:'string',width:15},
	 	{caption:'address',type:'string',width:15},
	 	{caption:'Commit Time', type:'string',width:30},
	 	{caption:'screenWidth',type:'number',width:15},
	 	{caption:'screenHeight',type:'number',width:15},
	 	{caption:'color',type:'number',width:15},
	 	{caption:'pixel',type:'number',width:15},
	 	{caption:'playTime',type:'number',width:15},
	 	{caption:'bufferTime',type:'number',width:15},
	 	{caption:'browserType',type:'string',width:30},
	 	{caption:'browserVersion',type:'string',width:25},
	 	{caption:'userAgent',type:'string',width:20},
	 	{caption:'platform',type:'string',width:15},
	 	{caption:'systemType',type:'string',width:15},
	 	{caption:'pluginsCount',type:'string',width:15},
	 	{caption:'plugins',type:'string',width:15},
	 	{caption:'userLanguage',type:'string',width:15},
	 	{caption:'cookieEnabled',type:'string',width:15},
	 	{caption:'javaEnabled',type:'string',width:15},
	 	{caption:'flash copyright',type:'string',width:15}];

	 var rows = [];

	 Movie.findById(id, function(err, movie){
	 	if (err) { console.log(err); }
	 	Comment.findByMovieId(id, function(err, comments){
	 		if (err) { console.log(err); }
	 		for (var i = 0; i < comments.length; i++) {
	 			var temp_row = [];
	 			temp_row[0] = movie.title;
	 			temp_row[1] = parseInt(comments[i].vcontent);
	 			temp_row[2] = parseInt(comments[i].clarity);
	 			temp_row[3] = parseInt(comments[i].loadSpeed);
	 			temp_row[4] = parseInt(comments[i].quality);
	 			temp_row[5] = comments[i].ip;
	 			temp_row[6] = comments[i].address;
	 			temp_row[7] = comments[i].meta.createAt.toString();
	 			temp_row[8] = parseInt(comments[i].screenWidth);
	 			temp_row[9] = parseInt(comments[i].screenHeight);
	 			temp_row[10] = parseInt(comments[i].color);
	 			temp_row[11] = parseInt(comments[i].pixel);
	 			temp_row[12] = parseFloat(comments[i].currentTime);
	 			temp_row[13] = parseFloat(comments[i].bufferTime);
	 			temp_row[14] = comments[i].browserType;
	 			temp_row[15] = "v"+comments[i].browserVersion.toString();
	 			temp_row[16] = comments[i].userAgent;
	 			temp_row[17] = comments[i].platform;
	 			temp_row[18] = comments[i].systemType;
	 			temp_row[19] = parseInt(comments[i].pluginsCount);
	 			temp_row[20] = comments[i].plugins;
	 			temp_row[21] = comments[i].userLanguage;
	 			temp_row[22] = comments[i].cookieEnabled;
	 			temp_row[23] = comments[i].javaEnabled;
	 			temp_row[24] = comments[i].flash;
	 			rows[i] = temp_row;
	 		}

	 		// console.log("rows = " + rows);
			var result = exportExcel(headers,rows);
			var filePath = "public/download/" + movie.title+"_comments.xlsx";
			fs.writeFile(filePath, result, 'binary',function(err){
				if(err){
					console.log(err);
				}
				console.log("create " + movie.title+"_comments.xlsx" + " success!");
				res.json({success:1, filename:movie.title+"_comments.xlsx"});
			});

	 	});
	 });
}

//下载视频信息文件
exports.downloadComments = function(req,res){
	console.log("-----analysisFileDownload----------------")
	var name = req.params.name;

	var filePath = "./public/download/" + name;

 	var stats = fs.statSync(filePath); 
	
	console.log("file : " + filePath);
 	console.log("stats.isFile() : " + stats.isFile());
 	
 	if(stats.isFile()){
  		res.writeHead(200, {
   			'Content-Type': 'application/octet-stream',
	   		'Content-Disposition': 'attachment; filename='+"videoComments.xlsx",
	   		'Content-Length': stats.size
	  	});
	  	fs.createReadStream(filePath).pipe(res);
 	} else {
  		res.end(404);
 	}
}

function exportExcel(headers, rows) {
	var conf ={};
    conf.name = "mysheet";
    conf.cols = [];
    for(var i = 0; i < headers.length; i++){
        var col = {};
        col.caption = headers[i].caption;
        col.type = headers[i].type;
        conf.cols.push(col);
    }
    conf.rows = rows;
    var result = nodeExcel.execute(conf);
    return result;
}