ec.load('ajax');
ec.load('ec.box');
ec.pkg('ec.leftMenu');
 

/* IE版本判断 */
var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
var validateBox,exchangeType=1,id="";
var storage=window.localStorage;
var validateBox,isInLastTimer=0;
var msgStartTag='<span class="label-error red">';
var msgEndTag='</span>';
 
ec.ready(function() {
	var weChatInfo = ec.util.cookie.get("weChatInfo");
	changeWechatClass(weChatInfo);
});
 

function changeWechatClass(weChatInfo)
{
	if(weChatInfo=="" || weChatInfo==null){
		$("#li-order-small").hide();
	}
	else{
		if(weChatInfo.length<5)
		{
			var allCountWechat = ec.util.cookie.get("vmallOrderCountWechat");
			$("#li-order-small").show();
			if(allCountWechat==0){
				$("#li-order-small").html('<a href="/member/orderWeChat?t='+ new Date().getTime() +'"><span>小程序订单</span></a>');
			}if(allCountWechat>0){
				$("#li-order-small").html('<a href="/member/orderWeChat?t='+ new Date().getTime() +'"><span>小程序订单<em>('+ allCountWechat +')</em></span></a>');
			}
			
			 var allCount = ec.util.cookie.get("vmallOrderCount");
		 	if(allCount==0){
		 		$("#li-order span").html("我的订单");
		 	}else if(allCount>0){
		 		$("#li-order span").html("我的订单<em>("+ allCount +")</em>");
		 	}
		}
		else
		{
			$("#li-order-small").html('');
			$("#li-order-small").hide();
		}
	}
}




