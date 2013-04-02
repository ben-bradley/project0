app.M = {}; // namespace for model constructors
app.m = {}; // namespace for models

/******************************************/
/* by default, set the ID to the ObjectID */
/******************************************/
Backbone.Model.prototype.idAttribute = "_id";

/*******************************************/
/* a model for the current user, a.k.a. me */
/*******************************************/
app.M.Me = Backbone.Model.extend({
	
	defaults: {
		'_id': null,
		'signedin': false
	},
	
	// http://example.com/me
	url: 'me',
	
	// just return the model
	initialize: function() {
		return this;
	},
	
	// returns a promise to delay page laods
	getMe: function() {
		var self = this;
		return $.get(this.url, function(data) {
			self.set(data); // stuff the data back into the model
		});
	},
	
	// process a sign-in request
	signin: function(data) {
		var self = this;
		return $.post(this.url, data, function(result) {
			if (result.success) {
				self.set(result.success);
				app.router.navigate('/');
			}
			else if (result.error) {
				self.set(self.defaults());
				console.log(result.error);
			}
		});
	},
	
	// sign out
	signout: function() {
		this.set('signedin', false);
		app.router.navigate('/');
		this.destroy();
	}
	
});