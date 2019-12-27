var http = require('http');
var dt = require('./yalimodule1');
var url = require('url');
var fs = require('fs');

var formidable = require('formidable');
http.createServer(function (req, res) {
  console.log("debug 1:" + req.url)
  if (req.url == '/fileupload') {
    var q = url.parse(req.url, true).query;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //var imgname = unescape(fields.imagename);
      var imgname = fields.imagename;
      var oldpath = files.filetoupload.path;
      var newpath = '/Users/yali/homestuff/images/' + imgname;
      console.log("debug 4: "+imgname);
      //console.log(oldpath);
      //console.log(newpath);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
      fs.readFile('demofile1.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    });
  }else{
    console.log("debug 3")
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write("The date and time are currently: " + dt.myDateTime());
    res.write("<br>req.url<br>");
    res.write(req.url);
 
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write(txt);


    fs.readFile('demofile1.html', function(err, data) {
     res.write(data);
     res.end();
    });
  }
}).listen(8080);
