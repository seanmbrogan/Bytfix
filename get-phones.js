const request = require('request');
const { parse } = require('json2csv');
const fs =require('fs')
const { resourceLimits } = require('worker_threads');
var options = {
  'method': 'POST',
  'url': 'https://clientapiv2.phonecheck.com/cloud/cloudDB/GetAllDevices/',
  'headers': {
    'Cookie': 'ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2232cc7612e69ef9a9aaf54b285586c171%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A12%3A%22172.31.8.101%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.4%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1632166568%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7Da12c6d9dd6402ebb76e141f420dfbaa1c4c17bef'
  },
  formData: {
    'apiKey': '9edd8b60-cb19-492c-8436-fbae64d2b318',
    'user_name': 'eze7'
  }
};
request(options, function (erro r, response) {
var phones = JSON.parse(response.body);
var newPhones = [];
for (var i in phones){
newPhones[i] = {}
newPhones[i].IMEI = phones[i].IMEI;
newPhones[i].Serial = phones[i].Serial
newPhones[i].StationID = phones[i].StationID
newPhones[i].Model = phones[i].Model
newPhones[i].ModelNum = phones[i].Custom1;
newPhones[i].Grade = phones[i].Grade;
newPhones[i].Failed = phones[i].Failed
newPhones[i].Color = phones[i].Color;
newPhones[i].Memory = phones[i].Memory;
newPhones[i].Parts = phones[i].Parts
newPhones[i].BatteryHealthPercentage = phones[i].BatteryHealthPercentage
newPhones[i].UnlockStatus=phones[i].UnlockStatus
newPhones[i].DeviceLock = phones[i].DeviceLock
newPhones[i].Carrier = phones[i].Carrier
newPhones[i].MDM = phones[i].MDM
newPhones[i].SimLock = phones[i].SimLock
newPhones[i].TimeTaken = phones[i].deviceDisconnect-phones[i].CreatedTimeStamp
newPhones[i].CreatedTimeStamp = phones[i].CreatedTimeStamp
newPhones[i].deviceDisconnect = phones[i].deviceDisconnect
}

auditPO(newPhones);
fs.writeFile('phones.csv', parse(newPhones), 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
if (error) throw new Error(error);

});


function auditPO(newPhones){
 
const csv=require("csvtojson")
var unreceivedPhones = [];

csv(newPhones)
.fromFile('./purchase-order.csv')
.then((purchaseOrder)=>{
  
  var purchasedPhones = [];
  for (var i in purchaseOrder){
    if(newPhones[i] == undefined) break;

for(var y in newPhones){
  if (purchaseOrder[i].serialnumber == newPhones[y].IMEI){
  purchaseOrder[i].received = true; 
  break;
}
}
  if( purchaseOrder[i].received !== true)
  unreceivedPhones.push(purchaseOrder[i]);
}
convertToPO(purchaseOrder,)
fs.writeFile('unreceivedPhones.csv', parse(unreceivedPhones), 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
});

}

function convertToPO(fileName,path){
  csv(fileName)
.fromFile(path)
.then((oldPO)=>{
  
  var purchaseOrder = [];
  for (var i in oldPO){
    purchaseOrder[i] = {}
  purchaseOrder[i].Serial = oldPO[i].serialnumber;
console.log(purchaseOrder[i].Serial)
}

});
fs.writeFile('newPO.csv', parse(purchaseOrder), 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});


}