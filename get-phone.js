var http = require('follow-redirects').http;
var fs = require('fs');
var apiKey = "9edd8b60-cb19-492c-8436-fbae64d2b318"
var imei = "359405081061911"
var userName = "eze7"
var options = {
  'method': 'POST',
  'hostname': 'clientapiv2.phonecheck.com',
  'path': '/cloud/cloudDB/getDeviceInfo/',
  'headers': {
    'Cookie': 'ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%228c7a7abf6863b904f138649ed5054c8e%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%22172.31.8.101%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.4%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1631742859%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7D7a51e3330b6502f3bf1ff646edae837a031f201e'
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"apiKey\"\r\n\r\n"+apiKey+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"imei\"\r\n\r\n"+imei+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"user_name\"\r\n\r\n"+userName+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

req.write(postData);

req.end();  