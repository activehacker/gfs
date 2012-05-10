# mocha -R Spec test/index-route.coffee -r coffee-script
routes = require '../routes/index'

require "should"

describe 'routes', ->
	req = {}
	res = {}

	describe 'index', ->
		it 'should display index with posts', (done)->
			res.render = (view, vars) ->
				view.should.equal "index"
				vars.title.should.equal "My Coffeepress Blog"
				vars.posts.should.eql []
				done()
			routes.index req, res

	describe 'new post', ->
    	it 'should display the add post page', (done)->
    		res.render = (view, vars) ->
    			view.should.equal "add_post"
    			vars.title.should.equal "Write new post"
    			done()
    		routes.newPost req, res	