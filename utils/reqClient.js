//模拟请求测试controller

// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var Jscex = require('../extends/jscex-start'),
    Async = Jscex.Async,
    Task = Async.Task,
    Jscexify = Async.Jscexify;

function reqData(method , host , port , path , data , cb) {
	
  // Build the post string from an object
  	var post_data = querystring.stringify(data),
		params = []
  
  	if(method == 'get') {
      path += '?';
  	
  		for(var key in data) {
  			params.push(key+'='+data[key]);
  		}
  		path = path + params.join('&');
  	}
  
  	// An object of options to indicate where to post to
  	var post_options = {
      	host: host,
      	port: port,
      	path: path,
      	method: method,
      	headers: {
          	'Content-Type': 'application/x-www-form-urlencoded',
          	'Content-Length': post_data.length
      	}
  	};

  	/**
     * @todo : 处理timeout 和 error
     */
  	var post_req = http.request(post_options, function(res) {
  	  	var result ='';
      	res.setEncoding('utf8');
      	res.on('data', function (chunk) {
          	result+=chunk;
      	});
      	res.on('end',function(chunk){
      	  	cb && cb(null , result);
      	});
  	});

  	// post the data
  	post_req.write(post_data);
  	post_req.end();
}

exports.reqData = reqData;

exports.reqDataAsync = Jscexify.fromStandard(reqData);


