console.log('SineFunc Start');
var pi = Math.PI;
	//in the future we can get json data from a website
	//to get a more accurate pi, but it is 15 digits
function moreDigitPI(){
	pi = Math.PI.toFixed(20);
	//if you need 5 more digits
	//20 is the max in javascript
	//less accurate - more digits
};
function degreeToRadian(input){
	//input should be in degrees to use
	//if unit is radians, skip function
	input*=pi;
	input/=180;
	return input;
};
function sineFunc(input){
	//input should already be in radians
	//so we assume that it is
	var sine;
	var seriesArray = [ ];
	/* we are going to put each iteration
	in an array so we can put a - sign 
	in front of every other one
	and a + in between rest */
	for(var n=3;(input**n)/f(n)>.001;n+=2){
		var thisSeries; 
		var operatorPlus = '+';
		var operatorMinus = '-';
		var count = seriesArray.length;
		//the series is this the value of the next line
		//input^number / number!
		thisSeries = (input**n)/f(n);
		if(count!=0&&count==1){
			//first position needs to be -
			seriesArray.unshift('-');
			seriesArray.push(operatorPlus);
		} else if(count!=0&&count!=1){
			if(seriesArray[seriesArray.length-2]==operatorPlus){
				seriesArray.push(operatorMinus);
			} else if(seriesArray[seriesArray.length-2]==operatorMinus){
				seriesArray.push(operatorPlus);
			}
		}
		seriesArray.push(thisSeries);
	}
	console.log(seriesArray);
	sine = input + eval(seriesArray.join(''));
	return sine.toFixed(4);
};
//we will call factorial function f()
//this way it will be shorter in the code
function f(num){
	if(num===0||num===1){
		return 1;
		//initial case; 0! or 1!*0!, both are 1
	} else{
		for(var i=num-1;i>1;i--){
			num*=i;			
		}
		return num;
	}
};
