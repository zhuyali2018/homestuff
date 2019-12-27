var http = require('http');
var dt = require('./yalimodule1');
var url = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write("The date and time are currently: " + dt.myDateTime());
  res.write("<br>req.url<br>");
  res.write(req.url);
 
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.write(txt);

  res.end();
}).listen(8080);
