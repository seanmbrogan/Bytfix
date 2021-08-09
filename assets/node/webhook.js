<<<<<<< HEAD
//listens for pushs via GH webhook, pulling on each instance. 
=======
>>>>>>> bd99e795e8988d4db87698b33b39d29aa49fbfc2
const repo = '/var/www/bytfix'
const secret = require("./.secret.json").secret;
const http = require("http")
const crypto = require("crypto")
const { exec } = require("child_process");
http.createServer(function (req, res) {
    req.on('data', function(chunk) {
<<<<<<< HEAD
        
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
        con
=======
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

>>>>>>> bd99e795e8988d4db87698b33b39d29aa49fbfc2
        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && sudo git pull --autostash');
            console.log("pulling... ");
        }
    });
    res.end();
<<<<<<< HEAD
}).listen(8080)
=======
}).listen(8080);
>>>>>>> bd99e795e8988d4db87698b33b39d29aa49fbfc2
