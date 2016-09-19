/*TextDecor- A CSS Generator For Text & Font Styling */
"use strict";
(function(){

    var s= new Service(),   /*using service.js*/
    w = window.innerWidth,
	text= $("#input").val(), /*initial value of input*/
	formElement= $('.form-element'),  /*all form elements*/
	selectElement= formElement.filter(function(index){
		return index>0;
	}),   /*all form elements except the first one which is the textarea*/

	/*Arrays of css properties*/
	fontArr=["'Fjalla One', sans-serif","'Lato', sans-serif",
    "'Open Sans', sans-serif","'Droid Sans', sans-serif","'Source Sans Pro', sans-serif","'Roboto', sans-serif","'Slabo 27px', serif","'Oswald', sans-serif","'Roboto Condensed', sans-serif","'Lora', serif",
    "'Montserrat', sans-serif","'PT Sans', sans-serif","'Raleway', sans-serif","'Open Sans Condensed', sans-serif","'Ubuntu', sans-serif","'Roboto Slab', serif","'Droid Serif', serif","'Merriweather', serif","'Arimo', sans-serif","'PT Sans Narrow', sans-serif","'Noto Sans', sans-serif","'Titillium Web', sans-serif","'PT Serif', serif","'Bitter', serif","'Dosis', sans-serif","'Yanone Kaffeesatz', sans-serif","'Playfair Display', serif","'Oxygen', sans-serif","'Arvo', serif","'Inconsolata',"],
	sizeArr=[],
	styleArr=['normal','italic','oblique'],
	weightArr=['400','500','600','700','800','900','bold','bolder'],
	vrntArr=['normal','small-caps'],
	colorArr=['#000000'],
	spaceArr=[],
	transformArr= ['none','capitalize','lowercase','uppercase'],
	decorArr= ['none','underline','overline','line-through'],
	alignArr= ['initial','left','right','center','justify'],
	propContArr= ['#h-shadow-code','#v-shadow-code','#blur-radius-code'],
	/***end of arrays of css properties***/
	cssProperties= $('.css-code').find('p'), /*all p's which contain the generated code*/
	size= $('#size'), 
	style= $('#style'),  /*select element which hold the font-size options*/
	font= $('#fonts'),
	weight= $('#weight'),
	variant= $('#variant'),
	color= $('#color'),
	background= $('#background'),
	lSpacing= $('#spacing'),
	wSpacing= $('#word-spacing'),
	transform= $('#transform'),
	decoration= $('#decoration'),
	align= $('#align'),
	padding= $('#padding'),
	notice= $('.notice').find('small'),  /*container of dynamic link text*/
	resetBtn= $('button#reset'),
	copyBtn= $('#copy'),
	randomBtn= $('#random'),
	addBtn= $('#add'),
	clearBtn= $('#clear-stack'),
	cleanerBtn= $('#cleaner'),
	toggleBtn= $('#toggle-btn'),
	checkBox= $('.checkbox-common'),
	randomCheck= $('.random-check'),
	colorAddon= $('span.input-group-addon-color').find('span'),
	backgroundAddon= $('span.input-group-addon-background').find('span'),
	checkLabel= $('.check-label'),
	checkUncheck= $('#check-uncheck'),
	savedStyle= $('.saved-styles'),
	emCheckBox= $('#px-to-em'),
	ptCheckBox= $('#px-to-pt'),
	percentCheckBox= $('#px-to-percent'),
	output= $('#output'),
	hShadow= $('#h-shadow'),
	vShadow= $('#v-shadow'),
	blurRadius= $('#radius'),
	sColor= $('#shadow-color'),
	sColorAddon= $('span.input-group-addon-shadow').find('span'),
	shadowCheck= $('#no-shadow');
    
    text= text.replace(/(<([^>]+)>)/ig,""); /*strips all html tags and their contents*/
    color.colorpicker();        /*colorpicker for changing color*/
    background.colorpicker();   /*colorpicker for changing bg */
    sColor.colorpicker(); 
    disableElements();                /*disable elements at initial state*/
    cssProperties.hide();             /*hides css codes at initial state*/
    randomCheck.hide();
    /*pushing and manipulating property arrays*/
    s.indexPush(sizeArr,10,80);
    s.addString(sizeArr,"px");
    s.indexPush(spaceArr,0,40);
	s.addString(spaceArr,"px");
	s.arraySort(fontArr);
	/***end of pushing and manipulating property arrays***/
	notice.hide(); 
	linkGenerator(fontArr[0],'font-link'); /*initial link generation*/
	/*hides the colorpicker color*/
	colorAddon.hide(); 
	backgroundAddon.hide();
	sColorAddon.hide();
	checkLabel.html('Uncheck All');
	checkUncheck.attr('checked','checked');
	checkBox.attr('checked','checked');
	shadowCheck.attr('checked','checked'),
	clearBtn.hide();	
	$('#view').popover(); /*initial popover of view saved stylebutton*/

    /*creates dynamic href attribute for font link*/
	function linkAttribute(str,id){                          
	    document.getElementById(id).setAttribute('href',str);
	}

    /*dynamically creates google font links*/
	function linkGenerator(fontNameStr,id){
		if(typeof fontNameStr=== 'string'){
			var fontNameArr= fontNameStr.split(","); /*'xxx',yyy becomes 'xxx'*/	
			var fontName= fontNameArr[0];
			fontName= fontName.trim().replace(/'+/g,""); /*'xxx' becomes xxx*/	
			var googleFont= "https://www.google.com/fonts#UsePlace:use/Collection:";
            $('.font-name').html("'"+fontName+"'");
			if(fontName.indexOf(" ")==-1){
			    var link= googleFont+fontName;
			    linkAttribute(link,id);
			}
			else{
			    var words= fontName.split(" "); 
			    var linkWords= words.join("+");
			    var link= googleFont+linkWords;
			    linkAttribute(link,id);
			}
		}
		else{
			return;
		}
	}

    /*default styling of output*/
	function defaultStyle(){

		output.css({
		    'font-size': size.find('option').eq(4).html(),
		    'font-style': styleArr[0],
		    'font-family': fontArr[0],
		    'font-weight': weightArr[0],
		    'font-variant': vrntArr[0],
		    'color': colorArr[0],
		    'letter-spacing': spaceArr[0],
		    'word-spacing': spaceArr[0],
		    'text-transform': transformArr[0],
		    'text-decoration': decorArr[0],
		    'text-align': alignArr[0],
		    'background': '#fffcfc',
		    'padding':spaceArr[6],
		    'text-shadow':'none',	    
		});

		output.animate({top: "0px",right:'0px',bottom:'0px',left:'0px'},'300','swing');
	}

    /*defalt style css code display*/ 
	function deafaulStyleDisplay(){

        $("#font-size-code").html(size.find('option').eq(4).html()+";");
	    $("#font-style-code").html(styleArr[0]+";");
	    $("#font-family-code").html(fontArr[0]+";");
	    $("#font-weight-code").html(weightArr[0]+";");
	    $("#font-variant-code").html(vrntArr[0]+";");
	    $("#color-code").html(colorArr[0]+';');
	    $("#letter-spacing-code").html(spaceArr[0]+";");
	    $("#word-spacing-code").html(spaceArr[0]+";");
	    $("#text-transform-code").html(transformArr[0]+";");
	    $("#text-decoration-code").html(decorArr[0]+";");
	    $("#text-align-code").html(alignArr[0]+";");
	    $("#background-code").html('#fffcfc'+';');
	    $("#padding-code").html(spaceArr[6]+';');
	    $("#none-code").html('none'+';');
	}  
     
	jQuery.fn.extend({
		popoverContentChange: function(data){
            var popover = $(this).data('bs.popover');
            popover.options.content = data; 
            $(this).popover('hide');
        },

        btnContentChange: function(text,icon,popoverText){
        	var $this= $(this);
        	return[
	        	$this.html(function(){
		        	var glyphIcon= "<span class='glyphicon "+ icon+" icon-left' aria-hidden='true'></span>";
		        	return glyphIcon+text; 
		        }),
		        $this.popoverContentChange(popoverText)
	        ];
        },

	    parentShow: function(){
	    	var popover;
	        return[
	        	$(this).parent().show('100').removeClass('removed'), /*show the parent of the child*/
		        toggleBtn.btnContentChange('Hide','glyphicon-chevron-up','Hide Code')
	        ];
	    }
	});

    /*sets color in rgba format*/
	function colorSetter(colorId,property,colorDisplay,colorSpan){

        $(colorId).colorpicker().on('changeColor.colorpicker', function(event){
	        var red= event.color.toRGB().r,
	        green= event.color.toRGB().g,
	        blue= event.color.toRGB().b,
	        alpha= event.color.toRGB().a,
	        color= "rgba("+red+","+green+","+blue+","+alpha+")";  /*e.g. rgba(250,255,30,1)*/
	        output.css(property,color);
	        $(colorDisplay).html(color+";");
	        $(colorSpan).find('span').show('700');
	        $(colorSpan).find('span').css({
	        	'background-color': color,
	        	'color':color
	        });
	        $(colorDisplay).parentShow();
		});
	}

    /*enables elements*/
	function enableElements(){
		selectElement.removeAttr('disabled','disabled');
        resetBtn.removeAttr('disabled','disabled');
        copyBtn.removeAttr('disabled','disabled');
        randomBtn.removeAttr('disabled','disabled');
        checkBox.removeAttr('disabled','disabled');
        addBtn.removeAttr('disabled','disabled');
        emCheckBox.removeAttr('disabled','disabled');
        ptCheckBox.removeAttr('disabled','disabled');
        shadowCheck.removeAttr('disabled','disabled');
        percentCheckBox.removeAttr('disabled','disabled');
        cleanerBtn.removeAttr('disabled','disabled');
        toggleBtn.removeAttr('disabled','disabled');
	}

    /*disables elements*/
	function disableElements(){
		selectElement.attr('disabled','disabled');
        resetBtn.attr('disabled','disabled');
        copyBtn.attr('disabled','disabled');
        randomBtn.attr('disabled','disabled');
        checkBox.attr('disabled','disabled');
        addBtn.attr('disabled','disabled');
        emCheckBox.attr('disabled','disabled');
        ptCheckBox.attr('disabled','disabled');
        shadowCheck.attr('disabled','disabled');
        percentCheckBox.attr('disabled','disabled');
        cleanerBtn.attr('disabled','disabled');
        toggleBtn.attr('disabled','disabled');
	}

    /*get values from an element and set the value*/  
	function getSetVal(id,property,display){
        var val= $(id).val();
        output.css(property,val);
        $(display).html(val+";");
    }

    var styleDiv= $('#saved-styles-div'),
    styleCounter=0;
    /*this fn adds styles to the queue*/
    function styleQueue(){
     	var savedStyleArr= $('#css-code-container').find('p').not('p.removed').text().split(';'), /*splits all styles*/
     	counter;
    	savedStyleArr.pop();/*removes the last element, in this case an empty one*/
    	if(savedStyleArr.length>0){
     		counter= s.counter();
     	}
    	s.addString(savedStyleArr,';');
	    s.elementCreation(savedStyleArr,'saved-styles-div','p');/*p containing properties are created*/
	    styleDiv.find('p').css({
	    	'padding':'.5em',
	    	'margin-bottom':'-3px'
	    });
	    styleDiv.find('p').eq(styleCounter).before("<p class='style-count'>Style "+counter+
	    ":</p>"); /*creates and sets style no. as header before each group of styles*/
	    $('.style-count').css({
	    	'font-size':'1.3em',
	    	'background':'#ECE3DC',
	    	'margin-top':'10px',
	    	'padding':'.5em',
	    	'font-family':"'Lato', sans-serif",
	    	'letter-spacing':'1px',
	    	'font-weight':'700',
	    	'color':'#6A6A68'
	    });
	    if(savedStyleArr.length<1){
	    	counter--;
	    }
	    else{
	    	styleCounter= styleCounter+savedStyleArr.length+1; /*because there are 13 properties!*/
	    } 

	    clearBtn.show();  
    }

    /*px to other units conversion function*/ 
    function pxToOthers(){
    	var argLen= arguments.length,
    	unit= arguments[0];
        for(var i=1;i<argLen;i++){
            var mainPixel= $(arguments[i]).text(),
            pixelVal= parseInt(mainPixel);
            if(unit==='em'){
            	if(mainPixel.indexOf(unit)==-1){
	                $(arguments[i]).html(pixelVal*.0625+unit+";");  /*px to em*/
	            }
            }
            else if(unit==='pt'){
            	if(mainPixel.indexOf(unit)==-1){
            		$(arguments[i]).html(pixelVal*.75+unit+";");    /*px to pt*/
	            }
            }
            else if(unit==='%'){
            	if(mainPixel.indexOf(unit)==-1){
            		$(arguments[i]).html(pixelVal*6.25+unit+";");   /*px to %*/
	            }
            }      
        }   
    }

    /*checks if a unit checkbox is checked and performs required actions*/
    function unitCheck(id){
    	if(emCheckBox.prop("checked") == true){
	        pxToOthers('em',id);
	    }
	    else if(ptCheckBox.prop("checked") == true){
	        pxToOthers('pt',id);
	    }
	    else if(percentCheckBox.prop("checked") == true){
	        pxToOthers('%',id);
	    }
    }

    /*others to px converter*/
    function othersTopx(){
    	var argLen= arguments.length;
        for(var i=0;i<argLen;i++){
            var mainEm= $(arguments[i]).text(),
            emVal= parseFloat(mainEm);
            if(mainEm.indexOf('px')==-1){ 
                if(mainEm.indexOf('em')!==-1){       	
                    $(arguments[i]).html(emVal*16+"px;");  /*em to px*/
                }
                else if(mainEm.indexOf('pt')!==-1){
                	$(arguments[i]).html(Math.ceil(emVal*1.3333)+"px;");  /*pt to px*/
                }
                else if(mainEm.indexOf('%')!==-1){
                	$(arguments[i]).html(Math.ceil(emVal*.16)+"px;");  /*% to px*/
                }        	
            }
        }   
    }

    /*select texts inside a div*/
    function selectText(containerid) {
	    if (document.selection) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(document.getElementById(containerid));
	        range.select();
	    } else if (window.getSelection()) {
	        var range = document.createRange();
	        range.selectNode(document.getElementById(containerid));
	        window.getSelection().removeAllRanges();
	        window.getSelection().addRange(range);
	    }
	}

    /*text shadow property selectboxes get disabled*/ 
	function disabledShadowElements(){
		hShadow.attr('disabled','disabled');
        vShadow.attr('disabled','disabled');
        blurRadius.attr('disabled','disabled');
        sColor.attr('disabled','disabled');
	}

    /*text shadow property selectboxes get enabled*/ 
	function enabledShadowElements(){
		hShadow.removeAttr('disabled','disabled');
        vShadow.removeAttr('disabled','disabled');
        blurRadius.removeAttr('disabled','disabled');
        sColor.removeAttr('disabled','disabled');
	}

    /*replaces a char with another char in a string, input isa array of strings*/
	function charReplace(array,ch,replacer){
		if(typeof array==='object'){
			var len= array.length;
			for(var i=0;i<len;i++){
				var replaced= $(array[i]).html().replace(ch,replacer);
				$(array[i]).html(replaced);
			}
		}
		else{
			return;
		}	
	}

    /*converts shadow units from one unit to another*/ 
	function shadowUnitConverter(unit,to){
    	if(shadowCheck.prop('checked')==false){
    		if(unit==='px'){
    			if(to==='em'){
	    			pxToOthers('em','#h-shadow-code','#v-shadow-code','#blur-radius-code');
	    		}
	    		else if(to==='pt'){
                    pxToOthers('pt','#h-shadow-code','#v-shadow-code','#blur-radius-code');
	    		}
	    		else if(to==='%'){
                    pxToOthers('%','#h-shadow-code','#v-shadow-code','#blur-radius-code');
	    		}
    		}
    		else{
    			othersTopx('#h-shadow-code','#v-shadow-code','#blur-radius-code');
    		}	
            charReplace(propContArr,';',''); /*removes ; from each property*/
    	}
    }

    /*changes shadow units values on change according to checked unit*/
    function onChangeShadowUnit(container){
		if(emCheckBox.prop("checked") == true){
            pxToOthers('em',container);
        }
        if(ptCheckBox.prop("checked") == true){
            pxToOthers('pt',container);
        }
        if(percentCheckBox.prop("checked") == true){
            pxToOthers('%',container);
        }
        var newVal= $(container).text().replace(';',''); 
        $(container).text(newVal);
	}

	function deactivator(){
		cssProperties.fadeOut('700');
    	notice.fadeOut('700');
    	disableElements();
    	randomCheck.fadeOut('700');      
	}

    /*output is drag and droppable in larger devices*/
	if(w>767){
	    output.draggable({
		    cursor: "crosshair",   
		    scroll: true,
		    containment: "document",
		    delay: 100
	    });

	    output.draggable( "option" ,"cursor", "crosshair","scroll", true,"containment", "document", "delay", 100 );     
	}

    /*checking uncheking all the style checkboxes forrandom style generation*/
	checkUncheck.on('click', function() {
		var $this= $(this);
		if($this.prop("checked") == false){
            checkBox.prop('checked',false);
            checkLabel.html('Check All');     
        }  
        else if($this.prop("checked") == true){
            checkBox.prop('checked',true);
            checkLabel.html('Uncheck All');      
        }
	});

    /*when the shadow checkbox is clicked*/
	shadowCheck.on('click',function(){
		if(shadowCheck.prop("checked") == true){  /*this means none*/
	        disabledShadowElements();
	        output.css('text-shadow','none');
	        $('#none-code').html('none'+';');
	        $('#none-code').nextAll().html("");
	    }
	    else if(shadowCheck.prop("checked") == false){
	        enabledShadowElements();
	        output.css('text-shadow',hShadow.val()+" "+vShadow.val()+" "+blurRadius.val()+" "+sColor.val());
	        $('#none-code').html("");
	        $('#h-shadow-code').html(hShadow.val());
	        $('#v-shadow-code').html(vShadow.val());
	        $('#blur-radius-code').html(blurRadius.val());
	        $('#shadow-color-code').html(sColor.val()+";");
	        if(emCheckBox.prop("checked") == true){
	            shadowUnitConverter('px','em');
	        }

	        if(ptCheckBox.prop("checked") == true){
	            shadowUnitConverter('px','pt');
	        }

	        if(percentCheckBox.prop("checked") == true){
	            shadowUnitConverter('px','%');
	        }
	    }
	});
  	   
	$('p.header-section').addClass('text-center'); /*makes all header text alignment to center*/
	$('code.css-code').find('p').find('span').addClass('css-code-value');/*makes css values red*/

    $('#input').on('keyup',function(){
        text= $(this).val();
        text= text.replace(/(<([^>]+)>)/ig,""); /*strips html tags*/
        output.html(function(){
        	var mover = "<span class='glyphicon glyphicon-move pull-right' aria-hidden='true'></span>";
        	return text+mover;  /*text+glyphicon in the output*/
        });

        notice.fadeIn('700'); /*dynamic link appears*/
        enableElements();
        cssProperties.fadeIn('700');
        /*randomCheck.fadeIn('700');*/
        if(text.length<1){   /*no text!*/
        	deactivator();     
        }

        if(shadowCheck.prop("checked") == true){
	        disabledShadowElements();
	    }
	    else if(shadowCheck.prop("checked") == false){
	        enabledShadowElements();
	    }
    });

    /*section: creating options for all select menus, getting & setting values on change event*/
    s.elementCreation(fontArr,'fonts','option'); 
    font.change(function() {
	    getSetVal('#fonts','font-family','#font-family-code');
        linkGenerator($(this).val(),'font-link');
        $('#font-family-code').parentShow();
	});

    s.elementCreation(sizeArr,'size','option'); 
    size.find('option').eq(4).attr('selected','selected');
	size.change(function() {
		getSetVal('#size','font-size','#font-size-code');
		unitCheck('#font-size-code');
		$('#font-size-code').parentShow();
	});

    
    s.elementCreation(styleArr,'style','option'); 
	style.change(function() {
	    getSetVal('#style','font-style','#font-style-code');
	    $('#font-style-code').parentShow();
	});

    s.elementCreation(weightArr,'weight','option');
	weight.change(function() {
	    getSetVal('#weight','font-weight','#font-weight-code');
	    $('#font-weight-code').parentShow();
	});

    s.elementCreation(vrntArr,'variant','option');
	variant.change(function() {
	    getSetVal('#variant','font-variant','#font-variant-code');
	    $('#font-variant-code').parentShow();
	});

	colorSetter('#color','color','#color-code','span.input-group-addon-color');
    colorSetter('#background','background','#background-code','span.input-group-addon-background');
   
    s.elementCreation(spaceArr,'spacing','option');
	lSpacing.change(function() {
	    getSetVal('#spacing','letter-spacing','#letter-spacing-code');
	    unitCheck('#letter-spacing-code');
	    $('#letter-spacing-code').parentShow();
	});

	s.elementCreation(spaceArr,'word-spacing','option');
	wSpacing.change(function() {
	    getSetVal('#word-spacing','word-spacing','#word-spacing-code');
	    unitCheck('#word-spacing-code');
	    $('#word-spacing-code').parentShow();
	});

	s.elementCreation(transformArr,'transform','option');
	transform.change(function() {
	    getSetVal('#transform','text-transform','#text-transform-code');
	    $('#text-transform-code').parentShow();
	});

	s.elementCreation(decorArr,'decoration','option');
	decoration.change(function() {
	    getSetVal('#decoration','text-decoration','#text-decoration-code');
	    $('#text-decoration-code').parentShow();
	});

	s.elementCreation(alignArr,'align','option');
	align.change(function() {
	    getSetVal('#align','text-align','#text-align-code');
	    $('#text-align-code').parentShow();
	});

	s.elementCreation(spaceArr,'padding','option');
	padding.find('option').eq(6).attr('selected','selected');
	padding.change(function() {
	    getSetVal('#padding','padding','#padding-code');
	    unitCheck('#padding-code');
	    $('#padding-code').parentShow();
	});

	s.elementCreation(spaceArr,'h-shadow','option');
	s.elementCreation(spaceArr,'v-shadow','option');
	s.elementCreation(spaceArr,'radius','option');

	hShadow.change(function() {
	    output.css('text-shadow',hShadow.val()+" "+vShadow.val()+" "+
	    blurRadius.val()+" "+sColor.val());
	    output.find('span').css('text-shadow','none');  
	    $('#h-shadow-code').html(hShadow.val());
	    onChangeShadowUnit('#h-shadow-code'); 
	    $('#text-shadow-code').parentShow();  
	});

	vShadow.change(function() {
	    output.css('text-shadow',hShadow.val()+" "+vShadow.val()+" "+
	    blurRadius.val()+" "+sColor.val());  
	    output.find('span').css('text-shadow','none');  
	    $('#v-shadow-code').html(vShadow.val());
	    onChangeShadowUnit('#v-shadow-code');
	    $('#text-shadow-code').parentShow();        
	});

	blurRadius.change(function() {
	    output.css('text-shadow',hShadow.val()+" "+vShadow.val()+" "+
	    blurRadius.val()+" "+sColor.val());
	    output.find('span').css('text-shadow','none');    
	    $('#blur-radius-code').html(blurRadius.val());
	    onChangeShadowUnit('#blur-radius-code');
	    $('#text-shadow-code').parentShow();        
	});

    /*changes shadow color*/
	sColor.colorpicker().on('changeColor.colorpicker', function(event){
    
	    var red= event.color.toRGB().r,
	    green= event.color.toRGB().g,
	    blue= event.color.toRGB().b,
	    alpha= event.color.toRGB().a,
	    color= "rgba("+red+","+green+","+blue+","+alpha+")";
	    output.css('text-shadow',hShadow.val()+" "+vShadow.val()+" "+
	    blurRadius.val()+" "+color);
	    output.find('span').css('text-shadow','none');  
	    $('#shadow-color-code').html(color+";");
	    $('span.input-group-addon-shadow').find('span').show('700');
	    $('span.input-group-addon-shadow').find('span').css({
	        'background-color': color,
	        'color':color
	    });
	    $('#text-shadow-code').parentShow();  
	});

	/***end of section: creating options for all select menus, getting & setting values on change event***/

    resetBtn.popover();
    /*resets all styling to default*/
	resetBtn.on('click',function(){
		deafaulStyleDisplay();
        defaultStyle();
        /*section: selecting/setting default options*/
        size.find('option').eq(4).attr('selected','selected');
        style.find('option').eq(0).attr('selected','selected');
        font.find('option').eq(0).attr('selected','selected');
        weight.find('option').eq(0).attr('selected','selected');
        variant.find('option').eq(0).attr('selected','selected');
        color.val('#000000');
        lSpacing.find('option').eq(0).attr('selected','selected');
        wSpacing.find('option').eq(0).attr('selected','selected');
        transform.find('option').eq(0).attr('selected','selected');
        decoration.find('option').eq(0).attr('selected','selected');
        align.find('option').eq(0).attr('selected','selected');
        padding.find('option').eq(6).attr('selected','selected');
        background.val('#fffcfc');
        hShadow.find('option').eq(0).attr('selected','selected');
        vShadow.find('option').eq(0).attr('selected','selected');
        blurRadius.find('option').eq(0).attr('selected','selected');
        sColor.val('#ffffff');
        linkGenerator(fontArr[0],'font-link');
        colorAddon.hide('700');
        backgroundAddon.hide('700'),
        sColorAddon.hide('700');
        $('#none-code').nextAll().html(""); /*all text shadow values get cleared*/
        shadowCheck.prop('checked',true);
        disabledShadowElements();
      
        if(emCheckBox.prop("checked")== true){
            pxToOthers('em','#font-size-code','#padding-code','#letter-spacing-code',
            	'#word-spacing-code');           
        }
        else if(ptCheckBox.prop("checked")== true){
            pxToOthers('pt','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
        }
        else if(percentCheckBox.prop("checked")== true){
            pxToOthers('%','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
        }

        $('.property').show('200').removeClass('removed');
        /***end of section: selecting/setting default options***/
        toggleBtn.html(function(){
        	var icon= "<span class='glyphicon glyphicon-chevron-up icon-left' aria-hidden='true'></span>";
        	return icon+'Hide'; 
        });

        toggleBtn.popoverContentChange('Hide Code'); 
        resetBtn.popover('hide');
	});

    /*checkBox.on('click', function(event) {
    	var $this= $(this);
    	if($this.prop('checked')===false && checkBox.prop('checked')===false){
            checkUncheck.prop('checked',false);
            checkLabel.html('Check All');  
    	}
    });*/

    randomBtn.popover();
    /*generates random styles*/
    randomBtn.on('click', function(){
    	
    	randomCheck.fadeIn('700');
    	/*at first the current values of all styles and their position in the array is calculated*/
        var  randomSize= size.val(),
        sizeIndex= sizeArr.indexOf(randomSize),
    	randomStyle= style.val(),
    	styleIndex= styleArr.indexOf(randomStyle),
    	randomFont= font.val(),
    	fontIndex= fontArr.indexOf(randomFont),
    	randomWeight= weight.val(),
    	weightIndex= weightArr.indexOf(randomWeight),
    	randomVariant= variant.val(),
    	variantIndex= vrntArr.indexOf(randomVariant),
    	randomLSpacing= lSpacing.val(),
        lSpaceIndex= spaceArr.indexOf(randomLSpacing),
        randomWSpacing= wSpacing.val(),
        wSpaceIndex= spaceArr.indexOf(randomWSpacing),
        randomTransform= transform.val(),
        transformIndex= transformArr.indexOf(randomTransform),
        randomDecoration= decoration.val(),
        decorationIndex= decorArr.indexOf(randomDecoration),
        randomAlign= align.val(),
        alignIndex= alignArr.indexOf(randomAlign),
        randomPadding= padding.val(),
        paddingIndex= spaceArr.indexOf(randomPadding),
        randomHShadow= hShadow.val(),
        hShadowIndex= spaceArr.indexOf(randomHShadow),
        randomVShadow= vShadow.val(),
        vShadowIndex= spaceArr.indexOf(randomVShadow),
        randomBlurRadius= blurRadius.val(),
        radiusIndex= spaceArr.indexOf(randomBlurRadius);

        $('.property').show('100').removeClass('removed');
        /*the array from which random color is generated*/
        var hexArr=['f','a','b','c','f','d','e','f',1,2,3,4,'f',5,6,'f','f',7,8,9,0];
        function randomColorGen(checkboxId,colorPickerId){
        	var randColor;
            if($(checkboxId).prop("checked") == true){
	            var colorVal="";

		        for(var i=0;i<6;i++){
		        	var randHex= s.randomElement(hexArr);
		        	colorVal+= randHex; 
		        }
		        randColor= "#"+colorVal,	/*e.g. #ff2aec*/       
	        	colorPickerId.val(randColor);
	            colorPickerId.colorpicker('setValue',randColor); /*sets the color of the colorpicker*/
	        }
	        else if($(checkboxId).prop("checked") == false){
	        	randColor= colorPickerId.val(); /*no change*/
	        }
	        return randColor;
        }
       
        var randomColor= randomColorGen('#color-check',color),
        randomBg=randomColorGen('#bg-check',background),
        randomShadowColor= randomColorGen('#text-shadow-check',sColor);
        /*checks the status of the checkboxes for all styles in random style generation section
        to generate random styles*/ 
        if($('#size-check').prop("checked") == true){
            randomSize= s.randomElement(sizeArr);
            sizeIndex= sizeArr.indexOf(randomSize);
            size.find('option').eq(sizeIndex).attr('selected','selected');
        }
        else if($('#size-check').prop("checked") == false){
        	randomSize= randomSize;
            sizeIndex= sizeIndex;
        }

        if($('#style-check').prop("checked") == true){
            randomStyle= s.randomElement(styleArr);
            styleIndex= styleArr.indexOf(randomStyle);
            style.find('option').eq(styleIndex).attr('selected','selected');
        }
        else if($('#style-check').prop("checked") == false){
        	randomStyle= randomStyle;
        	styleIndex= styleIndex;
        }

        if($('#font-check').prop("checked") == true){
            randomFont= s.randomElement(fontArr);
            fontIndex= fontArr.indexOf(randomFont);
            font.find('option').eq(fontIndex).attr('selected','selected');
        }
        else if($('#font--check').prop("checked") == false){
        	randomFont= randomFont;
        	fontIndex= fontIndex;
        }

        if($('#weight-check').prop("checked") == true){
            randomWeight= s.randomElement(weightArr);
            weightIndex= weightArr.indexOf(randomWeight);
            weight.find('option').eq(weightIndex).attr('selected','selected');
        }
        else if($('#weight-check').prop("checked") == false){
        	randomWeight= randomWeight;
        	weightIndex= weightIndex;
        }

        if($('#variant-check').prop("checked") == true){
            randomVariant= s.randomElement(vrntArr);
            variantIndex= vrntArr.indexOf(randomVariant);
            variant.find('option').eq(variantIndex).attr('selected','selected');
        }
        else if($('#variant-check').prop("checked") == false){
        	randomVariant= randomVariant;
        	variantIndex= variantIndex;
        }

        if($('#l-spacing-check').prop("checked") == true){
            randomLSpacing= s.randomElement(spaceArr);
            lSpaceIndex= spaceArr.indexOf(randomLSpacing);
            lSpacing.find('option').eq(lSpaceIndex).attr('selected','selected');
        }
        else if($('#l-spacing-check').prop("checked") == false){
        	randomLSpacing= randomLSpacing;
        	lSpaceIndex= lSpaceIndex;
        }

        if($('#w-spacing-check').prop("checked") == true){
            randomWSpacing= s.randomElement(spaceArr);
            wSpaceIndex= spaceArr.indexOf(randomWSpacing);
            wSpacing.find('option').eq(wSpaceIndex).attr('selected','selected');
        }
        else if($('#w-spacing-check').prop("checked") == false){
        	randomWSpacing= randomWSpacing;
        	wSpaceIndex= wSpaceIndex;
        }

        if($('#transform-check').prop("checked") == true){
            randomTransform= s.randomElement(transformArr);
            transformIndex= transformArr.indexOf(randomTransform);
            transform.find('option').eq(transformIndex).attr('selected','selected');
        }
        else if($('#transform-check').prop("checked") == false){
        	randomTransform= randomTransform;
        	transformIndex=  transformIndex;
        }

        if($('#decoration-check').prop("checked") == true){
            randomDecoration= s.randomElement(decorArr);
            decorationIndex= decorArr.indexOf(randomDecoration);
            decoration.find('option').eq(decorationIndex).attr('selected','selected');
        }
        else if($('#decoration-check').prop("checked") == false){
        	randomDecoration= randomDecoration;
        	decorationIndex= decorationIndex;
        }

        if($('#align-check').prop("checked") == true){
            randomAlign= s.randomElement(alignArr);
            alignIndex= alignArr.indexOf(randomAlign);
            align.find('option').eq(alignIndex).attr('selected','selected');
        }
        else if($('#align-check').prop("checked") == false){
        	randomAlign= randomAlign;
        	alignIndex= alignIndex;
        }

        if($('#padding-check').prop("checked") == true){
            randomPadding= s.randomElement(spaceArr);
            paddingIndex= spaceArr.indexOf(randomPadding);
            padding.find('option').eq(paddingIndex).attr('selected','selected');
        }
        else if($('#padding-check').prop("checked") == false){
        	randomPadding= randomPadding;
        	paddingIndex= paddingIndex;
        }

         if($('#text-shadow-check').prop("checked") == true){
        	$('#none-code').html(''); /*default value gets cleared*/
            shadowCheck.prop('checked',false);
            enabledShadowElements();
            randomHShadow= s.randomElement(spaceArr);
            hShadowIndex= spaceArr.indexOf(randomHShadow);
            hShadow.find('option').eq(hShadowIndex).attr('selected','selected');
            randomVShadow= s.randomElement(spaceArr);
            vShadowIndex= spaceArr.indexOf(randomVShadow);
            vShadow.find('option').eq(vShadowIndex).attr('selected','selected');
            randomBlurRadius= s.randomElement(spaceArr);
            radiusIndex= spaceArr.indexOf(randomBlurRadius);
            blurRadius.find('option').eq(radiusIndex).attr('selected','selected');
        }
        else if($('#text-shadow-check').prop("checked") == false){
        	if(shadowCheck.prop('checked')==true){
        		randomHShadow=randomVShadow=randomBlurRadius=randomShadowColor='';
        	}
        }
        /*end of: checks the status of the checkboxes for all styles in random style generation section
        to generate random styles*/ 

        /*sets random styles*/
    	output.css({
		    'font-size': randomSize,
		    'font-style': randomStyle,
		    'font-family': randomFont,
		    'font-weight': randomWeight,
		    'font-variant': randomVariant,
		    'color': randomColor,
		    'letter-spacing': randomLSpacing,
		    'word-spacing': randomWSpacing,
		    'text-transform': randomTransform,
		    'text-decoration': randomDecoration,
		    'text-align': randomAlign,
		    'background': randomBg,
		    'padding': randomPadding,
		    'text-shadow': randomHShadow+" "+randomVShadow+" "+randomBlurRadius+" "+randomShadowColor
		});

        /*setsrandom styles in the display code*/  
        $("#font-size-code").html(randomSize+";");
	    $("#font-style-code").html(randomStyle+";");
	    $("#font-family-code").html(randomFont+";");
	    $("#font-weight-code").html(randomWeight+";");
	    $("#font-variant-code").html(randomVariant+";");
	    $("#color-code").html(randomColor+';');
	    $("#letter-spacing-code").html(randomLSpacing+";");
	    $("#word-spacing-code").html(randomWSpacing+";");
	    $("#text-transform-code").html(randomTransform+";");
	    $("#text-decoration-code").html(randomDecoration+";");
	    $("#text-align-code").html(randomAlign+";");
	    $("#background-code").html(randomBg+';');
	    $("#padding-code").html(randomPadding+';');
	    $('#h-shadow-code').html(randomHShadow);
	    $('#v-shadow-code').html(randomVShadow);
	    $('#blur-radius-code').html(randomBlurRadius);
	    $('#shadow-color-code').html(randomShadowColor+";");

	    output.find('span').css('text-shadow','none');  
        /*unit related issues when random button is clicked*/ 
	    if(shadowCheck.prop('checked')==true){
	    	var newVal= $('#shadow-color-code').text().replace(';','');
    		$('#shadow-color-code').text(newVal);
	    }

	    if(emCheckBox.prop("checked") == true){
            pxToOthers('em','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','em');
        }

        if(ptCheckBox.prop("checked") == true){
            pxToOthers('pt','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','pt');
        }

        if(percentCheckBox.prop("checked") == true){
            pxToOthers('%','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','%');
        }
        /*end of section: unit related issues when random button is clicked*/ 

        linkGenerator(randomFont,'font-link');
        toggleBtn.btnContentChange('Hide','glyphicon-chevron-up','Hide Code');
    });

    addBtn.popover();
    addBtn.on('click',styleQueue);  /*adds styles to the queue*/
    addBtn.on('mousedown',function(){
    	var $this=$(this);
    	$this.attr('title','Added!'); /*popover title*/
    	$this.popover('hide');
    	clearBtn.show();
    });

    deafaulStyleDisplay();
    defaultStyle();

    /*px-em-px conversion*/  
    emCheckBox.on('click', function() {
    	var $this= $(this);
    	if($this.prop("checked") == true){
            pxToOthers('em','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','em');
            ptCheckBox.attr('disabled','disabled');
            percentCheckBox.attr('disabled','disabled');
        }
        else if($this.prop("checked") == false){
            othersTopx('#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('em');
            ptCheckBox.removeAttr('disabled','disabled');
            percentCheckBox.removeAttr('disabled','disabled');
        }
    });

    /*px-pt-px conversion*/  
    ptCheckBox.on('click', function() {
        var $this= $(this);
    	if($this.prop("checked") == true){
            pxToOthers('pt','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','pt');
            emCheckBox.attr('disabled','disabled');
            percentCheckBox.attr('disabled','disabled');
        }
        else if($this.prop("checked") == false){
            othersTopx('#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('pt');
            emCheckBox.removeAttr('disabled','disabled');
            percentCheckBox.removeAttr('disabled','disabled');
        }
    });

    /*px-%-px conversion*/  
    percentCheckBox.on('click', function() {
    	var $this= $(this);
    	if($this.prop("checked")== true){
            pxToOthers('%','#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('px','%');
            emCheckBox.attr('disabled','disabled');
            ptCheckBox.attr('disabled','disabled');
        }
        else if($this.prop("checked")== false){
            othersTopx('#font-size-code','#padding-code','#letter-spacing-code','#word-spacing-code');
            shadowUnitConverter('%');
            emCheckBox.removeAttr('disabled','disabled');
            ptCheckBox.removeAttr('disabled','disabled');
        }
    });

    copyBtn.popover();
    /*text selection event*/
    copyBtn.on('mousedown',function(){
    	selectText('css-code-container'); /*selects code*/
    	$(this).popover('hide');
    });
	/***end of text selection event***/

    /*cleares the stack*/
	clearBtn.on('click',function() {
		styleDiv.html("");
		styleCounter=0;
		$('#view-modal').on('hidden.bs.modal',function(e){
		  clearBtn.hide();  /*hides clear button when stack is empty*/
		});
	});

	$('.conversion-area').find('p').show(); /*shows the unit converter checkboxes*/

    $('button#gen').popover();
    /*generates a default text*/
	$('button#gen').on('click',function() {
		$('#input').val('Grumpy wizards make toxic brew for the evil Queen and Jack.');
		$('#input').trigger('keyup'); /*keyup event occurs!*/
		$(this).popover('hide');
	});

    cleanerBtn.popover();
    /*clears input and output*/
	cleanerBtn.on('click',function() {
		var $this= $(this);
		output.html('');
		$('#input').val('');
		deactivator();
		$this.attr('disabled','disabled'); 
		$this.popover('hide');
	});

	$('.property-remove').attr('title','Remove This Property.');

	$('.property-remove').on('click',function() {
		$(this).parent().hide('100').addClass('removed');  /*hides the parent p element containing generated code*/
		if($('p.removed').length===$('p.property').length){
	        toggleBtn.btnContentChange('Show','glyphicon-chevron-down','Show Code');
		}
	});

    toggleBtn.popover({
    	content: 'Hide Code.' /*default content of toggleBtn popover*/
    });

    /*this button hides/shows styles*/
	toggleBtn.on('click',function() {
		var $this= $(this),
		btnText= $this.text(),
		icon;
		
		if(btnText==='Hide'){  /*so we've to hide the code*/
			$('p.property').fadeOut('100').addClass('removed');
			btnText= "Show";
	        $this.btnContentChange('Show','glyphicon-chevron-down','Show Code');
		}
		else{  /*so we've to show the code*/
			$('p.property').fadeIn('100').removeClass('removed');
			btnText= "Hide";
	        $this.btnContentChange('Hide','glyphicon-chevron-up','Hide Code');
		}
	});
})();



