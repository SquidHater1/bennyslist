/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Ryan Smith
 * Email: smithry9@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var postData = require('./postData.json');
//console.log("== postData1: ", postData[1]);

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res, next){
  res.status(200).render('postPage', {
	posts: postData,
	post: null,
	normalSite: true
  });
});

app.use(express.static('public'));



app.get('/posts/:n', function(req, res, next){
  var index = req.params.n.toLowerCase();
  //console.log("== index: ", index);
  if(index < postData.length && index >= 0){
	//console.log(postData[index]);
	res.status(200).render('postPage', {
		posts: postData,
		post: postData[index],
		normalSite: false
	});
  }else{
	next();
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
