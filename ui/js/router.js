app.Router = Backbone.Router.extend({
	routes: {
		''				: 'home',
		'about'		: 'about',
		'contact'	: 'contact',
		'user/:id'	: 'user'
	},
	
	home: function() {
		console.log("home clicked");
		app.v.page.main.render();
	},
	
	about: function() {
		console.log("about clicked");
		app.v.page.main.about.render();
	},
	
	contact: function() {
		console.log("contact clicked");
		app.v.page.main.contact.render();
	},
	
	user: function(id) {
		console.log('user: '+id);
	}
	
});