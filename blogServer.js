var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blogDB.db')
var ejs = require("ejs");
//Designate where ejs files are kept
app.set("view_engine", "ejs");
//read body of req for url manipulation
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//browser override for put and delete
var metOverride = require('method-override');
app.use(metOverride('_method'));

var port = 3000;

app.get('/', function(req, res){
	res.redirect('blog')
});

//page to view all posts
app.get('/blog', function(req, res){
	db.all("SELECT * FROM posts", function(err, data) {
		if (err) {
			console.log(err)
		} else {
			var posts = data;
		} res.render('index.ejs', {posts: posts})
	})	
})

// individual posts
app.get('/blog/:id', function(req, res){
	var id = req.params.id
	db.get('SELECT * FROM posts WHERE id = ?', id, function(err, data){
		item = data
		res.render('show.ejs', {thisBlog: item})
	})
})

//new posts page
app.get('/blog/new', function(req, res){
	res.render('new.ejs')
});

//create new post
app.post("/blog", function(req, res) {
	db.run("INSERT INTO posts (title, pic, author, post) VALUES (? , ? , ? , ? )", req.body.title, req.body.pic, req.body.author, req.body.post, function(err) {
		if (err) console.log(err);
	})
			res.redirect('/blog');
});


app.get("/blog/:id/edit", function(req,res){
	var id = req.params.id
	db.get("SELECT * FROM posts WHERE id = ?", id, function(err, data) {
		item = data
		res.render('edit.ejs', {
			thisBlog: item
		})
	});
});

//update the post
app.put('/blog/:id', function(req, res){
    var id = req.params.id
    db.run("UPDATE posts SET title = ?, author = ?, post = ?, pic = ? WHERE id = ?", req.body.title, req.body.author, req.body.post, req.body.pic , id, function(err) {
        if (err) console.log(err);
        res.redirect('/blog/' + id)
    });
});

//delete a post
app.delete("/blog/:id", function(req, res) {
	var id = req.params.id
	db.run("DELETE FROM posts WHERE id = ?", id, function(err) {
		if (err) console.log(err);
		res.redirect('/')
	});
});


//liten to server
app.listen(3000);
console.log('Listening on 3000');

