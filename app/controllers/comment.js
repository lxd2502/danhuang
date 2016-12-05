var Movie = require("../models/movie")
var Comment = require("../models/comment");
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