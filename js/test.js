/*function codeGenerator(element,property,value,id){
	if(text.length>0){
        var cssCodeContainer = document.createElement(element),
        cssCode= property+":"+" "+value+";"+"\n";
        cssCodeContainer.innerHTML= cssCode,
        flag=0;
        var codeSection= document.getElementById(id);
        codeSection.appendChild(cssCodeContainer);
    }

    else{
    	return "Write Something!";
    }
}*/

/*function isArrayContainer(array){
	if(typeof array==="object"){
		var len= array.length;
		for(var i=0;i<len;i++){
			if(typeof array[i]=== 'object'){
                  return true;  
			}
		}
		return false;
	}
}

function styleAssignment(arr,arr2){
    if(typeof arr==='object' && typeof arr2==='object'){
    	var arrLen= arr.length,
    	arr2Len= arr2.length;
    	for(var i=0;i<arrLen;i++){
    		for(var j=0;j<arr2Len;j++){
                if(isArrayContainer(arr2)){
                    $(arr[i]).html(arr2[j]+";");
                    console.log(arr[i]+" "+arr2[j]);
    		    }
    		}	
    	}
    }
    else{
    	return;
    	console.log('y');
    } 
}*/

/*function numPushing(arr,min,max){
    if(typeof arr==='object' && min<max){
        for(var i=min;i<=max;i++){
            arr.push(i);
        }
        return arr;
    }
    else{
        return;
    }
}*/

/*function addUnit(arr,unit){
    if(typeof arr==="object"){
        var len= arr.length;
        for(var i=0;i<len;i++){
            arr[i]= arr[i]+unit;
        }
    }
    else{
        return;
    }
}*/

/*var font= "'PT Sans Narrow', sans-serif";
var fontNameArr= font.split(",");
//console.log(fontNameArr);
var fontName= fontNameArr[0];
fontName= fontName.trim().replace(/'+/g,"");
//console.log(fontName);

var url= document.getElementById("link");
var googleFont= "https://www.google.com/fonts/specimen/";
if(fontName.indexOf(" ")==-1){
    var link= googleFont+fontName;
    var att = document.createAttribute("href");       
    att.value = link;                           
    url.setAttributeNode(att);
}
else{
    var words= fontName.split(" ");
    var linkWords= words.join("+");
    var link= googleFont+linkWords;
    var att = document.createAttribute("href");       
    att.value = link;                           
    url.setAttributeNode(att);
}*/

/*$('#color').focus(function() {
        var color= $(this).val();
        output.css('color',color);
        $('#font-famil-code').html(color);
        $('#color-code').html(color+";");
});*/

/*$('#color').colorpicker().on('changeColor.colorpicker', function(event){
    
    var red= event.color.toRGB().r,
    green= event.color.toRGB().g,
    blue= event.color.toRGB().b,
    alpha= event.color.toRGB().a,
    color= "rgba("+red+","+green+","+blue+","+alpha+")";
    output.css('color',color);
    //$('#font-famil-code').html(color);
    $('#color-code').html(color+";");
    $('span.input-group-addon-color').find('span').show('700');
    $('span.input-group-addon-color').find('span').css({
        'background-color': color,
        'color':color
    });
});*/

/*$('#background').colorpicker().on('changeColor.colorpicker', function(event){
    
    var red= event.color.toRGB().r,
    green= event.color.toRGB().g,
    blue= event.color.toRGB().b,
    alpha= event.color.toRGB().a,
    color= "rgba("+red+","+green+","+blue+","+alpha+")";
    output.css('background',color);
    //$('#font-famil-code').html(color);
    $('#background-code').html(color+";");
    $('span.input-group-addon-background').find('span').show('700');
    $('span.input-group-addon-background').find('span').css({
        'background-color': color,
        'color':color
    });
});*/

/* s.elementCreation(styleArr,'style','option'); 
$('#style').change(function() {
    var style= $(this).val();
    output.css('font-style',style);
    $('#font-style-code').html(style+";");
});

s.elementCreation(weightArr,'weight','option');
$('#weight').change(function() {
    var weight= $(this).val().toLowerCase();
    output.css('font-weight',weight);
    $('#font-weight-code').html(weight+";");
});

s.elementCreation(vrntArr,'variant','option');
$('#variant').change(function() {
    var vrnt= $(this).val().toLowerCase();
    output.css('font-variant',vrnt);
    $('#font-variant-code').html(vrnt+";");
});

colorSetter('#color','color','#color-code','span.input-group-addon-color');
colorSetter('#background','background','#background-code','span.input-group-addon-background');

s.elementCreation(spaceArr,'spacing','option');
$('#spacing').change(function() {
    var space= $(this).val();
    output.css('letter-spacing',space);
    $('#letter-spacing-code').html(space+";");
});

s.elementCreation(spaceArr,'word-spacing','option');
$('#word-spacing').change(function() {
    var wordSpace= $(this).val();
    output.css('word-spacing',wordSpace);
    $('#word-spacing-code').html(wordSpace+";");
});

s.elementCreation(transFormArr,'transform','option');
$('#transform').change(function() {
    var transformed= $(this).val();
    output.css('text-transform',transformed);
    $('#text-transform-code').html(transformed+";");
});

s.elementCreation(decorArr,'decoration','option');
$('#decoration').change(function() {
    var decor= $(this).val();
    output.css('text-decoration',decor);
    $('#text-decoration-code').html(decor+";");
});

s.elementCreation(alignArr,'align','option');
$('#align').change(function() {
    var align= $(this).val();
    output.css('text-align',align);
    $('#text-align-code').html(align+";");
});*/

/*function randomStyleGen(randomVal,valIndex,array,randomSelect){   
    randomVal= s.randomElement(array);
    valIndex= array.indexOf(randomVal);
    randomSelect.find('option').eq(valIndex).attr('selected','selected');
    console.log('x');
}

function noRandomStyle(randomVal,valIndex){
    randomVal= randomVal;
    valIndex= valIndex;
}*/

/*if($('#font-check').prop("checked") == true){
    randomFont= s.randomElement(fontArr);
    fontIndex= fontArr.indexOf(randomFont);
    font.find('option').eq(fontIndex).attr('selected','selected');
    console.log( font.find('option').eq(fontIndex).val());
    console.log(randomFont+" "+fontIndex+"  x"); 
}
else if($('#font-check').prop("checked") == false){
    randomFont= randomFont;
    fontIndex= fontIndex;
    console.log(randomFont+" "+fontIndex+"  y"); 
}*/

 /*if($('#color-check').prop("checked") == true){
    var colorVal="";

    for(var i=0;i<6;i++){
        var randHex= s.randomElement(hexArr);
        colorVal+= randHex;
    }

    randColor= "#"+colorVal;
    color.val(randColor);
    color.colorpicker('setValue',randColor);
    //console.log(randColor);
}
else if($('#color-check').prop("checked") == false){
    randColor= color.val();
}*/

/*console.log(savedStyleArr);
for(var i=0;i<savedStyleArr.length-1;i++){
    var stylePara= document.createElement('p'),
    styleClass = document.createAttribute("class");       
    styleClass.value = 'style-para';                           
    stylePara.setAttributeNode(styleClass);
    var styleNode= document.createTextNode(savedStyleArr[i]+";");
    stylePara.appendChild(styleNode);
    savedStyle.append(stylePara);
}*/

/*$('#changer').on('click', function() {
    $('#select').find('option').html('em');
    console.log('x');
});*/

/**********px to em coversion*****/
   /*function pxToem(){
        for(var i=0;i<arguments.length;i++){
            var pixelArr=[],
            mainPixel= $(arguments[i]).text(),
            pixelVal= parseInt(mainPixel);
            if(mainPixel.indexOf('em')==-1){
                $(arguments[i]).html(pixelVal*.0625+"em;");
            }
        }   
    }

    $('#px-to-em').on('click', function() {
        pxToem('#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
    }
    var  randomSize= $('#font-size-code').text().replace(";",''),
        sizeIndex= sizeArr.indexOf(randomSize),
    });*/

   /*var clipboard = new Clipboard('#copy');
    clipboard.on('success', function(e) {
        //e.clearSelection();
    });*/

  /*$('#input').on('focus',function(){
        $('#input').trigger( "keyup" );
        $('#input').text("Grumpy wizards make toxic brew for the evil Queen and Jack.");
    });

    $('#text-generator').on('click', function() {
        $('#input').trigger( "keyup" );
        $('#input').text("Grumpy wizards make toxic brew for the evil Queen and Jack.");
    });*/

/*****Unit Testing*****/

/*QUnit.test( "hello test", function(assert){
  assert.ok( 1 == "1", "Passed!" );
});*/

/*function isEven(val) {
    return val % 2 === 0;
}
 
test('isEven()', function() {
    ok(isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
     // Fails
    ok(isEven(3), 'Three is an even number');
})*/

/*QUnit.test( "a basic test example", function( assert ) {
  var value = "hello";
  assert.equal( value, "hello", "We expect value to be hello" );
});*/

/*QUnit.test("ok test", function(assert){
  assert.ok( true, "true succeeds" );
  assert.ok( "non-empty", "non-empty string succeeds" );
 
  assert.ok( false, "false fails" );
  assert.ok( 0, "0 fails" );
  assert.ok( NaN, "NaN fails" );
  assert.ok( "", "empty string fails" );
  assert.ok( null, "null fails" );
  assert.ok( undefined, "undefined fails" );
});*/

/*QUnit.test( "equal test", function( assert ) {
  assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
  assert.equal( "", 0, "Empty, Zero; equal succeeds" );
  assert.equal( "", "", "Empty, Empty; equal succeeds" );
  assert.equal( 0, false, "Zero, false; equal succeeds" );
 
  assert.equal( "three", 3, "Three, 3; equal fails" );
  assert.equal( null, false, "null, false; equal fails" );
});*/

/*QUnit.test( "deepEqual test", function( assert ) {
  var obj = { foo: "bar" };
  assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
});*/