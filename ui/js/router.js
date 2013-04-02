app.Router = Backbone.Router.extend({
	// routes listed here are client-side routes
	// routes may be prefixed with "#/" in the browser
	// and still work as listed below
	// format = 'url/route': 'functionName'
	routes: {
		''					: 'home',
		'about'			: 'about',
		'contact'		: 'contact',
		'signin'		: 'signin',
		'signout'		: 'signout',
		'user/:id'	: 'user'
	},
	
	// the main splash page
	home: function() {
		console.log("home clicked");
		app.v.page.main.render();
	},
	
	// a child-view of the main page
	about: function() {
		console.log("about clicked");
		app.v.page.main.about.render();
	},
	
	// a child-view of the main page
	contact: function() {
		console.log("contact clicked");
		app.v.page.main.contact.render();
	},
	
	// show the signin form
	signin: function() {
		console.log("signin clicked");
		app.v.page.main.signin.render();
	},
	
	// trigger the signout
	signout: function() {
		console.log("sign out");
		app.m.me.signout();
	},
	
	// just an example to show how to use vars
	user: function(id) {
		console.log('user: '+id);
	}
	
});