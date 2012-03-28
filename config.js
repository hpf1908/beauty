/**
 * config
 */
var debug = false;
if(debug){
    var db = 'test:123456@127.0.0.1:27017/db_beauty';
	var host = 'http://127.0.0.1';
	var port = 8024;
    var domain = 'http://127.0.0.1:8024';
} else {
	var db = 'mongodb://xxxxxxxxx';
	var host = 'beauty.cnodejs.net';
	var port = 80;
    var domain = 'beauty.cnodejs.net';
}
module.exports = {
	host: host, // host 结尾不要添加'/'
	db: db,
	port: port,
	plugins: [],
	basePath : __dirname + '/',
	session_secret : 'xxx',
	app_locals : {
		name       : 'node-pintrest',
		description: '一个基于node的采集器',
		version    : '0.1.0',
		word       : '美女',                                         //站点显示的关键字
		apikey     : 'xxxxxxx',
		domain     : domain,
		fetchwords : ['xx','xx'],        //抓取的关键字
		blogType   :'tsina'
	},
	fetch_interval : 60 * 1000                                     //抓取新浪微博的时间间隔
};
var host = module.exports.host;
if (host[host.length - 1] === '/') {
	exports.host = host.substring(0, host.length - 1);
}