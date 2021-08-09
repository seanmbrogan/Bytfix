const repo = '/var/www/bytfix'
const secret = require("./.secret.json")
const http = require("http")
const crypto = require("crypto")
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        con
        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
            console.log("pulling... ");
        }
    });
    res.end()
}).listen(8080);