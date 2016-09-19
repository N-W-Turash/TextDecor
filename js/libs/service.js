/***** service.js ******/
/***** started on 09/01/15 *****/
"use strict";
var Service = function () {

    var sProto= Service.prototype,   /*global variable for function prototypes*/
    width= window.innerWidth;

	/*checks the type of a variable*/
	sProto.typeCheck = function(id,type) {
		if(arguments.length!==2){   /*arguments.length returns the arg. len of a fn*/
		    return;                 /*returns undefined*/             
		}
		else{
			var check = (typeof id!==type)?false:true;
		    return check;
	    }
	};

	/*checks the types of array elements*/
	sProto.elementTypeCheck= function(array,type){
		if(arguments.length!==2){
			return;
		}
		else{
			var counter=0,
			len=array.length;
		    for(var i=0;i<len;i++){
		        if(!sProto.typeCheck(array[i],type)){
		        	counter++;
		        }
		    }
		    return counter>0?false:true;
	    }
	};

	/*sorts an array depending on the array element type number or string*/
	sProto.arraySort= function(array,order){
		if(order!=null){
		    var order= order.toString().toLowerCase();
	    }

		if(arguments.length<1||arguments.length>2){
			return;
		}
		else{

            if(order==null||order==="ascending"||order==="descending"){
				function sortNumber(a,b,sortOrder) { /*this fn sorts arr num elmns accor. to order*/
					sortOrder=order;
					if(sortOrder==="descending"){
						return b-a;
					}
					else{
				        return a-b;
				    }
				}
				    
				var checkFlag = sProto.elementTypeCheck(array,'number');
				var checkFlag02 = sProto.elementTypeCheck(array,'string');
				if(checkFlag){
				    return array.sort(sortNumber); /*rtrns srtd ar wth num elemns*/
				}  
				else if(checkFlag02){
					if(order==="descending"){
				        return array.sort().reverse(); /*rtrns srtd arr wth str elemns,dsndng ordr*/
				    }
				    else if(order==null || order==="ascending"){
				    	return array.sort(); /* rtrns srtd arr wth str elemns*/
				    }
				}
				else{
					return;
				}
		    }
		    else{
		    	return;
		    }
	    }
	};

	/*returns the string representation of a number in scientific notaion*/
	sProto.sciNotation= function(number,display){
		if(isNaN(number) ||arguments.length!==2){
			return;
		}	  
	 	else{
	 		var num = Number(number).toExponential().toString(), /*num in exponential format*/
			primary= num.toString().indexOf("e"),                /*finds the index of e*/
			mainNum = num.substring(0,primary),                  /*part of num before e*/
			exponent = num.substring(primary+2,num.length);      /*part of num after e*/

			var container= document.getElementById(display),     /*display area*/
		   	power= document.createElement("sup");                /*container of power part*/
		   	power.setAttribute('id','power');
		   	power.style.marginLeft="2px";
		   	container.innerHTML= mainNum+" &#215 10";
		   	if(Math.abs(Number(num))>0 && Math.abs(Number(num))<1){  
		   	   power.innerHTML= "- "+exponent;      /*for displaying small floating point num*/
		    } 
		    else{
		    	power.innerHTML=exponent;
		    }
		    container.appendChild(power); /*appending result in the container id*/
		}
	};

	/*processing array elements according to sign*/
	sProto.processArray= function(array,sign){

        if(arguments.length!==2 || !sProto.typeCheck(array,'object')||!sProto.elementTypeCheck(
        array,'number')){
			return;
		}
		else{ 	    
    	    var sum=0,product=1,firstElmnt=array[0],length=array.length;
    	    if(sign==="-" ||sign==="/"){
                length=array.length-1;
    	    }
	        for(var i=0;i<length;i++){  
			    if(isNaN(array[i])){
			      	return;
			    }
			    else{
			        switch(sign){
			        	case "+":                     /*add elemns*/
                           sum+=array[i];
                           break;
                        case "*":
                            product*=array[i];        /*subtract elemns*/
                            break;
                        case "-":                                      
                            firstElmnt-=array[i+1];   /*multiplies elemns*/                  
                            break; 
                        case "/":                                      
                            firstElmnt/=array[i+1];    /*divides elemns*/ 
                            break; 
                        default:return;
			        }
			    }
	        }
	        switch(sign){
	        	case "+":
                    return sum;
                    break;
                case "*":
                    return product;
                    break; 
                case "-":
                    return firstElmnt;
                    break;
                case "/":
                    return firstElmnt.toFixed(8);
                    break;
                default:return;     	  	    	    
		    }    
		}	    
	};

	/*returns the average of numbers of an array*/
	sProto.average= function(array){
		if(arguments.length!==1 || !sProto.typeCheck(array,'object')||!sProto.elementTypeCheck(
        array,'number')){
			return;
		}
		else{
            return sProto.processArray(array,"+")/array.length; /*average*/
        }
	};

	/*implementation of binary search algorithm*/
	sProto.binarySearch= function(array,target){

        if(arguments.length!==2){
			return;
		}
		else{
		    if(!sProto.typeCheck(array,'object')){
		        return;
		    }

		    else{        
		        sProto.arraySort(array);
		        var low=1,
		        high=array.length,
		        mid=parseInt((low+high)/2),
		        location;
		        while(low<=high && array[mid]!==target){
			        if(target<array[mid]){
			            high=mid-1;
			        }
			        else{
			            low=mid+1;
			        }

			        mid=parseInt((low+high)/2);
		        }

		        if(array[mid]===target){
		            location=mid;
		            return location; /*location of the elemn*/
		        }
		        else{
		            location=null;
		            return "Element Not Found!";
		        }
		    }
		}
	};

	/*merging and sorting array elements*/
	sProto.mergeSort= function(arr,arr2){
		if(arguments.length!==2){
			return;
		}
		else{
		    var firstArray =sProto.typeCheck(arr,'object'),
		    secondArray =sProto.typeCheck(arr2,'object'),
		    elementType01 = sProto.elementTypeCheck(arr,'number'),
		    elementType02 = sProto.elementTypeCheck(arr2,'number');
		    if(!firstArray || !secondArray || (elementType01!=elementType02)){
		        return;
		    }
		    else{
		        var newArr= arr.concat(arr2);  /*concates arrays*/
		        return sProto.arraySort(newArr);
		    }
		}
	};

	/*Counting a particular element in an array*/
	sProto.elementCount= function(array,element){
        if(arguments.length!==2){
        	return;
        }
        else{
			var count=0;
			var check = sProto.typeCheck(array,'object'),
			len=array.length;
		    if(check){
			    for(var i=0;i<len;i++){
				    if(array[i]===element){
				        count++;  /*increases when the elmn is present in the arr*/
				    }
			    }
		    return count;
		    }
		    else{
		        return;
		    }
	    }     
	};

	/*char count in a string without whitespace*/
	sProto.charCount= function(string){
        if(arguments.length!==1 || !sProto.typeCheck(string,"string")){
        	return;
        }
        else{
			var count=0;
			var stringed = string.toString(),
			strLen= stringed.length;
			for(var i=0;i<strLen;i++){
			    if(string[i]===" "){
			      continue;
			    }
			    count++;  
			}
		    return count; /*str length without whitespaces*/
	    }  
	};

	/*general counter function*/
	sProto.counter = (function () {  /*self invoking function*/
	    var counter = 0;
	    return  function (){
	    	        return counter += 1;
	    	    }
	})();

    /*checks if a dom element with a particular id exists in the dom*/
	sProto.nodeCheck = function(node){
        var check= (document.body.contains(document.getElementById(node)))?true:false;
        return check;
	};

    /*Set equal height for every dom element provided as parameter*/
	sProto.sameHeight= function(){
		var heightArray=[],params,checkFlag,dltdArgs=[],otherArgs=[],
		argLen= arguments.length;
		for(var i=0;i<argLen;i++){
			if(sProto.nodeCheck(arguments[i])){
				checkFlag=true;
				otherArgs.push(arguments[i]);  /*array of existing elmns*/
			}
			else{
				checkFlag=false;
                dltdArgs.push(arguments[i]);   /*array of non existing elmns*/
			}
		}
		
		if(checkFlag){
			for(var i=0; i<argLen; i++) {            
				params = document.getElementById(arguments[i]); 
	            heightArray.push(params.clientHeight); /*height including padding of every elmn*/
	        }
	        
	        var maxHeight= Math.max.apply(null,heightArray); /*finds the largest elmn in arr*/
	        for(var i=0; i<argLen; i++) {
	            params = document.getElementById(arguments[i]); 
	            params.style.height=maxHeight+"px"; /*set the max height as height of each elmn*/
	        }
	        return "Equal height has been set for "+otherArgs;
        }

        else if(!checkFlag){
        	return "Invalid argument "+dltdArgs;
        }
	};

    /*replaces space with another string*/
	sProto.spaceReplace= function(string,replacement,trim){
		if(arguments.length!==3 || !sProto.typeCheck(string,"string")||!sProto.typeCheck(
		replacement,"string")|| !sProto.typeCheck(trim,"boolean")){
			return;
		}
		else{
			if(trim===true){
	            string=string.toString().trim();       /*trimmed string*/
	        }
	        else{
	        	string=string.toString();
	        }
	        string=string.replace(/\s+/g,replacement); /*replaces whitespace with replacement*/
	        return string;
        }
	};

    /*convert stringed numbers to numbers in an array*/ 
	sProto.strToNumArray= function(array){
        if(arguments.length!==1 || !sProto.typeCheck(array,"object")){
			return;
		}
        else{
        	var numStore=[], /*arr for stroing num elmns*/
        	len= array.length;
	        for(var i=0;i<len;i++){
	            var newNum= Number(array[i]); /*converts every elmn to num*/
	            if(isNaN(newNum)){
	            	continue;                 /*skips the non digit terms*/
	            }
	            numStore.push(newNum);       
	        }
	        return numStore;
        }  
	};

    /*process string to extract multiple numbers from a single input*/
	sProto.processNum = function(id){

		if(arguments.length!==1 || !sProto.nodeCheck(id)){
			return;
		}
        else{
	        var initial= document.getElementById(id).value, /*value of the input*/
	        normalized=sProto.spaceReplace(initial," ",true),
	        newForm= normalized.split(" ");
	        return sProto.strToNumArray(newForm);
        }
	};

	/*hide elements according to device size*/
	sProto.hideElement = function(){
		var args= Array.prototype.slice.call(arguments), /*slicing all the arguments*/
        lastArg=args[arguments.length-1].toLowerCase();  /*the last arg providing device category*/
		function hide(node){
            document.getElementById(node).style.display="none";  /*hiding elements*/
		}
		var argLen= arguments.length;
		for(var i=0;i<argLen;i++){
			if(sProto.nodeCheck(args[i])){
				if(lastArg==="mobile"){
		            if(width<=767){                  /*mobile hide*/
		            	hide(args[i]);      	        
		            } 
		        }
		        else if(lastArg==="small"){         /*small hide*/
		            if(width>767 && width<992){
		            	hide(args[i]);      	        
		            } 
		        }
		        else if(lastArg==="medium"){         /*medium hide*/
		            if(width>=992 && width<1200){
		            	hide(args[i]);      	        
		            } 
		        } 
		        else if(lastArg==="large"){          /*large hide*/
		            if(width>=1200){
		            	hide(args[i]);      	        
		            } 
		        }  
		        else{
                    hide(args[i]);                   /*hiding in all sizes*/
		        }
            }
            else{
            	continue;
            }      
		}
	};

    /*checks if a string has crossed the char limit or not*/
	sProto.charLimit= function(str,limit){
		if(arguments.length!==2 || !sProto.typeCheck(str,"string")){
			return;
		}
		else{
	        if(sProto.charCount(str)<=limit) /*without whitespace*/
	        {
	         	return true;
	        }
	        else{
	         	return false;
	        }
        }
	};

    /*swapping two num values*/
	sProto.swapNum= function(min,max){
		if(arguments.length!==2|| isNaN(min)|| isNaN(max)){
			return;
		}
		else{
	        if(min>max){             /*swapping*/
				var temp=min;
				min=max;
				max=temp;
				return {             /*returns an object of max and min number*/
					maximum:max,
					minimum:min
				};
			}
			else{
				return {
					maximum:max,
					minimum:min
				};
			}   
	    }
	};

    /*returns a random integer between a range*/
	sProto.random= function(min,max){
		var temp;
		if(arguments.length!==2|| isNaN(min)|| isNaN(max)){
			return;
		}
		else{
			min=parseInt(min);
			max=parseInt(max);
			var newMin=sProto.swapNum(min,max).minimum, /*min val*/
			newMax=sProto.swapNum(min,max).maximum;     /*max val*/
		    return  Math.floor(Math.random()*(newMax-newMin)+newMin);
		}
	};

	/*selects a random element from an array*/
	sProto.randomElement= function(array){
        if(arguments.length===1 && sProto.typeCheck(array,"object"))
        {
         	return array[sProto.random(0,array.length)];  /*random index generation*/
        }
        else{
         	return;
        }
	};

	/*array modifier according to set min,max values*/
	sProto.numArrayModifier= function(array,min,max){
        if(arguments.length!==3 || isNaN(min) || isNaN(max) || !sProto.elementTypeCheck(array,
        'number')||!sProto.typeCheck(array,'object')){
        	return;
        }
		else{
			var newArr=[],
			len= array.length,
			newMin=sProto.swapNum(min,max).minimum, 
			newMax=sProto.swapNum(min,max).maximum;
			for(var i=0;i<len;i++){
				if(array[i]>=newMin && array[i]<=newMax){
                    newArr.push(array[i]);    /*min < num < max*/
				}
				else{
					continue;
				}
			}
			return newArr;
		}
	};

	/*checks if a number is int or not*/
	sProto.isInt= function(num){ 
		return isNaN(num)?undefined:((num%1===0)?true:false);
	};

	/*checks if an number array contains only int or not*/
	sProto.isIntArray= function(array){
		if(arguments.length!==1 || !sProto.typeCheck(array,'object')||!sProto.elementTypeCheck(
		array,'number')){
            return;
		}
		else{
			var c=0,
			len= array.length;;
			for(var i=0;i<len;i++){
				if(!sProto.isInt(array[i])){
					c++;
				}
			}
			return c>0?false:true;  /*c will remain 0 only if there's no float value*/
		} 
	};

	/*checks if a number is float or not*/
	sProto.isFloat= function(num){
		return isNaN(num)?undefined:((num%1!==0)?true:false);
	};

	/*checks if an number array contains only float or not*/
	sProto.isFloatArray= function(array){
		if(!sProto.elementTypeCheck(array,'number')){
            return;
		}
		else{
			var c=0,
			len= array.length;
			for(var i=0;i<len;i++){
				if(!sProto.isFloat(array[i])){
					c++;
				}
			}
			return c>0?false:true;  /*c will remain 0 only if there's no int value*/
		} 
	};

	/*counts the occurance of a char in a str*/
	sProto.countChar= function(string,ch){
        if(arguments.length!==2 || !sProto.typeCheck(string,"string")||!sProto.typeCheck(ch,
        "string")||ch.length>1){
        	return;
        }
        else{
        	var spliStrArr= string.split(""),  /*splitting the str to an array of chars*/
        	count=0,
        	splitArrLen= spliStrArr.length;
        	for(var i=0;i<splitArrLen;i++){
                if(spliStrArr[i]===ch){
                    count++;
                }
        	}
        	return count;  /*number of occurence*/
        }
	};

    /*sci to normal notation*/
    sProto.sciToNormal= function(number){
        if(arguments.length!==1 || !sProto.typeCheck(number,"number")){
        	return;
        }
        else{
        	var num=Math.abs(number);
        	if(num.toString().indexOf("e")!==-1){     /*it means e is present*/
	        	var parts = num.toString().split("e"),/*splits the str into 2 parts*/
				second=parts[1],
				first= parts[0].replace('.',"");     /*e.g. 1.4144 become 14144*/
				if(second[0]==="+"){			
                    var zeroes = parseInt(parts[1],10)-(first.length-1); /*no of 0's*/
					for(var i = 0;i<zeroes; i++){ 
						first+= "0";         /*e.g. 000000*/
					}
					return first;
			    }
			    else if(second[0]==="-"){ /*it means fractional numbers*/
			    	var exponent= second.substring(1,second.length); /*???*/	    	
			    	exponent= Number(exponent)-1;
			    	var zeroes="";
			    	for(var i=0;i<exponent;i++){
                        zeroes+="0";
			    	}
			    	var processed= "."+zeroes+first; /*e.g. .0000000567*/
			    	return number>0?processed:"-"+processed;  /*- for -ve nums*/
			    }
		    }
		    else{
		    	return num.toString();
		    }
        }
    };

    /*binary to decimal conversion*/
	sProto.binToDec= function(string){
        if(arguments.length!==1 || !sProto.typeCheck(string,"string")){
        	return;
        }
        else{
        	string= sProto.spaceReplace(string,"",true); /*removes spaces*/
        	var dotCount= sProto.countChar(string,".");  /*counts dot*/
        	if(dotCount>1){    /*illegal format!*/
        		return;
        	}
        	else if(dotCount===0){  /*int*/
        		string=string+".00";
        	}
        	var newBin= string.split("."),
        	bin=newBin[0],bin2=newBin[1],  /*bin main num,bin2 floats*/
			binArr=[],binArr2=[],
			binLen= bin.length;
			for(var i=0;i<binLen;i++){
				if(bin[i]==="0"||bin[i]==="1"){
					binArr.push(bin[i]);
				}
				else{
					continue;
				}
			}
			var binArrRvrs= binArr.reverse();  /*e.g. 1011 becomes 1101*/
			binArrRvrs= s.strToNumArray(binArrRvrs); 
			var sum=0,
			rvrsLen= binArrRvrs.length;
			for(var i=0;i<rvrsLen;i++){
				sum+=binArrRvrs[i]*Math.pow(2,i); /*conversion to decimal*/
			}
			if(bin2.indexOf("1")==-1){  /*floating point contains only 0!*/
                return sum;
			}	
			else{
				var bin2Len= bin2.length
				for(var i=0;i<bin2Len;i++){
					if(bin2[i]==="0"||bin2[i]==="1"){
						binArr2.push(bin2[i]);
					}
					else{
						continue;
					}
				}
				binArr2= s.strToNumArray(binArr2); 
				var sum2=0,
				binArrLen= binArr2.length;
				for(var i=0;i<binArrLen;i++){
					sum2+=binArr2[i]*Math.pow(2,-(i+1)); /*decimal conversion for floating point binary values*/
				}
				var total=sum+sum2; /*e.g. 50.678*/
				return total;
			}	
        }
	};

	/*decimal to binary conversion*/
	sProto.decToBin= function(num){
		if(arguments.length!==1 || isNaN(num)){
			return;
		}
		else{
			var n= Math.abs(Math.floor(num)),
			difference=(num-n).toFixed(15),
			resultStore=[];

			if(difference<.00000001){
				difference=0;
			}
			else{
				difference=difference;
			}

			while(n>0){
				var remainder=parseInt(n)%2;
				n=parseInt(n/2);
				resultStore.push(remainder);
			}
			resultStore= resultStore.reverse();
			var result="",
			resultLen= resultStore.length;;
			for(var i=0;i<resultLen;i++){
				result+=resultStore[i].toString();
			} 

			if(difference==0){
			    return num>=0?result+"."+"0":"-"+result+"."+"0";
			}
			else{
				var fractionArr=[],count=0,fracStr="";
				while(1){
					difference= difference*2;
					fractionArr.push(parseInt(difference));
					var fractionLen= fractionArr.length;
				    difference=difference-parseInt(difference);
					count++;
					if((difference===parseInt(difference))||count>10){
					    for(var i=0;i<fractionLen;i++){
					    	fracStr+=fractionArr[i].toString();
					    }
					    if(result==0){
					        return num>=0?"."+fracStr:"-"+"."+fracStr;
					    }
					    else{
					    	return num>0?result+"."+fracStr:"-"+result+"."+fracStr;
					    }
					    break;
					}
				}
			}
		}
	};

	/*checks if an element is present in array*/
	sProto.arrayContains= function(array,element){
		if(arguments.length!==2 || !sProto.typeCheck(array,'object')||
		(sProto.typeCheck(element,'object')||sProto.typeCheck(element,'function'))){
			return;
		}
		else{
			var len= array.length;
			for(var i=0;i<len;i++){
				if(array[i]===element){ /*element is present in the array*/
					return true;
				}
				return false;
			}
		}
	};

	/*return the unique element from an array*/
	sProto.uniqueElements= function(array){
		if(arguments.length!==1 || !sProto.typeCheck(array,'object')){
			return;
		}
		else{
			var newArray=[],
			len= array.length;
			for(var i=0;i<len;i++){
				if(newArray.indexOf(array[i])==-1){ /*unique elements*/
					newArray.push(array[i]);
				}
			}
			return newArray;
		}
	};

	/*returns the unique chars from a string*/
	sProto.strUniqueChar= function(string){
		if(arguments.length!==1 || !sProto.typeCheck(string,'string')){
			return;
		}
		else{
			var array= string.split(""),
			newArr= sProto.uniqueElements(array);
			return newArr;
		}
	};

	/*returns the factorial of a number*/
	sProto.factorial = function(num){
		if(arguments.length!==1 || isNaN(num) || !sProto.isInt(num)){
			return;
		}
		else{
			var number=Math.abs(num);
			if(number==1) {
			    return num>0?number:number*(-1);
			}
			else if(number==0){
				return 1;
			}
			else{
				var fact= number*sProto.factorial(number-1);/*recursion*/
				return num>0?fact:fact*(-1);
			}
		}
	};

	/*permutation operation*/
	sProto.permutation = function(n,r){
		if(arguments.length!==2|| isNaN(n)|| isNaN(r)|| !sProto.isInt(n)
		|| !sProto.isInt(r)|| n<=0|| r<0|| r>n){
			return;
		}
		else{
			return (sProto.factorial(n)/(sProto.factorial(n-r)));/*nPr*/
		}
	};

	/*combination operation*/
	sProto.combination = function(n,r){
		if(arguments.length!==2|| isNaN(n)|| isNaN(r)|| !sProto.isInt(n)
		|| !sProto.isInt(r)|| n<=0|| r<0|| r>n){
			return;
		}
		else{
			var nFact= sProto.factorial(n),
			rFact= sProto.factorial(r),
            nMinusrFact= sProto.factorial(n-r);
			return nFact/(rFact*nMinusrFact); /*nCr*/
		}
	};

	/*copies the elements of one array to another array*/
	sProto.arrayCopy= function(arr,arr2){
		if(arguments.length!==2|| !sProto.typeCheck(arr,'object')||
		!sProto.typeCheck(arr2,'object')){
			return;
		}
		else{
			var len= arr.length;
			for (var i= 0;i<len;i++) {
			    arr2[i] = arr[i];
			}
		}
	}


	/*moves the element in zeroth index of an array to the last index*/
	sProto.zeroToLastIndex= function(arr){
		if(arguments.length!==1|| !sProto.typeCheck(arr,'object')){
			return;
		}
		else{
			var first= arr.shift();
			arr.push(first);
			return arr;  /*[1,2,3] becomes [2,3,1]*/
		}
	}

	/*modifies an array according to the callback function*/
	sProto.modifier= function(array,fn){
		if(arguments.length!==2|| !sProto.typeCheck(array,'object') 
		|| !sProto.typeCheck(fn,'function')){
			return;
		}
		else{
			var newArr=[],
			len=array.length;
			for (var i=0;i<len;i++){
				newArr.push(fn(array[i])); /*runs the callback fn on every element*/
			}
			return newArr;
		}
	}

	/*checks if a string is palindrome or not*/
	sProto.isPalindrome= function(string){
		if(arguments.length!==1|| !sProto.typeCheck(string,'string')){
			return;
		}
		else{
			var arr= string.split(""),
			reversed= arr.reverse(),
			reversedStr= reversed.join("");
			if(string===reversedStr){
				return true;
			}
			return false;
		}
	}

	/*checks if an array is a subarray of another array*/
	sProto.isSubArray= function(array,array2){
		if(arguments.length!==2|| !sProto.typeCheck(array,'object')||
		!sProto.typeCheck(array2,'object')){
			return;
		}
		else{
			var len=array.length,
			len2= array2.length,
			newArr=[],counter=0;
			if(len2>len){
				return;
			}
			for(var i=0;i<len2;i++){
				if(array.indexOf(array2[i])!==-1){
					array.push(array2[i]);
					counter++;
				}
			}
			return (counter===array2.length)?true:false;
		}
	}

	/*dynamic element generator*/
	sProto.elementCreation= function(array,parent,node){
		if(arguments.length!==3 || !sProto.typeCheck(array,'object')|| !sProto.nodeCheck(parent)){
			return;
		}
		else{
			var len= array.length,
			element= document.getElementById(parent);
			for(var i=0;i<len;i++){
				var options = document.createElement(node);
				var val = document.createTextNode(array[i]);
				options.appendChild(val);
				element.appendChild(options);
			}
		}  
	}

	/*creates array element acording to index*/
	sProto.indexPush= function(array,min,max){
		if(arguments.length!==3 || !sProto.typeCheck(array,'object')|| min>=max){
			return;
		}
		else{
			for(var i=min;i<=max;i++){
        		array.push(i);
        	}
        	return array;
		}  
	}

	/*adds a string to each array element*/
	sProto.addString= function(arr,str){
		if(arguments.length!==2 || !sProto.typeCheck(arr,'object')|| !sProto.typeCheck(str,'string')){
			return;
		}
		else{
			var len= arr.length;
			for(var i=0;i<len;i++){
		        arr[i]= arr[i]+str;
			}
			return arr;
		}  
	}
	
/*end point*/
};




