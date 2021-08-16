
var nodeURL = 'https://bytfix.com:2727' ;

var repairArr = [getModel(),false,false,false,getColor()];


//TODO: create location finde
var STRlocation = " Hidden Valley Lake";

jQuery(document).ready(function() { 
 var contentHeight = jQuery(window).height();
 var footerHeight = jQuery('#footer').height();
 var footerTop = jQuery('#footer').position().top + footerHeight;
 if (footerTop < contentHeight) {
     jQuery('#footer').css('margin-top', 10+ (contentHeight - footerTop) + 'px');

   }
 });
(function($) {
  var $window = $(window);

    $window.on('load', function() {
      
$(".userLocation").text(STRlocation);
$(".userLocation").css("font-weight","bolder");

});
})(jQuery);
function getRepair(){
getCSV(nodeURL);

}
  function saveRepairInfo(response){

    console.log(response);
sessionStorage.setItem("repairInfo", response);
window.location.href = "schedule-repair.html";
}
function getrepairInfo(){
var repairInfo = sessionStorage.getItem("repairInfo").split(',');
var repairCost = '$'+repairInfo[0];
var repairAvailability = repairInfo[1];
var lblrepairavailability = document.getElementById('lblavailability'); 
var lblschedulerepair = document.getElementById('lblschedule'); 
document.getElementById('repair-price').innerHTML=repairCost;
if(repairAvailability=='true'){
  lblrepairavailability.innerHTML = 'We Have Your Parts In Stock';

  lblrepairavailability.style.borderBottom='solid green 1px';

} else { //make stock notifications more user friendly. 
  lblrepairavailability.innerHTML = 'We Do Not Have Your Parts In Stock';

  lblschedulerepair.innerHTML+= '<br/><b> (Allow 5-7 Days for Parts to Arrive After Scheduling)</b>';
  lblrepairavailability.style.borderBottom='solid red 1px';
}





}
function getCSV(nodeURL){   
  var CSVreq = new XMLHttpRequest();
  CSVreq.open("GET", nodeURL, true);
  
  CSVreq.setRequestHeader("RepairInfo", getRepairInfo());
CSVreq.send();
CSVreq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      saveRepairInfo(CSVreq.response);
    }else{
      console.log("Error communicating with Sean's Node Server." + " " + this.readyState + " " + this.status);
    }
  }


}
function getRepairInfo() {
return repairArr;
}
function getModel(){
  //catch no Querystring error.
  return window.location.search.substring(1);
}
function getColor(){
  //pls implement @future me
  return 'b';
}


function toggleSelect(element){


  repairArr.forEach(repairArrToggler)   
  function repairArrToggler(item, index){

if (element.id == index){
  repairArr[index] = !repairArr[index];

}

  }

  if (element.selected){  
  element.selected=false;
  element.style.borderBottom="1px solid black";
  
  } else {
    element.selected=true;
    element.style.borderBottom="1px solid rgb(247, 147, 26)";
    
  }
}