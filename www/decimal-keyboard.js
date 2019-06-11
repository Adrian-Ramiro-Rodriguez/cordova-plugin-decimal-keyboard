var argscheck = require('cordova/argscheck'),
utils = require('cordova/utils'),
exec = require('cordova/exec');
   
var DecimalKeyboard = function() {
    
};
DecimalKeyboard.getActiveElementType= function(){
    return document.activeElement.type;
};
DecimalKeyboard.isDecimal = function(){
    var showDecimal = null;
    var activeElement = document.activeElement;
    if(activeElement.attributes["decimal"]==undefined || 
        activeElement.attributes["decimal"]=='undefined' || 
        activeElement.attributes["decimal"].value=='false'){
        showDecimal = false;
    }else{
        showDecimal = true;
    }
    return showDecimal;
};
DecimalKeyboard.getDecimalChar = function(activeElement){
    
    if(activeElement==undefined || activeElement==null || activeElement=='undefined')
        activeElement = document.activeElement;

    var decimalChar = null;
    if(activeElement.attributes["decimal-char"]==undefined || 
        activeElement.attributes["decimal-char"]=='undefined'){
        decimalChar='.'
    }else{
        decimalChar=activeElement.attributes["decimal-char"].value;
    }
    return decimalChar;
};
DecimalKeyboard.addDecimalAtPos = function(val,position){

};
DecimalKeyboard.addDecimal = function(){
    var activeElement = document.activeElement;
    var allowMultipleDecimals = true;
    if(activeElement.attributes["allow-multiple-decimals"]==undefined || 
        activeElement.attributes["allow-multiple-decimals"]=='undefined' || 
        activeElement.attributes["allow-multiple-decimals"].value=='false'){
        allowMultipleDecimals = false;
    }
    var value = activeElement.value;
    var valueToSet = '';
    var decimalChar = DecimalKeyboard.getDecimalChar(activeElement);
    var caretPosStart = activeElement.selectionStart;
    var caretPosEnd = activeElement.selectionEnd;
    var first='';
	var last='';
	var networkNumberRegex = new RegExp(
		/^((\d{1,3}\.{0,1})$|(\d{1,3}\.\d{1,3}\.{0,1})$|(\d{1,3}\.\d{1,3}\.\d{1,3}\.{0,1})$|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$)/g
	  );
    
    first = value.substring(0, caretPosStart);
    last = value.substring(caretPosEnd);
    
    if(caretPosStart == 0 || !DecimalKeyboard.isDecimal()) {
        return;
	}
	
	
	var nextValue = first+decimalChar+last;
    if(allowMultipleDecimals && nextValue.match(networkNumberRegex)){
        valueToSet = nextValue;
    }else{
        if(value.indexOf(decimalChar) > -1 ){
            return;
        }
        valueToSet = first+decimalChar+last;
    }
    activeElement.value = valueToSet;
};


module.exports = DecimalKeyboard;