app.fn = {}; // namespace for UI helper functions

/*****************************************/
/* fn to call to load the template files */
/*****************************************/
app.fn.loadTemplates = function(templateFiles, templateObject) {

	// validate templateFiles
	if (typeof templateFiles == 'string') { templateFiles = [ templateFiles ]; }
	else if (_.isArray(templateFiles) == false) { return false; }

	// probably called from a $.when or with a .done or .then
	if (!templateObject) {
		var deferred = $.Deferred();
		templateObject = {};
	}
	// called with a callback fn
	else if (_.isFunction(templateObject)) {
		var callback = templateObject;
		templateObject = {};
	}
	// poorly formed call
	else if (_.isObject(templateObject) == false) {
		return false;
	}

	// build the promises & deferreds
	var promises = [];
	_.each(templateFiles, function(templateFile) {
		promises.push((function() { return $.get(templateFile); })())
	});

	// set the when to build the templates when they're loaded
	$.when.apply($, promises).done(function() {
		_.each(arguments, function(templates) {
			_.each($('<div>'+templates).children(), function(template) {
				templateObject[$(template).attr('id')] = _.template($(template).html());
			});
		});
		if (deferred) { deferred.resolve(templateObject); }
		else { callback(templateObject); }
	});

	// if this was called without a 'templateObject' return the promise
	if (deferred) { return deferred.promise(); }

};

/**********************************************************/
/* fn to load a select with a set of models								*/
/* example: app.fn.loadSelect({														*/
/* 	select: '#users',																			*/
/*	models: app.c.users.models,														*/
/*	value: '_id'																					*/
/*	[, text: 'name' ] // optional, default: options.value	*/
/*	[, emptyFirst: false ] // optional, default: true			*/
/* });																									 	*/
/**********************************************************/
app.fn.loadSelect = function(options) {
	
	// input validation
	if (!options.select || !options.models || !options.value) { return false; }
	
	// probably passed a collection
	if (options.models.models && _.isObject(options.models)) {
		options.models = options.models.models;
	}
	
	// set the text value if it's not specified
	if (!options.text) {
		options.text = options.value;
	}
	
	// set the first <option> to be empty by default
	if (options.emptyFirst !== false) {
		$(options.select).html('<option value=""></option>');
	}
	
	// do the heavy lifting of cramming <option>s into the <select>
	_.each(options.models, function(model) {
		var value = model.get(options.value),
				text = model.get(options.text);
		$(options.select).append('<option value="'+value+'">'+text+'</option>');
	});
	
};

/**********************************/
/* fn to extract & jsonify a form */
/**********************************/
app.fn.getFormData = function(form) {
	return _($(form).serializeArray()).reduce(function(data, field) {
		data[field.name] = field.value;
		return data;
	}, {});
};