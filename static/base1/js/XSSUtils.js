(function(){ec.encodeInit=function(){if("object"!==typeof $ESAPI||null===$ESAPI){org.owasp.esapi.ESAPI.initialize()}};ec.encodeForJS=function(input){if("string"!==typeof input){return input}ec.encodeInit();return $ESAPI.encoder().encodeForJavaScript(input)};ec.encodeForAttr=function(input){if("string"===typeof input){ec.encodeInit();input=$ESAPI.encoder().encodeForHTMLAttribute(input);if(!input)input="";input=input.replaceAll(" ","&#x20;")}return input};ec.encryptJSON=function(jsonObj){if(typeof jsonObj==="object"){for(var key in jsonObj){if(typeof jsonObj[key]==="object"){ec.encryptJSON(jsonObj[key])}else if(typeof jsonObj[key]==="string"&&!/^[\w\d\s\-\:\+]+$/.test(jsonObj[key])){jsonObj[key]=ec.encodeForAttr(jsonObj[key])}}}};ec.autoEncodeAttr=function(input){if("string"!==typeof input){return input}if(input.indexOf("&")>-1){var tmp=document.createElement("textarea");tmp.innerHTML=input;input=tmp.value}return ec.encodeForAttr(input)}})();