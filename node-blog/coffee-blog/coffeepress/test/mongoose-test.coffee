mongoose = require 'mongoose'
Post     = require '../models/Post'

describe 'post', ->
  before (done) ->
    mongoose.connect 'mongodb://localhost/coffeepress', ->
      Post.remove done
  it 'should create a new post', (done) ->
    post = new Post(title:'First!', body:'First post bastiches!')
    post.save ->
      Post.findOne _id: post._id, (err, retrivedPost) ->
        retrivedPost.title.should.eql 'First!'
        retrivedPost.body.should.eql 'First post bastiches!'
        done()