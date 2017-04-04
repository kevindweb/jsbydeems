$(document).ready(function(){
    var $select = $("#hourlyWage");
    for (i=1;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }    // this inputs selects for 1-100$
  var checkedHours;
  document.getElementById('hourlyWage').addEventListener("change",function(){
       if(isNaN(this.value)){
         alert("Please select fan hourly wage");
         return;
       }
      checkedHours = this.value;
     });//this takes the number from the select frame in the title
      // then it attaches it to the global variable checkedHours
   $("#runFunction").click(function runFunction(){
     // in between this comment and the next, time is converted
     function stringToNumber(num){
       return Number(num);
     }

         
      var timeInHour;
      var timeInMinute;
      var timeOutHour;
      var timeOutMinute;
      var timeOut;
      var timeIn;
      var newTime;
     // these above identify the process for military time to 
     // turn the input time into numbers to be processed
     if(document.getElementById('militaryTime').checked){
       for(var n=0;n<$(".dailyHour").length;n++){
         var timeInHour = document.getElementsByClassName("timeInHour");
         timeInHour = stringToNumber(timeInHour[n].value);
         var timeInMinute = document.getElementsByClassName("timeInMinute");
         timeInMinute = stringToNumber(timeInMinute[n].value);
         var timeOutHour = document.getElementsByClassName("timeOutHour");
         timeOutHour = stringToNumber(timeOutHour[n].value);
         var timeOutMinute = document.getElementsByClassName("timeOutMinute");
         timeOutMinute = stringToNumber(timeOutMinute[n].value);
         timeInMinute /= 60;
         timeOutMinute /= 60;
         var timeOut = timeOutHour-timeOutMinute;
         var timeIn = timeInHour-timeInMinute;
         var newTime = timeOut-timeIn;
         var x = document.getElementsByClassName("dailyHour");
         x[n].value = newTime;
       } // end of for loop
     } else if(document.getElementById('civilianTime').checked){
        for(var n=0;n<$(".dailyHour").length;n++){
         var timeInHour = document.getElementsByClassName("timeInHour");
         timeInHour = stringToNumber(timeInHour[n].value);
          if(timeInHour>12){
            timeInHour+=12;
          }
         var timeInMinute = document.getElementsByClassName("timeInMinute");
         timeInMinute = stringToNumber(timeInMinute[n].value);
         var timeOutHour = document.getElementsByClassName("timeOutHour");
         timeOutHour = stringToNumber(timeOutHour[n].value);
          if(timeOutHour!==0){
         timeOutHour+=12;}
         var timeOutMinute = document.getElementsByClassName("timeOutMinute");
         timeOutMinute = stringToNumber(timeOutMinute[n].value);
         timeInMinute /= 60;
         timeOutMinute /= 60;
         var timeOut = timeOutHour-timeOutMinute;
         var timeIn = timeInHour-timeInMinute;
         var newTime = timeOut-timeIn;
         var x = document.getElementsByClassName("dailyHour");
         x[n].value = newTime;
       } // end of for loop
     }
     
     // the time will be turned into a decimal
     $("#nameHere").html($("#firstAndLast").val());
     var inputs = document.getElementsByClassName( 'dailyHour' ),
    names  = [].map.call(inputs, function( input ) {
        return input.value;
    }); // this takes the value of the total daily hours 
     // and shoves them into an array
     
    for(var i=0;i<names.length;i++){
      if(names[i]===undefined){
        names[i]=0;
      }
      names[i] = Number(names[i]);
    }
     // this turns the number strings to numbers

   function add(a,b){
      return a+b;
    }
    names = names.reduce(add,0);
     
     if(document.getElementById('nearestHour').checked){
      names = names.toFixed();
    } else if(document.getElementById('nearest.1').checked){
      names = names.toFixed(1);
    }
     
     names = Number(names);
     names *= checkedHours; //multiply hours by wage
     $("#finalPay").html(names);
   }); // end of click Run Program function           
                  
                                   
                  
  }); // end of ready function
