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
	Unjscexify = Jscex.Unjscexify,
	reqClient = require('../utils/reqClient'),
	config = require('../config'),
	dateFormat = require('../utils/dateFormat');

/**
 * 过滤数据
 */
var filterItem = function(item){
	//过滤掉
	if(item.content.indexOf('http://t.cn/') != -1) {
		return true;
	}
	return item.thumbnailPic ? false : true;
}

/*
 * 喜欢的
 */
var like = exports.like = eval(Jscex.compile("async", function (req, res) {

	var userid = req.cookies['userid'],
		itemid = req.param('itemid');

	console.log('ddd');

	if(!itemid) {
		return res.sendApi(req , -1 , 'param itemid missing');
	}

	var item = $await(Item.findOneAsync({'itemId':itemid}));

	if(!item) {
		return res.sendApi(req , -2 , 'param itemid not valid');
	}

	item.likes++;

	$await(item.saveAsync());

	if(item && userid) {
		var useritem = new Useritem();
		useritem.itemId = itemid;
		useritem.userId = userid;

		$await(useritem.saveAsync());
	}

	res.sendApi(req , 0 , 'ok');
}));

exports.like = Unjscexify.toRequestApiHandler(like);

/**
 * batch add items
 */
var _fetchItems  = eval(Jscex.compile("async", function (words) {

	for(var j = 0 , jlen = words.length ; j < jlen ; j++) {

		var results = $await(reqClient.reqDataAsync('get','api.t.sina.com.cn' , 80 ,'/trends/statuses.json',{
			source 		:config.app_locals.apikey,
			trend_name 	:words[j]
		}));

		results = JSON.parse(results);

		for (var i = 0 , len = results.length; i < len; i++) {
			var item = new Item(),
				tmp_item = results[i];

			item.itemId = tmp_item.id;
			item.userid = tmp_item.user.id;
			item.username = tmp_item.user.name;
			item.blogType = config.app_locals.blogType;
			item.content = tmp_item.text;

			var dateTime = new Date(tmp_item.created_at);
			item.createTime = dateFormat.getFormatDate(dateTime,'yyyy-MM-dd hh:mm:ss');
			item.createTimeStr = dateFormat.getFormatDate(dateTime,'yyyy-MM-dd hh:mm:ss');

			item.thumbnailPic = tmp_item.thumbnail_pic;
			item.middlePic = tmp_item.bmiddle_pic;
			item.originPic = tmp_item.original_pic; 
			item.likes = 0;

			if(!filterItem(item)) {
				var isExist = $await(Item.findOneAsync({itemId:item.itemId}));
				if(!isExist) {
					item.picUrl = item.thumbnailPic.replace('/thumbnail/','/mw205/');
					$await(item.saveAsync());
				}
			}

		}
	}
}));

var timerFectch = setInterval(function(){
	_fetchItems(config.app_locals.fetchwords).addEventListener("failure", function () {
	    console.log(this.error);
	}).start();
},config.fetch_interval);

/**
 * fetch items
 */
var fetchItems = exports.fetchItems = eval(Jscex.compile("async", function (req, res ) {
	var word = req.param('word');

	if(!word) {
		return res.sendApi(req , -1 , 'missing param word ');	
	}

	_fetchItems([word]).addEventListener("failure", function () {
	    res.sendApi(req , -2 , 'fetch error');	
	}).addEventListener("success", function () {
	    res.sendApi(req , 0 , 'fetch ok');	
	}).start();
}));

exports.fetchItems = Unjscexify.toRequestApiHandler(fetchItems);

