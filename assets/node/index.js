var url = require('url');
var fs = require('fs');
const { http, https } = require('follow-redirects');
const sslPath = '/etc/letsencrypt/live/bytfix.com-0001/'
var currentIP=2727;

var sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTwEiYtuorkNLlZpvkgmCZ4609AHg_HJY3K0CKk6xqhqyVzrdEqsHzlvwCZ1Y2zy7gkjwWx1Sz-mkD/pub?output=csv';
//time between sheet refreshes in minutes        
const refreshTime = 30;


getSheetsCSV();

var iPhoneModelsArr = new Array();
/*
var currentIPfile = './DNSUpdate/currentIP.txt';
getcurrentIP();
function getcurrentIP(){
    fs.readFile(currentIPfile, 'utf8', function (err, data) {
   if (err){
   	console.log(err);
   } else{
   currentIP = 8080;
 currentIP = 'http://www.bytfix.com:8080';
   console.log('Now Using IP: '+currentIP);
}

});
}
*/
async function processCSV(repairInfo) {
    
    var repairCost = 0
    var boolInStock = true;

if(repairInfo == undefined){
    return;
}
repairInfo = repairInfo.split(',');
var model = repairInfo[0];
var color = repairInfo[4];

    for (var i=0, len = iPhoneModelsArr.length; i <= len; i++) {iterate(iPhoneModelsArr[i])};

 function iterate(subArr){
if (subArr == undefined){
    iPhoneModelsArr.splice(i,1);
    return; 
}
if (subArr[0] == model ){
    
    //gets screen stock by color
    if (color == 'b'){
            if (subArr[1]=='0'  && repairInfo[1]=='true'){
                boolInStock = false;
        }
        } else if (subArr[2]=='0'  && repairInfo[1]=='true'){
                boolInStock = false;
        }
    //gets battery stock
    if (subArr[3]=='0' && repairInfo[2]=='true'){
       boolInStock = false; 
    }
    if (subArr[4]=='0' && repairInfo[3]=='true'){
       boolInStock = false; 
    }
    for (var x=1; x<=4; x++){
    if (repairInfo[x]=='true'){
        repairCost += Number(subArr[x+7]);
    }
}   
}


}



    return new Promise((resolve) => {
  setTimeout(() => {
    resolve(getResponse(repairCost,boolInStock));
  }, 0);
});


function getResponse(repairCost,boolInStock){
 var response = [repairCost,boolInStock].toString();

 return response;

}


}

//TODO -- GIVE THE CLIENT SOME USEFUL INFO. GOODNIGHT
function handleRequest(req, res) {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Headers': '*',
    };
    console.log('incoming request!');
    var repairInfo = req.headers['repairinfo'];
    res.writeHead(200, headers);    
    
    processCSV(repairInfo).then((response)=>{
        res.end(response);
    });

}
const options = {
    key: fs.readFileSync(sslPath+'privkey.pem'),
    cert: fs.readFileSync(sslPath+'cert.pem')
  };

var serverCSV = https.createServer(options,handleRequest);
serverCSV.listen(currentIP);
serverCSV.on('error', function(error) {
    console.log("\x1b[31m%s\x1b[0m", 'ERROR: Only one instance allowed');
});

//refresh sheet, time = seconds till refresh.
function refreshCSV(time) {
    if (time == undefined) {
        console.log("refreshing sheet in " + refreshTime + " minutes");
        setTimeout(getSheetsCSV, refreshTime * 60000);
    } else {
        console.log("refreshing sheet in " + time + " seconds");
        setTimeout(getSheetsCSV, time * 1000);

    }


}

function getSheetsCSV() {
    console.log('Getting iPhone Models Sheet...');
    callback = function(response) {
        const writer = fs.createWriteStream("iPhoneModelsRAW.txt");
        response.pipe(writer);
        writer.on('finish', () => writeCSV());

    }

    var request = https.request(sheetURL, callback);
    request.end();
    request.on('error', function(networkErr) {
        console.log("\x1b[31m%s\x1b[0m", "ERROR: Failed to GET sheet");
        refreshCSV(15);
    });
}

function writeCSV() {
    iPhoneModelsArr = CSVToArray(fs.readFileSync("iPhoneModelsRAW.txt", "utf8"), ",");
    console.log('Gotten.');
    refreshCSV();
}

function CSVToArray(e,r){r=r||",";for(var n=new RegExp("(\\"+r+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+r+"\\r\\n]*))","gi"),g=[[]],l=null;l=n.exec(e);){var p,u=l[1];u.length&&u!==r&&g.push([]),p=l[2]?l[2].replace(new RegExp('""',"g"),'"'):l[3],g[g.length-1].push(p)}return g}