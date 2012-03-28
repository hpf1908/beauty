/**
 * config
 */
var debug = false;
if(debug){
    var db = 'test:123456@127.0.0.1:27017/db_pintrest';
	var host = 'http://127.0.0.1';
	var port = 8024;
    var domain = 'http://127.0.0.1:8024';
} else {
	var db = 'mongodb://j0jvmo04y08mk:gmsvriina9k@127.0.0.1:20088/q8Z4mTQXl89U';
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
		word       : '美女',
		apikey     : '1306060637',
		domain     : domain,
		fetchwords : ['美女','大腿','美臀','苍井空','女优'],
		blogType   :'tsina'
	},
	fetch_interval : 60 * 1000       //60秒 
};
var host = module.exports.host;
if (host[host.length - 1] === '/') {
	exports.host = host.substring(0, host.length - 1);
}