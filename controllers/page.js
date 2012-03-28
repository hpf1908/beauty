/**
 * 首页
 */
var models = require('../models'),
	Item = models.Item,
	Useritem = models.Useritem,
	config = require('../config'),
	params = require('../utils/params'),
	Jscex = require('../extends/jscex-start'),
	Async = Jscex.Async,
	Task = Async.Task,
	Jscexify = Async.Jscexify,
	Unjscexify = Jscex.Unjscexify;

/**
 * 首页
 */
 var index = exports.index = eval(Jscex.compile("async", function (req, res) {

	var page = req.param('page') ? req.param('page') : 1,
		size = req.param('size') ? req.param('size') : 30;

	page = isNaN(page) ? 1 : Math.floor(page);
	size = isNaN(size) ? 30 : Math.floor(size);


	var opt = {skip:(page-1)*size,limit:size,sort:[['likes',-1]]};
	var items = $await(Item.findAsync({},null,opt));

	res.local('sort','like');
	res.render('home/page',{
		items : items
	});
}));


 exports.index = Unjscexify.toRequestApiHandler(index);

 /**
 * 首页
 */
 var getNew = exports.getNew = eval(Jscex.compile("async", function (req, res) {

	var page = req.param('page') ? req.param('page') : 1,
		size = req.param('size') ? req.param('size') : 30;

	page = isNaN(page) ? 1 : Math.floor(page);
	size = isNaN(size) ? 30 : Math.floor(size);


	var opt = {skip:(page-1)*size,limit:size,sort:[['createTime',-1]]};
	var items = $await(Item.findAsync({},null,opt));
	
	res.local('sort','new');
	res.render('home/page',{
		items : items
	});
}));


 exports.getNew = Unjscexify.toRequestApiHandler(getNew);
	
/*
 * 详情页
 */
  var show = exports.show = eval(Jscex.compile("async", function (req, res) {

  	var itemid = req.param('id');

	var page = req.param('page') ? req.param('page') : 1,
		size = req.param('size') ? req.param('size') : 30;

	page = isNaN(page) ? 1 : Math.floor(page);
	size = isNaN(size) ? 30 : Math.floor(size);


	var opt = {skip:(page-1)*size,limit:size,sort:[['createTime',-1]]};
	var items = $await(Item.findAsync({},null,opt));

	var curitem = $await(Item.findOneAsync({'itemId':itemid}));

	res.local('sort','');
	
	res.render('show/page',{
		items    : items,
		curitem  : curitem
	});
}));


exports.show = Unjscexify.toRequestApiHandler(show);

/*
 * 我最喜欢的
 */
 var mylike = exports.mylike = eval(Jscex.compile("async", function (req, res) {

	var page = req.param('page') ? req.param('page') : 1,
		size = req.param('size') ? req.param('size') : 30;

	var userid = req.cookies['userid'];

	page = isNaN(page) ? 1 : Math.floor(page);
	size = isNaN(size) ? 30 : Math.floor(size);

	var opt = {skip:(page-1)*size,limit:size,sort:[['createTime',-1]]};

	var useritems = $await(Useritem.findAsync({'userId':userid},null,opt));
	var ids = [];

	for(var i = 0 , len = useritems.length ; i < len ; i++) {
		ids.push(useritems[i].itemId);
	}

	var items = $await(Item.findAsync({'itemId' : {'$in' : ids }}));

	res.local('sort','mylike');
	res.render('home/page',{
		items : items
	});
}));

exports.mylike = Unjscexify.toRequestApiHandler(mylike);

