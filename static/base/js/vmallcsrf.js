(function() {	
	var csrftoken = {header:"CsrfToken", param:"CsrfToken", token:"98B4A01736FF548D4D548A3B5AE54F47FC5988D08AD6F682"};
	var domains = ["openapi.vmall.com","addr.vmall.com","www.vmall.com"];
	if (!isSameLocaleDomain(domains))
	{
	    return;
	}
	var forms = document.getElementsByTagName('form');

	for (i = 0; i < forms.length; i++) {
		var url = forms[i].action;
		if (url == null || url == "")
			continue;
		if(!isSameDomain(url,domains))
			continue;	
		
		// check if has csrf token element
		var formchilds = forms[i].getElementsByTagName("input");
		var hastoken = false;
		if (formchilds != null && formchilds.length > 0) {
			for ( var k = 0; k < formchilds.length; k++) {
				if (formchilds[k].name == csrftoken.param) {
					hastoken = true;
					break;
				}
			}
		}
		if (hastoken) {
			continue;
		}
		
		// add csrf token element		
		var e = document.createElement("input");
		e.name = csrftoken.param;
		e.value = csrftoken.token;
		e.type = "hidden";
		forms[i].appendChild(e);
	}	
	
	hijackStandard();

	//Overwrite the onsend function
	XMLHttpRequest.prototype.onsend = function(data) {
		if(isSameDomain(this.url,domains)) {
			this.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			this.setRequestHeader(csrftoken.header, csrftoken.token);				
		}
	};
	
	/** hook using standards based prototype **/
	function hijackStandard() {
		XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function(method, url, async, user, dataText) {
			this.url = url;			
			this._open.apply(this, arguments);
		};
		
		XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
		XMLHttpRequest.prototype.send = function(data) {
			if(this.onsend != null) {
				this.onsend.apply(this, arguments);
			}					
			this._send.apply(this, arguments);
		};		
	}

	function isSameLocaleDomain(domains){
		var samedomain = false;
		var localeDomain = document.domain;
		if (location.port != "")
		{
		    localeDomain = localeDomain + ":" + location.port;
		}
		for ( var j = 0; j < domains.length; j++) {
			if (domains[j] == localeDomain) {
				samedomain = true;				
			}
		}
		return samedomain;
	}

	function isSameDomain( url, domains){
		var samedomain = false;
		// check domain
		var dm = parseDomain(url);
		if (dm != null) {

			for ( var j = 0; j < domains.length; j++) {
				if (domains[j] == dm) {
					samedomain = true;				
				}
			}		
		}else
			samedomain = true;
			
		return samedomain;
	}

	function parseDomain(url) {
		var pt = /^(?:\w+:)?\/\/([\w\.\-]+)\//;

		var results = url.match(pt);
		if (results != null) {
			return results[1];
		}
		return null;
	}	
})();

