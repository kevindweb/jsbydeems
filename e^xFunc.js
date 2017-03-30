console.log('e^xFunc Start');
//aside from the degrees/radians
//e^x has a very similar series 
function eFunc(input){
	//input should already be in radians
	//so we assume that it is
	var e;
	var seriesArray = [ ];
	/* we are going to put each iteration
	in an array so we can put a - sign 
	in front of every other one
	and a + in between rest */
	for(var n=2;(input**n)/f(n)>.001;n++){
		var thisSeries; 
		var operatorPlus = '+';
		var count = seriesArray.length;
		//the series is this the value of the next line
		//input^number / number!
		thisSeries = (input**n)/f(n);
		if(count!=0&&count==1){
			//first position needs to be -
			seriesArray.unshift(operatorPlus);
			seriesArray.push(operatorPlus);
		} else if(count!=0&&count!=1){
			seriesArray.push(operatorPlus);
		}
		seriesArray.push(thisSeries);
	}
	console.log(seriesArray);
	e = 1 + input + eval(seriesArray.join(''));
	return e.toFixed(4);
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