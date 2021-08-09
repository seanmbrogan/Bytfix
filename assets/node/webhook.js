    const path = '/var/www/'
    const secret = require("./.secret.json").secret;
    const http = require("http")
    const crypto = require("crypto")
    const { exec } = require("child_process");
    http.createServer(function (req, res) {
        req.on('data', function(chunk) {
            let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
            let repo = chunk.repository.name;
            if (req.headers['x-hub-signature'] == sig) {
                exec('cd ' + path + repo + ' && sudo git pull --autostash');
                console.log("pulling... ");
            }
        })
        res.end()
    }).listen(8080);