/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var routes = require('./routes');
var config = require('./config');

var app = express.createServer();

//扩展response对象支持json和jsonp
require('./extends/jsonApi');

// configuration in all env
app.configure(function() {
	
	var viewsRoot = path.join(__dirname, 'views');
	
	app.set('view engine', 'html');
	app.set('views', viewsRoot);
	app.register('.html', require('ejs'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: config.session_secret
	}));
	
	// custom middleware
	//app.use(express.csrf());
	
	// plugins
	var plugins = config.plugins || [];
	for (var i = 0, l = plugins.length; i < l; i++) {
		var p = plugins[i];
		app.use(require('./plugins/' + p[0])(p[1]));
	}

	app.use(function(req , res , next){
		var userid = req.cookies['userid'];
		if(userid) {
			res.local('isLogin',true);
		} else {
			res.local('isLogin',false);
		}
		res.local('sort','');
		return next();
	});
	
	// set default layout, usually "layout"
	app.set('view options', {
		layout: 'layouts/default',
			open: '<<',
			close: '>>'
	});
	
	//app.use(app.router);
	
	// routes
	routes(app);	

});

// set static, dynamic helpers
app.helpers({
	site : config.app_locals
});

/*载入应用基本信息 
app.locals({
	site : config.app_locals
});
*/

app.dynamicHelpers({
	csrf: function(req,res) {
		return req.session ? req.session._csrf : '';
	}
});

var static_dir = path.join(__dirname, 'public');

app.configure('development', function(){
	app.use(express.static(static_dir));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	var maxAge = 3600000 * 24 * 30;
	app.use(express.static(static_dir, { maxAge: maxAge }));
	app.use(express.errorHandler()); 
	app.set('view cache', true);
});

// Example 404 page via simple Connect middleware
app.use(function(req, res){
    res.render('404');
});  
  
// Example 500 page
app.error(function(err, req, res){
	res.render('500');
});

app.listen(config.port);

console.log(config.app_locals.name + " listening on port %d in %s mode", config.port, app.settings.env);
