
var reqClient = require('../utils/reqClient'),
	config = require('../config'),
	dateFormat = require('../utils/dateFormat');

module.exports = {

	'test get status by trends' : function(){
		//url = 'http://api.t.sina.com.cn/trends/statuses.json?source=%s&trend_name=%s' % (appkey, config.fetch_keyword)

		reqClient.reqData('get','api.t.sina.com.cn' , 80 ,'/trends/statuses.json',{
			source 		:config.app_locals.apikey,
			trend_name 	:config.app_locals.word
		} , function(err , result){
			result = JSON.parse(result);

			var item = result[0];

			var d = new Date(item.created_at);

			console.log(dateFormat.getFormatDate(d,'yyyy-MM-dd hh:mm:ss'));

			console.log(item);
		});

	},
	'test get status by trends async' : function(){ 

		
	}
	
}

module.exports['test get status by trends']();
