var check = require('validator').check,
	sanitize = require('validator').sanitize;
	
exports.getString = function(req , name ){
	var param = req.param(name) ? sanitize(req.param(name)).trim() : '';
	return sanitize(param).xss();
}