(function(){$.fn.fixed=function(options){var defaults={className:"tool-fixed",holderClass:".tool-fixed-holder",zIndex:200,bottomDom:null,width:0,height:0},opt=$.extend(defaults,options);$(this).each(function(){var $floatLayout=$(this),thisHeight=$floatLayout.height(),layoutOffset=$floatLayout.offset(),offsetTop=layoutOffset.top,bottomOffsetTop=opt.bottomDom?$(opt.bottomDom).offset().top:1e5,$holderObj=opt.holderClass&&$(opt.holderClass)[0]?$floatLayout.prev(opt.holderClass):null,scrollTop=0;var isIE=!!window.ActiveXObject;var isIE6=isIE&&!window.XMLHttpRequest;var isIE8=isIE&&!!document.documentMode;var isIE7=isIE&&!isIE6&&!isIE8;if(isIE6){$floatLayout.css({"z-index":opt.zIndex,height:(opt.height||$floatLayout.height())+"px",width:(opt.width||$floatLayout.width())+"px"});var handler,$newObj=$floatLayout,oldPosition=$floatLayout.css("position"),thisPosition=$floatLayout.position(),thisPositionTop=thisPosition.top,parentTop=offsetTop>=thisPositionTop?offsetTop-thisPositionTop:0;$(window).bind("scroll",function(){window.clearTimeout(handler);handler=window.setTimeout(function(){scrollTop=$(document).scrollTop();$floatLayout.addClass(opt.className).css({position:"absolute",display:"block"});if(scrollTop>=offsetTop&&scrollTop<=bottomOffsetTop){if($holderObj){$holderObj.show()}$floatLayout.css({top:scrollTop-parentTop+"px"});return}if($holderObj){$holderObj.hide()}$floatLayout.css({position:oldPosition}).removeClass(opt.className)},60)})}else{$(window).scroll(function(){scrollTop=$(window).scrollTop();if(scrollTop>=offsetTop&&scrollTop<=bottomOffsetTop){if($holderObj){$holderObj.show()}if(!$floatLayout.hasClass(opt.className)){$floatLayout.addClass(opt.className)}return}$floatLayout.removeClass(opt.className);if($holderObj){$holderObj.hide()}})}});if($(window).scrollTop()>0){$(window).trigger("scroll")}}})();