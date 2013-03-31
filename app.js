var express = require('express'),
		app = express(),
		mongo = require('mongojs'),
		db = mongo('project0', [ 'collection0' ]);
		
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'blargh' }));
	app.use('/', express.static('ui'));
	app.get('/session_vars', function(req, res) {
		res.send(req.session);
	});
	app.post('/signin', function(req, res) {
		req.session.postvars = req.body;
		res.send(req.session);
	});
	app.get('/signout', function(req, res) {
		req.session.destroy();
		res.send(req.session);
	});
});

app.listen(8080);