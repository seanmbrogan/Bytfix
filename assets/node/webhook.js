//listens for pushs via GH webhook, pulling on each instance. 
const repo = '/var/www/bytfix'
const secret = require("./.secret.json").secret;
const http = require("http")
const crypto = require("crypto")
const { exec } = require("child_process");
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        con
        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && sudo git pull --autostash');
            console.log("pulling... ");
        }
    });
    res.end()
}).listen(8080)