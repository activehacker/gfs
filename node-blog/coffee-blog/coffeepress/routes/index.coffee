Post = require '../models/Post'

module.exports = 
  index: (req, res) ->
    Post.find {}, (err, posts) ->
      res.render 'index'
        title: "My Coffeepress Blog"
        posts: posts

  newPost: (req, res) ->
  	res.render 'add_post', title:"Write New Post"

  addPost: (req, res) ->
  	new Post(req.body.post).save ->
  	  console.log '------------- add post ---------'
  	  console.log '--> id:' + req.body.post.id
  	  console.log 'get post title:' + req.body.post.title
  	  console.log 'get post body:' + req.body.post.body	
  	  res.redirect "/"

  viewPost: (req, res) ->
    Post.findById req.params.id, (err, post) ->
      console.log '--------- view post -------------'
      console.log 'get post title:' + post.title
      console.log 'get post body:' + post.body	
      res.render 'post', post: post, title: post.title  