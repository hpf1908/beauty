var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	modelAsync = require('./modelAsync'),
	SchemaTypes = Schema.Types,
	Mixed = SchemaTypes.Mixed,
	ObjectId = Schema.ObjectId;

/**
 * 存取抓取的微博
 */
module.exports = new Schema({
	itemId: { 
		type: String
		//index: true 
	},
	userid: { 
		type: String
	},
	username : {
		type : String
	},
	blogType : {
		type : String
	},
	content: { 
		type: String
	},
	createTime: { 
		type: Date
	},
	createTimeStr :{
		type: String
	},
	thumbnailPic : {
		type: String
	},
	middlePic : {
		type: String
	},
	originPic : {
		type: String
	},
	picUrl : {
		type : String
	},
	likes : {
		type    : Number,
		default : 0
	}
});

