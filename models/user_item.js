var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	modelAsync = require('./modelAsync'),
	SchemaTypes = Schema.Types,
	Mixed = SchemaTypes.Mixed,
	ObjectId = Schema.ObjectId;

/**
 * 存储用户喜欢的
 */
module.exports = new Schema({
	itemId: { 
		type: String
		//index: true 
	},
	userId : {
		type    : String
	}
});

