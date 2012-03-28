var mongoose = require('mongoose'),
	config= require('../config'),
	modelAsync = require('./modelAsync');
	
//初始化jscex类异步调用
modelAsync.init();
	
mongoose.connect(config.db, function(err){
	if(err){
		console.log('connect to db error: ' + err.message);
		process.exit(1);
	}
});


var loadModels = function(exports , modelArr){
	for(var i = 0 , len = modelArr.length; i<len; i++) {
		var config = modelArr[i],
			name = config.name;
			schema = require(config.file);
		exports[name] = modelAsync.model(name, schema);
	}
}


loadModels(exports , [{
	file : './item',
	name : 'Item'
},{
	file : './user_item',
	name : 'Useritem'
}]);

