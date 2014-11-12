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
				this.keepComboCollectionUpdated();

				// call the passed in collection's initialize function
				comboCollectionOptions.Collection.prototype.initialize.apply(this, arguments);
			},

			keepComboCollectionUpdated: function() {
				// initial update, build the collection from passed in collections
				this.updateComboCollection();
				// update the combo collection any time one of the passed in collections changes
				_.each(arrayOfCollections, _.bind(function(collection) {
					this.listenTo(collection, 'add remove change reset sort', _.debounce(this.updateComboCollection, 100));
				}, this));
			},
			updateComboCollection: function() {
				var
				models = [];

				_.each(arrayOfCollections, _.bind(function(collection) {
					// add the models from all of the collections together into one array
					models = models.concat(collection.models);
				}, this));

				// allow the models to be parsed if needed
				// (this function has to be on the collection passed in, ComboCollection can't be extended)
				// keep in mind that these are references to the same models in the collections
				// passed into arrayOfCollections, so if changes need to apply to the models in
				// the comboCollection, but not the original collections, the models should be cloned first
				if (typeof this.comboCollectionParseModels === 'function') {
					models = this.comboCollectionParseModels(models);
				}

				this.reset(models);
			}

		}),

		comboCollection = new Collection(null, collectionOptions);

		return comboCollection;
	};

	return ComboCollection;

}));