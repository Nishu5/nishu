var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req,res){
    var q = url.parse(req.url, true);
    var fileName = "." + q.pathname;
    console.time("Getting data");
    fs.readFile(fileName, function(error, data){
        console.timeEnd('Getting data');
        if(error){
            res.writeHead(404,{'Content-Type': 'text/html'});
            res.end('404 File Not Found: '+ fileName);
        }else{
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
            switch(extension){
                case ".jpg":
                    res.writeHead(200, {'Content-Type': "image/jpg"});
                    break;
                case ".css":
                    res.writeHead(200, {'Content-Type': "text/css"});
                    break;
                case ".mp4":
                    res.writeHead(200, {'Content-Type': "video/mp4"});
                    break;
                default:
                    res.writeHead(200, {'Content-Type': "text/html"});
                    break;
            }
            res.write(data);
            res.end();
        }
    });
}).listen(3000);