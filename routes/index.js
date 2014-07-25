var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var db = req.db;
	db.collection('posts').find().toArray(function (err, items){
  	res.render('index', { title: 'My anonymous blog', posts: items });
	});
});

router.post('/', function(req, res){
	var db = req.db;
	var findPosts = {
		content: req.body.postContent,
		title: req.body.title 
	}
	db.collection('posts').insert(findPosts, function(err, result){
		if(err === null){
			res.redirect('/');
		}else{
			msg: err;
		};		
	});
});

router.delete('/:id', function(req, res){
	var db = req.db;
	var target = req.params.id
	db.collection('posts').removeById(target, function(err, result){
		if(result === 1){
			res.redirect('/');
		}else{
			msg: 'error: ' + err;
		};
	});
})

router.get('/update/:id', function(req, res){
	var db = req.db;
	var target = req.params.id;
	db.collection('posts').findById(target, function(err, result){
		res.render('update', {title: "Update post", post: result});
	});
})

router.put('/update/:id', function(req, res){
	var db = req.db;
	var target = req.params.id;
	db.collection('posts').updateById(target, 
		{title: req.body.title,
		 content: req.body.postContent
		}, function(err, result){
		res.redirect('/')
	});
})
module.exports = router;
