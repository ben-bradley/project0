app.V = {};
app.v = {};

// View to built the top-level framework
app.V.Page = Backbone.View.extend({
	
	// this is the top-level container
	className: 'container-fluid',
	
	// the id for this div is 'page'
	attributes: { id: 'page' },
	
	// create the child views in 'initialize'...
	initialize: function() {
		this.navbar = new app.V.Navbar();
		this.main = new app.V.Main();
		this.render();
	},
	
	// append them to the DOM in 'render'
	render: function() {
		this.$el.append(this.navbar.$el);
		this.$el.append(this.main.$el);
		$('body').append(this.$el);
		this.main.fixHeight(); // fix the height of the main section
		return this;
	}
	
});

// View to build the navbar
app.V.Navbar = Backbone.View.extend({
	
	// the navbar is contained in a div.row-fluid
	className: 'row-fluid',
	
	// the id of the nav bar is ... 'navbar', clever, huh?
	attributes: { id: 'navbar' },
	
	// if, at some point, child views need to be appended, they go here
	initialize: function() {
		this.render();
	},
	
	// stick it all in the dom
	render: function() {
		this.$el.html(app.t['navbar-tpl']);
		return this;
	}
	
});

// View to build the main section of the page
app.V.Main = Backbone.View.extend({
	
	// the main section is also contained in a div.row-fluid
	className: 'row-fluid',
	
	// the main section's id is 'main'
	attributes: { id: 'main' },
	
	// set a listener to fix #main height and create the child views
	initialize: function() {
		var self = this;
		$(window).resize(function() { self.fixHeight(); });
		this.about = new app.V.About({ el: this.$el });
		this.contact = new app.V.Contact({ el: this.$el });
		this.render();
	},
	
	// by default, show the main template
	render: function() {
		this.$el.html(app.t['main-tpl'])
		return this;
	},
	
	// this resizes #main to fit the window w/ a 15px buffer
	fixHeight: function() {
		var h = $(window).innerHeight() - this.$el.offset().top - 15;
		this.$el.css({ 'height': h, 'max-height': h, 'overflow-y': 'auto' });
	}
	
});

// View to build the about page
app.V.About = Backbone.View.extend({
	
	// this is a child-view so just return it to be rendered later
	initialize: function() {
		return this;
	},
	
	// when the "#/about" route is triggered, render this
	render: function() {
		this.$el.html(app.t['about-tpl']);
	}
	
});

// View to build the contact page
app.V.Contact = Backbone.View.extend({
	
	// this is also a child-view, return it for later rendering
	initialize: function() {
		return this;
	},
	
	// render when the "#/contact" route is triggered
	render: function() {
		this.$el.html(app.t['contact-tpl']);
	}
	
});