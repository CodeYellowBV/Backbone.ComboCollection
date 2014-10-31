// inspired by Backbone.VirtualCollection
// compatible and works great in conjunction with it

(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['backbone', 'underscore'], factory);
	} else if (typeof exports !== 'undefined') {
		var
		Backbone = require('backbone'),
		_ = require('underscore');
		module.exports = factory(root, Backbone, _);
	} else {
		root.Backbone.ComboCollection = factory(root, root.Backbone, root._);
		root.ComboCollection = root.Backbone.ComboCollection;
	}
}(this, function(Backbone, _) {
	'use strict';

	var
	ComboCollection = function(arrayOfCollections, comboCollectionOptions, collectionOptions) {
		_.defaults(comboCollectionOptions, {
			Collection: Backbone.Collection
		});

		var
		Collection = comboCollectionOptions.Collection.extend({

			initialize: function() {
				var
				models = [];

				_.each(arrayOfCollections, _.bind(function(collection) {

					// re initialize any time one of the collections changes
					this.listenToOnce(collection, 'add remove change reset sort', _.bind(function() {
						this.initialize();
					}, this));

					// add the models from all of the collections together into one array
					models = models.concat(collection.models);

				}, this));

				this.reset(models);
			}

		}),

		comboCollection = new Collection(null, collectionOptions);

		return comboCollection;
	};

	return ComboCollection;

}));