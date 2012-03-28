/**
 * 异步增强模块，增加jscex语法糖
 */
var mongoose = require('mongoose'),
	Jscex = require('../extends/jscex-start'),
	Model = mongoose.Model;
	
var Async = Jscex.Async;
var Task = Async.Task;
var Jscexify = Async.Jscexify;
		
var addSugarMethods = function(methods , obj){
	for(var i = 0 , len = methods.length; i < len ; i++){
		if(obj[methods[i]]) 
			obj[methods[i] + 'Async'] = Jscexify.fromStandard(obj[methods[i]]);
	}
}

module.exports = {
	init : function(){
		addSugarMethods(['save','remove'],Model.prototype);
	},
	model : function(name ,schema){
		mongoose.model(name, schema);		
		var methods = ['find','remove','findById','findOne','count','distinct','create','update'];
		var model = mongoose.model(name);
		addSugarMethods(methods,model);
		return model;
	}
}
	
