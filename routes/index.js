var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
		var db = req.db
		db.collection('posts').find().toArray(function (err, items){
				console.log(items)
				// posts = items;
  			res.render('index', { title: 'My anonymous blog', posts: items });
			})
	// return posts
});

router.post('/', function(req, res){
	var db = req.db
	var params = {
		content: req.body.postContent,
		title: req.body.title 
	}
	db.collection('posts').insert(params, function(err, result){
		if(err === null){
			res.redirect('/')
		}else{
			msg: err;
		};		
		// 	(err === null) ? {msg: ""} : {msg: err}
		// 	)
	})
	// var posts = db.collection('posts').find().toArray(function(err, items){
	// 	// res.json(items)
	// })
	// console.log(posts)
	// // , { title: "You created a new post", postContent: req.body.postContent, postTitle: req.body.title }
})

module.exports = router;
