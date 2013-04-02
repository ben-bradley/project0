var express = require('express'),
		app = express(),
		mongo = require('mongojs'),
		db = mongo('project0', [ 'users' ]);
		
/*************************************/
/* begin configurations for this app */
/*************************************/
app.configure(function() {
	
	// app configs
	app.use(express.bodyParser()); // handle POST/PUT
	app.use(express.cookieParser()); // enable sessions
	app.use(express.session({ secret: 'blargh' })); // configure sessions
	
	// static file path
	app.use('/', express.static('ui'));
	
	/* start server-side app routes */
	
	// send the information about the current user (me)
	app.get('/me', function(req, res) {
		delay(function() { res.send(req.session.me); });
	});
	
	// process user login requests
	app.post('/me', function(req, res) {
		/************************************************************/
		/* There should be user-checking of some sort done here     */
		/* All I'm doing is taking the user input, adding a random 	*/
		/* _id value and sending it back														*/
		/************************************************************/
		req.session.me = req.body;
		req.session.me._id = new ObID();
		req.session.me.signedin = true;
		res.send({ success: req.session.me });
	});
	
	// clear the session
	app.delete('/me', function(req, res) {
		req.session.destroy();
		res.send({ success: true });
	});
	
	// talk to the db to send a list of users
	app.get('/users', function(req, res) {
		db.users.find(
			{},
			function(err, users) {
				res.send(users);
			}
		);
	});
	
	// do a lookup in the db for a specific user
	app.get('/users/:id', function(req, res) {
		db.users.findOne(
			{ _id: ObID(req.params.id) },
			function(err, user) {
				res.send(user);
			}
		);
	});
	
});

/*********************************************/
/* helper fn to convert strings to ObjectIds */
/*********************************************/
function ObID(id) {
	try { return mongo.ObjectId(id); }
	catch(err) { return { error: err } }
}

/********************************************/
/* insert random delays to simulate latency */
/********************************************/
function delay(callback, n) {
	var r = Math.floor(Math.random()*(n || 5000));
	setTimeout(function() { callback(); }, r);
}

/********************/
/* start the server */
/********************/
app.listen(8080);