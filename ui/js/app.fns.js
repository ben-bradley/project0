app.fn = {};

// fn to call to load the template files
app.fn.loadTemplates = function(templateFiles, templateObject) {
	// validate templateFiles
	if (typeof templateFiles == 'string') { templateFiles = [ templateFiles ]; }
	else if (_.isArray(templateFiles) == false) { return false; }

	// validate templateObject
	if (!templateObject) {
		var deferred = $.Deferred();
		templateObject = {};
	}
	else if (_.isFunction(templateObject)) {
		var callback = templateObject;
		templateObject = {};
	}
	else if (_.isObject(templateObject) == false) { return false; }

	// build the promises & deferreds
	var promises = [];
	_.each(templateFiles, function(templateFile) {
		promises.push((function() { return $.get(templateFile); })())
	});

	// set the when to build the templates when they're loaded
	$.when.apply($, promises).done(function() {
		_.each(arguments, function(templates) {
			_.each($('<div />').append(templates).children(), function(template) {
				templateObject[$(template).attr('id')] = _.template($(template).html());
			});
		});
		if (deferred) { deferred.resolve(templateObject); }
		else { callback(templateObject); }
	});

	if (deferred) { return deferred.promise(); }

};
