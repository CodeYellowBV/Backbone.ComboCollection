Backbone.ComboCollection
========================

Creates an always up to date collection containing the children of 2 or more other collections.

## Usage

	var collection1 = new Backbone.Collection([
		{
			id: 1,
			name: 'some model'
		}
	]);
	
	var collection2 = new Backbone.Collection([
		{
			id: 2,
			name: 'some other model'
		}
	]);
	
	var arrayOfCollections = [collection1, collection2];
	
	var comboCollectionOptions = {
		// what type of collection should our combo collection be?
		// by default, it will be Backbone.Collection
		Collection: Backbone.Collection
	};
	
	// collectionOptions is passed directly into the collection constructor
	// e.g. new Backbone.Collection(models, collectionOptions);
	var collectionOptions = {};
	
	// comboCollection will contain all of the models from collection 1 and collection 2.
	// Any time either collection is updated, comboCollection will update automatically.
	var comboCollection = new Backbone.ComboCollection(arrayOfCollections, comboCollectionOptions, collectionOptions);
