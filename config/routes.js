var Index = require('../app/controllers/index')
var MovieCate = require('../app/controllers/movieCate')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')

module.exports = function(app){
	
	//index
	app.get('/', Index.index)
	app.get('/guestIndex',Index.guestIndex)
	app.get('/guestIndex/:cateId',Index.guestIndex)
	app.get('/aboutus',Index.aboutus)
	app.get('/movie/:id',Movie.detail)
	app.get('/movie/comment/:id',Movie.showComment)
	app.post('/movie/submitScore', Movie.submitScore)
	app.post('/movie/mvUpload', Movie.mvUpload)
	app.post('/movie/baseMovieUpload', Movie.baseMovieUpload)
	app.post('/movie/saveNetworkStatus', Movie.saveNetworkStatus)
	app.post('/movie/uploadBaseMvStatus', Movie.uploadBaseMvStatus)
	
	//work category gl
	app.get('/gl/movieCate', User.signinRequired, MovieCate.cateList)
	app.get('/gl/movieCate/add',User.signinRequired, MovieCate.cateAdd)
	app.get('/gl/movieCateInfo/:id', User.signinRequired, MovieCate.cateInfo)
	app.post('/gl/movieCate/save',User.signinRequired, MovieCate.cateSave)
	app.get('/gl/movieCate/update/:id',User.signinRequired, MovieCate.update)
	app.delete('/gl/movieCate/delete/:id',User.signinRequired, MovieCate.delete)

	//comment
	app.get('/gl/comment/detail/:movieId/:commentId', User.signinRequired,Comment.commentDetail)

	app.get('/movie/covers/:name', Movie.movieCover)
	app.get('/movie/covers/:path/:name', Movie.movieCover)

	app.get('/admin/qiniu/upToken', Movie.qiniuUpload)

	app.get('/gl/movieInfo/:id', User.signinRequired, Movie.movieInfo)
	app.get('/gl/movie', User.signinRequired, Movie.list)
	app.get('/gl/movie/add', User.signinRequired, Movie.add)
	app.post('/gl/movie/save', User.signinRequired, Movie.save)
	app.post('/gl/movie/update/:id', User.signinRequired, Movie.update)
	app.get('/gl/movie/setparams/:id', User.signinRequired, Movie.setParameter)
	app.delete('/gl/movie/delete/:id', User.signinRequired, Movie.delete)
	app.get('/gl/setNetwork/:id', User.signinRequired, Movie.setNetwork)
	app.post('/gl/movie/saveNetwork', User.signinRequired, Movie.saveNetwork)
	app.get('/gl/movie/analysis/:path1/:name', User.signinRequired, Movie.analysisFileDownload)
	app.get('/gl/movie/analysis/:path1/:path2/:name', User.signinRequired, Movie.analysisFileDownload)
	app.get('/gl/movie/analysis/:path1/:path2/:path3/:name', User.signinRequired, Movie.analysisFileDownload)
	app.get('/gl/movie/analysisList/:path', User.signinRequired, Movie.analysisFileList)
	app.get('/gl/movie/createVideosInfomation', User.signinRequired, Movie.createVideosInfomation)
	app.get('/gl/movieInfos/:name',User.signinRequired, Movie.downloadVideosInfomation)
	

	// //user
	app.get('/user/update/:id',User.signinRequired, User.update);
	app.delete('/user/delete/:id',User.signinRequired, User.delete);
	app.post('/user/signup',User.signup);
	app.get('/user/list',User.signinRequired, User.userlist);
	app.post('/user/signin',User.signin);
	app.get('/user/logout',User.logout);
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showSignup);

	app.get('/404',Index.do404)
	app.get('*',Index.do404)

}
