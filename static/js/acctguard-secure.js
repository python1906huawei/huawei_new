
	function fingerprint(){
		function isIE(){
			if(navigator["appName"] === "Microsoft Internet Explorer") {
				return true;
			} 
			else if(navigator["appName"] === "Netscape" && /Trident/.test(navigator["userAgent"])) { // IE 11
			  	return true;
			}
			return false;	
		}

		function createElem(type, name, append){
			var el;
			if (name !== undefined && document["getElementById"](name)) {
				el = document["getElementById"](name);
			} else {
				el = document["createElement"](type);
			}
			el["style"]["visibility"] = "hidden";
			el["style"]["position"] = "absolute";

			if (name) {
				el["setAttribute"]("id", name);
			}

			if (append) {
				document["body"]["appendChild"](el);
			}
			return el;	
		}

		function getswfobj(movieName){
			var movie;
			
			if (navigator["appName"]["indexOf"]("Microsoft") != -1) {
		        if (typeof (window[movieName].getsid) == 'function') {
		            // < IE9
		            movie = window[movieName];
		        }
		        else if (typeof (document[movieName].getsid) == 'function') {
		            // >= IE9
		            movie = document[movieName];
		        }
		    }
		    else {
		        // NON IE
		        movie = document[movieName];
		    }

		    return movie;
		}

		//set dev id in flash cookie and other storage
		function callback(resp){
			var id = window["eval"]('(' + resp + ')').sid;
			if(id["length"] > 1)
			{
				var key = "hwid_cas_sid";
				var key1 = "sid";
				
				var t = new Date;
				t["setFullYear"](t["getFullYear"]() + 10);

				document["cookie"] = key+"="+id+"; expires=" + t["toGMTString"]() + "; domain=" + document["domain"] + "; path=/;secure";  
				document["cookie"] = key1+"="+id+"; expires=" + t["toGMTString"]() + "; domain=" + document["domain"] + "; path=/;secure";  
				
				if(window["localStorage"]){
					try{
						window["localStorage"]["setItem"](key, id);
						window["localStorage"]["setItem"](key1, id);
					}
					catch(err){
						
					}
					
				}

				if (isIE()) {
					var elm = document["getElementById"]("userdata_el");
					if (elm["addBehavior"]) {
						elm["setAttribute"](key, id);
						elm["save"](key);				
					}
				}		

				var mgdevswf = getswfobj("JSdev");

				if(mgdevswf && typeof mgdevswf["setsid"] == "function"){
					mgdevswf.setsid(id);
				}

			}

			
	
		}



		function canvasfp(){
			try{
				var canvas = document["createElement"]("canvas");
				canvas.height = 60;
				canvas.width = 400;
				canvas["style"]["display"] = "inline";

				var ctx = canvas.getContext("2d");
				ctx.textBaseline = "alphabetic";
				ctx.fillStyle = "#f60";
				ctx.fillRect(125, 1, 62, 20);
				ctx.fillStyle = "#069";
				ctx.font = "11pt no-real-font-123";
				ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
				ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
				ctx.font = "18pt Arial";
				ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
				return canvas.toDataURL();

			}catch(n){
				return "";
			}
		}

		function webrtcfp(fp){
			var ip_dups = {};
		    var RTCPeerConnection = window["RTCPeerConnection"]
		        || window["mozRTCPeerConnection"]
		        || window["webkitRTCPeerConnection"];

		    if(RTCPeerConnection){

			    function handleCandidate(candidate){
			        //match just the IP address
			        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
			        var result = ip_regex.exec(candidate);

			        if(result !== null)
			        {
						var ip_addr = result[1];
						//remove duplicates
				        if(ip_dups[ip_addr] === undefined)
				            fp["ips"].push(ip_addr);

				        ip_dups[ip_addr] = true;

				        flashvars["webrtcipready"] = true;        	
			        }

			    }

			    try{
				    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
				    var mediaConstraints = {optional: [{RtpDataChannels: true}]};

				    var pc = new RTCPeerConnection(servers, mediaConstraints);

				    pc.onicecandidate = function(ice){
			       		if(ice.candidate)
			       		{
			        		handleCandidate(ice.candidate.candidate);
			       		}
			   		};


				    pc.createDataChannel("");

				    pc.createOffer(function(result){
				        //trigger the stun server request
				        pc.setLocalDescription(result, function(){}, function(){});

				    }, function(){});

				    setTimeout(function(){
				        //read candidate info from local description
				    	if(pc.localDescription == null){
				    		return;
				    	}
				        var lines = pc.localDescription.sdp.split('\n');

				        lines.forEach(function(line){
				            if(line.indexOf('a=candidate:') === 0)
				                handleCandidate(line);
				        });
				    }, 800);

				    if(window.MediaStreamTrack)
				    {
				    	MediaStreamTrack.getSources || (MediaStreamTrack.getSources = MediaStreamTrack.getMediaDevices);
				    	MediaStreamTrack.getSources(function(sources){
				    		
				    		for (var i = 0; i < sources.length; i++) {
				    			fp["devs"].push(sources[i].kind + ";" + sources[i].label + ";" + sources[i].id);
				    		}

				    	});
				    }
			    }catch(err){

			    }

		    };
		}	

		function getregularplugins() {
			var result = [];
			var plugins = [];
			for(var i = 0, l = navigator["plugins"]["length"]; i < l; i++) {
				plugins["push"](navigator["plugins"][i]);
			}
		    
		    for (var i = 0; i < plugins["length"]; i++) {
		    	var r=[];
		    	for (var j = 0; j < plugins[i]["length"]; j++) {
		    		r.push(plugins[i]["item"](j)["type"]);
		    	}

		    	var temp = plugins[i]["name"] ;

		    	if (plugins[i]["version"]) {
		    		temp = temp + plugins[i]["version"];
		    	}

		    	temp = temp + plugins[i]["filename"] + r.join("");

		  		result["push"](temp);
		    }

		    return result;
		}

		function getieplugins () {
			var result = [];
			if((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window)) {
				var names = [
		          "AcroPDF.PDF", // Adobe PDF reader 7+
		          "Adodb.Stream",
		          "AgControl.AgControl", // Silverlight
		          "DevalVRXCtrl.DevalVRXCtrl.1",
		          "MacromediaFlashPaper.MacromediaFlashPaper",
		          "Msxml2.DOMDocument",
		          "Msxml2.XMLHTTP",
		          "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
		          "QuickTime.QuickTime", // QuickTime
		          "QuickTimeCheckObject.QuickTimeCheck.1",
		          "RealPlayer",
		          "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
		          "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
		          "Scripting.Dictionary",
		          "SWCtl.SWCtl", // ShockWave player
		          "Shell.UIHelper",
		          "ShockwaveFlash.ShockwaveFlash", //flash plugin
		          "Skype.Detection",
		          "TDCCtl.TDCCtl",
		          "WMPlayer.OCX", // Windows media player
		          "rmocx.RealPlayer G2 Control",
		          "rmocx.RealPlayer G2 Control.1"
		          ];

		        function detectplugin(name)
		        {
		        	try {
		            	new ActiveXObject(name); // eslint-disable-no-new
		            	return name;
		        	} catch(e) {
		        		return null;
		        	}
		        }

		        // starting to detect plugins in IE
		        for (var i = 0; i < names.length; i++)
		        {
		        	if(detectplugin(names[i]))
		        	{
		        		var ax = new ActiveXObject(names[i]);
		        		var v = "";
		        		var v1= "";

		        		try{
		        			v = ax["GetVariable"]("$version");
		        		}catch(ex){
		        		}

		        		try{
		        			v1 = ax["GetVersions"]();
		        		}catch(ex){
		        		}        	

		        		result.push(names[i] + v + v1);
		        	}
		        }
		    }

			if(navigator.plugins) {
		    	result = result.concat(getregularplugins());
		    }

		   	return result;
		}

		function pluginsfp(){
			var result;

			if(isIE())
			{
				result = getieplugins();
			}
			else
			{
				result = getregularplugins();
			}

			fp["epl"] = result.length;
			fp["ep"] = hash(result.join(",")); 

			var group = {};

			for (var i = 0; i < result.length; i++) {
				var key = result[i]["charAt"](0)["toUpperCase"]();
				if (!(key >= "A" && key <="Z")) {
					key="#";
				}

				if(!group.hasOwnProperty(key)){
					group[key] = [];
				}

				group[key].push(result[i]);
			}

			var r = [];

			for (var key in group) {
				if (group.hasOwnProperty(key)) {
					r.push(key + hash(group[key].join(",")));
				}
			}

			fp["epls"] = r.join(",");
		}


		function getwebglcanvas(){
			var canvas = document.createElement("canvas");
			var gl = null;
			try {
				gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			} catch(e) { /* squelch */ }
			if (!gl) { gl = null; }
			return gl;
		}

		function webglfp(){
			var gl;
			var fa2s = function(fa) {
				gl.clearColor(0.0, 0.0, 0.0, 1.0);
				gl.enable(gl.DEPTH_TEST);
				gl.depthFunc(gl.LEQUAL);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
				return "[" + fa[0] + ", " + fa[1] + "]";
			};

			var maxAnisotropy = function(gl) {
				var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
				return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
			};	

		    gl = getwebglcanvas();
		    if(!gl) { return null; }

		    var result = [];
		    var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
		    var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
		    var vertexPosBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
		    var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
		    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		    vertexPosBuffer.itemSize = 3;
		    vertexPosBuffer.numItems = 3;
		    var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
		    gl.shaderSource(vshader, vShaderTemplate);
		    gl.compileShader(vshader);
		    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
		    gl.shaderSource(fshader, fShaderTemplate);
		    gl.compileShader(fshader);
		    gl.attachShader(program, vshader);
		    gl.attachShader(program, fshader);
		    gl.linkProgram(program);
		    gl.useProgram(program);
		    program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
		    program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
		    gl.enableVertexAttribArray(program.vertexPosArray);
		    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
		    gl.uniform2f(program.offsetUniform, 1, 1);
		    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
		    if (gl.canvas != null) { result.push(gl.canvas.toDataURL()); }
		    result.push("extensions:" + gl.getSupportedExtensions().join(";"));
		    result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
		    result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
		    result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
		    result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
		    result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
		    result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
		    result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
		    result.push("webgl max anisotropy:" + maxAnisotropy(gl));
		    result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
		    result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
		    result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
		    result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
		    result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
		    result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
		    result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
		    result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
		    result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
		    result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
		    result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
		    result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
		    result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
		    result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
		    result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
		    result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
		    result.push("webgl version:" + gl.getParameter(gl.VERSION));

		    if (!gl.getShaderPrecisionFormat) {
		    	return result.join("~");
		    }

		    result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision);
		    result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMin);
		    result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMax);
		    result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision);
		    result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
		    result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
		    result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).precision);
		    result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMin);
		    result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMax);
		    result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision);
		    result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMin);
		    result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMax);
		    result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision);
		    result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
		    result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
		    result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).precision);
		    result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMin);
		    result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMax);
		    result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).precision);
		    result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMin);
		    result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMax);
		    result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).precision);
		    result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMin);
		    result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMax);
		    result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).precision);
		    result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMin);
		    result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMax);
		    result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).precision);
		    result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMin);
		    result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMax);
		    result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).precision);
		    result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMin);
		    result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMax);
		    result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).precision);
		    result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMin);
		    result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMax);
		    return result.join("~");    
		}

		function navigatorfp(fp){
			var nf = {};
			fp["nacn"] = navigator["appCodeName"];
			fp["nan"] = navigator["appName"];
			fp["nce"] = navigator["cookieEnabled"];
			fp["nlg"] = navigator["language"];
			fp["npf"] = navigator["platform"]["split"](" ").shift();
			fp["sah"] = window["screen"]["availHeight"];
			fp["saw"] = window["screen"]["availWidth"];
			fp["sh"] = window["screen"]["height"];
			fp["sw"] = window["screen"]["width"];
			fp["bsh"] = document["body"]["clientHeight"];
			fp["bsw"] = document["body"]["clientWidth"];

			fp["ett"] = (new Date)["getTime"]();
			fp["etz"] = (new Date)["getTimezoneOffset"]();
		}

		function timezonefp(){

		}

		function databasefp(fp){
			try {
				if (window.openDatabase) {
					var database = window.openDatabase("mgdb", "", "mgdb", 1024 * 1024);

					database.transaction(function (tx) {
						tx.executeSql("CREATE TABLE IF NOT EXISTS mginfo(" +
							"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
							"name TEXT NOT NULL, " +
							"value TEXT NOT NULL, " +
							"UNIQUE (name)" +
							")", [], function (tx, rs) {}, function (tx, err) {});
					});

					if (fp["dbsid"] !== undefined && fp["dbsid"] !== ""){
						database.transaction(function (tx) {
							tx.executeSql("INSERT OR REPLACE INTO mginfo(name, value) " +
		                	"VALUES(?, ?)",["sid", fp["dbsid"]], function (tx, rs) {}, function (tx, err) {});
		                });					
					} else {
						database.transaction(function (tx) {
							tx.executeSql("SELECT value FROM mginfo WHERE name=?", ["sid"],
								function (tx, result1) {
									if (result1.rows.length >= 1) {
										fp["dbsid"] = result1.rows.item(0).value;
									} else {
										fp["dbsid"] = "";
									}
									
								}, function (tx, err) {});	
						});
					}
				}
				else
				{
					
				}
			} 
			catch (e) {
			}	
		}

		function indexdbfp(fp){
			try{
				var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

				if(indexedDB){
					var request = indexedDB.open("mgDb", 1);
					request.onerror = function(){};
			        request.onupgradeneeded = function(event) {
			           	var indexdb = event.target.result;
			            var store = indexdb.createObjectStore("mginfo", {
			                keyPath: "id",
			                unique: false
			            })
			        }

			        if (fp["indexid"] !== undefined && fp["indexid"] !== "") {
			        	request.onsuccess = function(event){
			        		var idb = event.target.result;
			        		idb.transaction(["mginfo"], "readwrite").objectStore("mginfo").put({id:0, value:fp["indexid"]});
			        		idb.close();
			        	}
			        }
			        else{
			       		request.onsuccess = function(event){
			        		var idb = event.target.result;
			        		idb.transaction(["mginfo"], "readonly").objectStore("mginfo").get(0).onsuccess = function(event){
			        			if(event.target.result){
			        				fp["indexid"] = event.target.result.value;
			        			}
			        		}
			        		idb.close();
			        	}
			        }
				}
				else{
					
				}

			}catch(e){

			}
		}

		function storagefp(fp){

			if(window["localStorage"]){
				var item = window["localStorage"]["getItem"]("sid");

				if (item != null) {
					fp["localStorage"] = item;
				}
			}

		}


		function base64encode(e){
			var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	        if (!e)
	            return "";
	        for (var t, r, a, i, o, s, c, l = "", u = 0; u < e.length; )
	            t = e["charCodeAt"](u++),
	            r = e["charCodeAt"](u++),
	            a = e["charCodeAt"](u++),
	            i = t >> 2,
	            o = (3 & t) << 4 | r >> 4,
	            s = (15 & r) << 2 | a >> 6,
	            c = 63 & a,
	            isNaN(r) ? s = c = 64 : isNaN(a) && (c = 64),
	            l = l + n["charAt"](i) + n["charAt"](o) + n["charAt"](s) + n["charAt"](c);
	        return l			
		}

		//此api可以参照阿里的实现
		function fontsfp(){
			var baseFonts = ["monospace", "sans-serif", "serif"];
			//}
			fontList = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Arab", "Arabic Typesetting", "Arial Black", "Batang", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Calibri", "Californian FB", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Copperplate Gothic Light", "DejaVu LGC Sans Mono", "Desdemona", "DFKai-SB", "Dotum", "Engravers MT", "Eras Bold ITC", "Eurostile", "FangSong", "Forte", "Franklin Gothic Heavy", "French Script MT", "Gabriola", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GungSeo", "Haettenschweiler", "Harrington", "Hiragino Sans GB", "Impact", "Informal Roman", "KacstOne", "Kino MT", "Kozuka Gothic Pr6N", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Fax", "Magneto", "Malgun Gothic", "Matura MT Script Capitals", "Menlo", "MingLiU-ExtB", "MoolBoran", "MS PMincho", "MS Reference Sans Serif", "News Gothic MT", "Niagara Solid", "Nyala", "Palace Script MT", "Papyrus", "Perpetua", "Playbill", "PMingLiU", "Rachana", "Rockwell", "Sawasdee", "Script MT Bold", "Segoe Print", "Showcard Gothic", "SimHei", "Snap ITC", "TlwgMono", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Vladimir Script", "Wide Latin"];

		    //we use m or w because these two characters take up the maximum width.
		    // And we use a LLi so that the same matching fonts can get separated
		    var testString = "mmmmmmmmmmlli";

		    //we test using 72px font size, we may use any size. I guess larger the better.
		    var testSize = "72px";

		    var h = document["getElementsByTagName"]("body")[0];

		    // div to load spans for the base fonts
		    var baseFontsDiv = document["createElement"]("div");

		    // div to load spans for the fonts to detect
		    var fontsDiv = document["createElement"]("div");

		    var defaultWidth = {};
		    var defaultHeight = {};

		    // creates a span where the fonts will be loaded
		    var createSpan = function() {
		    	var s = document["createElement"]("span");
		        /*
		         * We need this css as in some weird browser this
		         * span elements shows up for a microSec which creates a
		         * bad user experience
		         */
		         s["style"]["position"] = "absolute";
		         s["style"]["left"] = "-9999px";
		         s["style"]["fontSize"] = testSize;
		         s["innerHTML"] = testString;
		         return s;
		     };

		    // creates a span and load the font to detect and a base font for fallback
		    var createSpanWithFonts = function(fontToDetect, baseFont) {
		    	var s = createSpan();
		    	s["style"]["fontFamily"] = fontToDetect + "," + baseFont;
		    	return s;
		    };

		    // creates spans for the base fonts and adds them to baseFontsDiv
		    var initializeBaseFontsSpans = function() {
		    	var spans = [];
		    	for (var index = 0, length = baseFonts["length"]; index < length; index++) {
		    		var s = createSpan();
		    		s["style"]["fontFamily"] = baseFonts[index];
		    		baseFontsDiv["appendChild"](s);
		    		spans.push(s);
		    	}
		    	return spans;
		    };

		    // creates spans for the fonts to detect and adds them to fontsDiv
		    var initializeFontsSpans = function() {
		    	var spans = {};
		    	for(var i = 0, l = fontList["length"]; i < l; i++) {
		    		var fontSpans = [];
		    		for(var j = 0, numDefaultFonts = baseFonts["length"]; j < numDefaultFonts; j++) {
		    			var s = createSpanWithFonts(fontList[i], baseFonts[j]);
		    			fontsDiv["appendChild"](s);
		    			fontSpans.push(s);
		    		}
		            spans[fontList[i]] = fontSpans; // Stores {fontName : [spans for that font]}
		        }
		        return spans;
		    };

		    // checks if a font is available
		    var isFontAvailable = function(fontSpans) {
		    	var detected = false;
		    	for(var i = 0; i < baseFonts.length; i++) {
		    		detected = (fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]]);
		    		if(detected) {
		    			return detected;
		    		}
		    	}
		    	return detected;
		    };

		    // create spans for base fonts
		    var baseFontsSpans = initializeBaseFontsSpans();

		    // add the spans to the DOM
		    h.appendChild(baseFontsDiv);

		    // get the default width for the three base fonts
		    for (var index = 0, length = baseFonts.length; index < length; index++) {
		        defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth; // width for the default font
		        defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight; // height for the default font
		    }

		    // create spans for fonts to detect
		    var fontsSpans = initializeFontsSpans();

		    // add all the spans to the DOM
		    h.appendChild(fontsDiv);

		    // check available fonts
		    var available = [];
		    for(var i = 0, l = fontList.length; i < l; i++) {
		    	if(isFontAvailable(fontsSpans[fontList[i]])) {
		    		available.push(fontList[i]);
		    	}
		    }

		    // remove spans from DOM
		    h.removeChild(fontsDiv);
		    h.removeChild(baseFontsDiv);

		    return available;
		}

		function swfLoadEvent(e, fn){
		   
		    if(typeof fn !== "function"){ return false; }
		    
		    var initialTimeout = setTimeout(function (){
		    
		        if(typeof e["ref"]["PercentLoaded"] !== "undefined" ){

		            var loadCheckInterval = setInterval(function (){

		                if(e["ref"]["PercentLoaded"]() === 100){

		                    fn();

		                    clearInterval(loadCheckInterval);
		                }
		            }, 1500);
		        }
		        else{
		        	flashvars["flashready"] = true;
					sendfp(fp);	
		        }
		    }, 200);
		}


		function flashdev(){
			if(flashvars["enabled"] && flashvars["try_count"] != 0)
			{
				try{
					flashvars["try_count"]--;
					var swfobj = getswfobj("JSdev");
					flashvars["sid"] = swfobj.getsid();
					if(flashvars["handler"])
					{
						clearTimeout(flashvars["handler"]);
					}
					fp["flashid"] = flashvars["sid"];
					var a = swfobj.getFlashInfo();
					fp["fos"] = a["fos"];
					fp["fonts"] = a["fonts"];
					fp["fv"] = a["fv"];
					fp["fsc"] = a["fsc"];
					fp["fsx"] = a["fsx"];
					fp["fsy"] = a["fsy"];
					fp["flg"] = a["flg"];
					fp["fp"] = a["fp"];
					fp["fm"] = a["fm"];

					flashvars["flashready"] = true;			
				}
				catch(e)
				{
					flashvars["handler"] = setTimeout(flashdev, 200);
				}

			}
			else{
				flashvars["flashready"] = true;
			}

		}

		function checkflash(){
			var hasFlash = false;
			try {
			  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			  if (fo) {
			    hasFlash = true;
			  }
			} catch (e) {
			  if (navigator.mimeTypes
			        && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
			        && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
			    hasFlash = true;
			  }
			}
			return hasFlash;
		}

		function flashfp(){
			flashvars["handler"] = setTimeout(flashdev, 200);
		}


		function serialize(obj) {
	  		var str = [];
	  		for(var p in obj){
	  			if (obj.hasOwnProperty(p)) {
	  				if(obj[p]){
	  					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));	
	  				}
	  			}
	  		}

	  		str.sort();

	  		return str.join("&");
	  	}

	  			//nc()
		function crypt(r){

			var cs = hash(r);

			r = r + "&cs=" + cs;

			var factor = 211;
			var o = "";

			for (var i = 0; i < r.length; i++) {
				var f = (r["charCodeAt"](i)^(factor-1)) & 255 ;
				o += String["fromCharCode"](f);
				factor = f;

			}

			o = base64encode(o);

			return o;
		}


		function sendfp(fp){
			var xmlhttp;
			if(window["XMLHttpRequest"]){
		  		xmlhttp=new XMLHttpRequest();
		  	}
			else if (window["ActiveXObject"]){
		  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  	}

		  	xmlhttp["onreadystatechange"]=function(){
		  		if (xmlhttp["readyState"]==4) {
		  			if (xmlhttp["status"] == 200) {
		  				resp = xmlhttp["responseText"];
		  				callback(resp);
		  			}
		  		}
		  	}

		  	xmlhttp.open("POST", localHttps + "/IDM_W/ajaxHandler/dev", true);
		  	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Page-Token", ("undefined" == typeof pageToken) ? '' : pageToken);
		  	xmlhttp.send("fp=" + encodeURIComponent(crypt(serialize(fp))));
		}

		function checkready(){
			return flashvars["flashready"];
		}

		function getdevid(){
			if (checkready()) {
				sendfp(fp);	
			}
			else
			{
				setTimeout(getdevid, 800);
			}
		}


		function swfcallback(e){
			
		    if(!e.success || !e.ref){
		    	
		    	return false; 
		    }

		    swfLoadEvent(e, function(){
		    	
		    	var swfobj = getswfobj("JSdev");
				flashvars["sid"] = swfobj.getsid();
				fp["flashid"] = flashvars["sid"];
				var a = swfobj.getFlashInfo();
				fp["fos"] = a["fos"];

				if (a["fonts"]) {
					fp["fft"] = hash(a["fonts"].join(","));
				}

				fp["fv"] = a["fv"];
				fp["fsc"] = a["fsc"];
				fp["fsx"] = a["fsx"];
				fp["fsy"] = a["fsy"];
				fp["flg"] = a["flg"];
				fp["fp"] = a["fp"];
				fp["fm"] = a["fm"];
				flashvars["flashready"] = true;
				sendfp(fp);		
		    });	 
		}

		//嵌入该js后，做几件事
		//1. 根据是否允许决定加载flash
		//2. 提取各个地方指纹信息并hash
		//3. 发送指纹信息 获取devid
		//4. 根据情况植入devid
		var flashvars = {"enabled": false, "sid":"", "try_count": 5,"handler": void 0, "flashready": false, "indexdbready": false, "dbready": false, "webrtcdevready":false, "webrtcipready":false};
		var fp={"canvas":"","webgl":"","ips":[],"devs":[],"epl":0, "ep":"", "epls":"" , "fonts":"","indexid":"","dbsid":"","flashid":""};


		window["onload"] = function(){
			
			if (isIE()) {
				var elm = createElem("input", "userdata_el", 1);
		        if (elm.addBehavior) {
		          elm.style.behavior = "url(#default#userData)";
		          elm.load("sid");
		          fp["userdata"] = elm.getAttribute("sid");	
				}	
			}
			
			//canvas
			var cp = canvasfp();

			if (cp) {
				fp["canvas"] = hash(cp);
			}
			
			//webrtc
			webrtcfp(fp);

			var wp = webglfp();

			if(wp)
			{
				fp["webgl"] = hash(wp);
			}

			pluginsfp();

			var ft = fontsfp();
			if (ft) {
				fp["fonts"] = hash(fontsfp().join(","));
			}

			navigatorfp(fp);

			//storage
			storagefp(fp);

			flashvars["enabled"] = checkflash();

			var version;

			if (flashvars["enabled"]){
				version = swfobject.getFlashPlayerVersion();
			}

			if (flashvars["enabled"]&&version.major >= 9) {

				var flashobj = createElem("div", "JSdev", 1);
				
				var params = {'wmode': 'transparent'};
				var attrs = {'style': 'visibility:hidden'};
				
				swfobject["embedSWF"](resourse_js_img_css_webUrl + "/js/pc_rss/secrisk/JSdev.swf", "JSdev", "10", "0", "9.0.0", false, false, params, attrs, swfcallback);		
			}
			else{
				flashvars["flashready"] = true;
				sendfp(fp);	
			}
		}


		function encode(e) {
			var t = e["replace"](/[\u0080-\u07ff]/g, function(e) {
				var t = e["charCodeAt"](0);
				return String["fromCharCode"](192 | t >> 6, 128 | 63 & t)
			});
			return t = t["replace"](/[\u0800-\uffff]/g, function(e) {
				var t = e["charCodeAt"](0);
				return String["fromCharCode"](224 | t >> 12, 128 | t >> 6 & 63, 128 | 63 & t)
			})
		}

		function ROTL(e, t) {
			return e << t | e >>> 32 - t
		}

		function fXor(e, t, n, r) {
		    switch (e) {
		    case 0:
		        return t & n ^ ~t & r;
		    case 1:
		        return t ^ n ^ r;
		    case 2:
		        return t & n ^ t & r ^ n & r;
		    case 3:
		        return t ^ n ^ r
		    }
		}

		function toHexStr(e) {
			for (var t, n = "", r = 7; r >= 0; r--)
				t = e >>> 4 * r & 15,
			n += t.toString(16);
			return n
		}


		//SHA1 NOT SHA-256
		function hash(e, t) {
		    t = "undefined" == typeof t ? !0 : t,
		    t && (e = encode(e));
		    var r = [1518500249, 1859775393, 2400959708, 3395469782];
		    e += String["fromCharCode"](128);
		    var a, i, o, s = e["length"] / 4 + 2, c = Math.ceil(s / 16), l = new Array(c);
		    for (a = 0; c > a; a++)
		        for (l[a] = new Array(16),
		        o = 0; 16 > o; o++)
		            l[a][o] = e["charCodeAt"](64 * a + 4 * o) << 24 | e["charCodeAt"](64 * a + 4 * o + 1) << 16 | e["charCodeAt"](64 * a + 4 * o + 2) << 8 | e["charCodeAt"](64 * a + 4 * o + 3);
		    l[c - 1][14] = 8 * (e.length - 1) / Math["pow"](2, 32),
		    l[c - 1][14] = Math["floor"](l[c - 1][14]),
		    l[c - 1][15] = 8 * (e.length - 1) & 4294967295;
		    var u, f, g, h, d, p = 1732584193, m = 4023233417, T = 2562383102, v = 271733878, S = 3285377520, M = new Array(80);
		    for (a = 0; c > a; a++) {
		        for (i = 0; 16 > i; i++)
		            M[i] = l[a][i];
		        for (i = 16; 80 > i; i++)
		            M[i] = ROTL(M[i - 3] ^ M[i - 8] ^ M[i - 14] ^ M[i - 16], 1);
		        for (u = p,
		        f = m,
		        g = T,
		        h = v,
		        d = S,
		        i = 0; 80 > i; i++) {
		            var E = Math["floor"](i / 20)
		              , C = ROTL(u, 5) + fXor(E, f, g, h) + d + r[E] + M[i] & 4294967295;
		            d = h,
		            h = g,
		            g = ROTL(f, 30),
		            f = u,
		            u = C
		        }
		        p = p + u & 4294967295,
		        m = m + f & 4294967295,
		        T = T + g & 4294967295,
		        v = v + h & 4294967295,
		        S = S + d & 4294967295
		    }
		    return toHexStr(p) + toHexStr(m) + toHexStr(T) + toHexStr(v) + toHexStr(S)
		}
	}

	function guard(){
		function make_array(n){
			var o = [];
			for (var i = 0; i < n.length; i++) {
				if (typeof n[i] != "undefined") {
					if (Object["prototype"]["toString"]["call"](n[i]) === "[object Array]") {
						for(var j = 0; j < n[i]["length"]; j++){
							o["push"](n[i][j]);
						}
					}
					else{
						o["push"](n[i]);	
					}
				}
			}

			return o;
		}

		function mod(t, a, o){

			if (typeof o == "undefined") {
				o = 1;
			}

			return t >> a & Math["pow"](2, o*8) - 1;
		}

		function bsi2(n){
			return [mod(n, 8), mod(n, 0)];
		}

		function bsi4(r){
			return bsi2(mod(r, 16, 2))["concat"](bsi2(mod(r, 0, 2)));
		}

		function bsi8(n){
			var t = Math["pow"](2, 32);
			var r = Math["floor"](n/t);
			var a = n - r*t;
			return bsi4(r)["concat"](bsi4(a));
		}

		function bss(n, r){

			var o = [];

			if (n) {

				if (typeof r != "undefined" && r) {
					n = encodeURIComponent(n);
				}

				for (var i = 0; i < n.length; i++) {
					o.push(n["charCodeAt"](i)); 
				}

				return o;
			}
		}

		//OC
		function str2arr(r){
			var a = [];
			for (var i = 0; i < r.length; i++) {
				a["push"](r["charCodeAt"](i));
			}

			return a;
		}


		var Zl = function(){
			this["a"] = [];

			for (var g = 0; g < 16; g++) {
				this["a"][g] = 0;
			}

			this["pc"] = 0;

			this["bol"] = 0;

			var p = bsi2(10001);


			this["a"][0] = p[0];
			this["a"][1] = p[1];

			this["cs"] = function(){
				var a = 3;
				var c = 0;


				for(var u = 16; u < this["a"]["length"]; u++){
					c = c + ~(this["a"][u] & 10098) & 255;
				}

				c = c + ~(0 & 255) & 255;
				var s = bsi2(c);

				this["a"][2] = s[0];
				this["a"][3] = s[1];
			}

			this["p"] = function(){
				this["pc"]++;
				var n = bsi2(this["pc"]);
				this["a"][4] = n[0];
				this["a"][5] = n[1];
			}

			this["bl"] = function(t){
				this["bol"] += t["length"];
				var s = bsi2(this["bol"]);
				this["a"][6] = s[0];
				this["a"][7] = s[1];
			}

			this["app"] = function(a){
				var g = str2arr(a);
				var p = bsi2(a["length"] - 4);
				g[2] = p[0];
				g[3] = p[1];

				if (Math["random"]() < 0.5) {
					this["a"] = this["a"]["concat"](g);
				}
				else{
					var w = [];
					var y = [];

					for (var i = 0; i < 16; i++) {
						w["push"](this["a"][i]);
					}

					for (var i = 16; i < this["a"]["length"]; i++) {
						y["push"](this["a"][i]);
					}

					this["a"] = w["concat"](g)["concat"](y);
				}

				this["p"]();
				this["bl"](a);
				this["cs"]();
				return make_string(this["a"]);
			}

			this["papp"] = function(a, o){
				var c = str2arr(a);
				var f = bsi2(c["length"] - 4);

				c[2] = f[0];
				c[3] = f[1];

				this["a"] = this["a"]["concat"](c);
				this["p"]();
				this["bl"](c);
				this["a"][10] = o[0];
				this["a"][11] = o[1][0];
				this["a"][12] = o[1][1];
				this["a"][2] = o[2][0];
				this["a"][3] = o[2][1];

				return make_string(this["a"]);
			}

			this["stm"] = function(t){
				var r = bsi2(t);
				this["a"][13] = r[0];
				this["a"][14] = r[1];
			}
		}


		function make_string(n){
			var r = "";
			for (var i = 0; i < n.length; i++) {
				r += String["fromCharCode"](n[i]);
			}

			return r;
		}

		//nc()
		function encode(r){
			var factor = 206;
			var o = "";

			for (var i = 0; i < r.length; i++) {
				var f = (r["charCodeAt"](i)^(factor-1)) & 255 ;
				o += String["fromCharCode"](f);
				factor = f;
			}

			return o;
		}


		function send(a, o){
			var L = [];
			var E = new Image;
			var x = "_img_" + (new Date())["getTime"]() + Math["random"]();
			window[x] = E;
			E["onload"] = E["onerror"] = function(){
				window[x] = null;
			}
			L["push"]("n=" + encodeURIComponent(o));

			var A = config["SendMethod"];

			a = a["replace"](new RegExp("\\?n=$", "g"), "");
			E["src"] = a + "?" + L["join"]("&");
			E = null;
		}

		//tm
		function touchstart(){

		}

		//im
		function  touchmove() {
			// body...
		}

		var qi = 0;

		//Wi
		function mousedown(event) {
			try{
				if (config["MaxMCLog"] > 0 && qi >= config["MaxMCLog"]) {
					return;
				}

				var ev = event || window["event"];

				var px = ev["pageX"];
				var py = ev["pageY"];

				if (typeof px == "undefined") {
					px = ev["clientX"] + document["body"]["scrollLeft"];
					py = ev["clientY"] + document["body"]["scrollTop"];
				}

				var target = ev["target"] || ev["srcElement"];


				var which = 0;

				if (typeof ev["which"] != "undefined" && ev["which"] <= 3 ) {
					which = [0, 0, 1, 2][ev["which"]];
				}
				else if (typeof ev["button"] != "undefined" && ev["button"] <= 4) {
					which = [2, 0, 2, 0, 1][ev["button"]];
				}

				var G = "";

				if (target && target["id"]) {
					G = encodeURIComponent(target["id"]);
				}

				var V = "";

				if (target["nodeName"] != "shape") {
					for (var i = 0; i < config["GetAttrs"].length; i++) {
						var U = target["getAttribute"](config["GetAttrs"][i]);
						if (U) {
							if (V["length"] == 0) {
								V = config["GetAttrs"][i] + "=" + encodeURIComponent(U);
							}
							else{
								V = V + "&" + config["GetAttrs"][i] + "=" + encodeURIComponent(U);
							}
						}
					}
				}

				var B = [px, py];
				var msg = [];

				var cur_ts = (new Date)["getTime"]() - start_ts;

				if (target["nodeName"] == "IMG" || target["nodeName"] == "A") {
					var R = target["getBoundingClientRect"]();
					B = [px, py, R["left"], R["top"], target["offsetWidth"], target["offsetHeight"]];
					msg = [5, 1, 0, 0, G["length"], bsi2(B[0]), bsi2(B[1]), which, V["length"], bsi4(cur_ts), 1, bsi2(R["left"]), bsi2(R["top"]), bsi2(target["offsetWidth"]), bsi2(target["offsetHeight"]), bss(G), bss(V)];
				}
				else{
					msg = [5, 1, 0, 0, G["length"], bsi2(B[0]), bsi2(B[1]), which, V["length"], bsi4(cur_ts), 0, bss(G), bss(V)];
				}

				msg = make_array(msg);

				addmsg(msg);

				if (qi <= 2) {
					send_emulator_msg(ev);
				}

				qi++;

			}catch(err){}
		}

		Xi = 0;
		//Qi
		function keydown(event){
			if (!(config["MaxKSLog"] > 0 && Xi >= config["MaxKSLog"])) {
				var g = event || window["event"];
				var p = g["target"] || g["srcElement"];
				var w = g["keyCode"];
				var b = 0;

				if (g["ctrlKey"] && w != 17){
					b += 1;
				}

				if (g["altKey"] && w != 18) {
					b += 2;
				}

				if (g["shiftKey"] && w != 16) {
					b += 4;
				}

				var M = "";
				if (p && p["id"]) {
					M = encodeURIComponent(p["id"]);
				}

				for (var i = 0; i < config["ExTarget"].length; i++) {
					if(config["ExTarget"][i] == M){
						w = 0;
						break;
					}
				}

				var T = (new Date)["getTime"]() - start_ts;

				var msg = [6, 1, 0, 0, M["length"], w, b, bsi4(T), bss(M)];
				
				if (p && p["type"] == "password") {
					msg["push"](bss("pass"));
				}

				msg = make_array(msg);

				addmsg(msg);

				if (Xi <= 2) {
					send_emulator_msg(g);
				}

				Xi++;

			}
		}

		var Ni = 0;
		var nI = {
			_n1t : 1,
			_n1z : 1,
			nocaptcha : 1
		} ;

		var rI = 0;
		var tI = 30;
		var zi = 0;
		//Yi
		function mousemove(event) {
			var ev = event || window["event"];
			var target = ev["target"] || ev["srcElement"];
			var b = "";

			if (target && target["id"] ) {
				b = encodeURI(target["id"]);
				
			}


			if (b in nI) {
				if (++rI > tI) {
					return;
				}
			}
			else{
				Ni++;

				if (config["MaxMPLog"] !=0 && zi >= config["MaxMPLog"]) {
					return;
				}

				if (!(config["MPInterval"] > 0 && Ni == config["MPInterval"])) {
					return;
				}
			}


			var px,py;

			if (ev["pageX"] != null) {
				px = ev["pageX"];
				py = ev["pageY"];
			}
			else{
				px = ev["clientX"] + document["body"]["scrollLeft"] - document["body"]["clientLeft"];
				py = ev["clientY"] + document["body"]["scrollTop"] - document["body"]["clientTop"];
			}

			var cur_ts = (new Date()).getTime() - start_ts;
			var msg = [4, 1, 0, 0, b["length"], bsi2(px), bsi2(py), bsi4(cur_ts), bss(b)];
			msg = make_array(msg);
			addmsg(msg);
			zi++;
			Ni = 0;
		}

		Zi = 0;
		//$i
		function mousefocus(event) {
			try{
				if (config["MaxFocusLog"] > 0 && Zi >= config["MaxFocusLog"])
					return;

				var h = event || window["event"];
				var l = h["target"] || h["srcElement"];
				var m = "";

				if (l && l["id"]) {
					m = encodeURIComponent(l["id"]);

				}

				var g = (new Date)["getTime"]() - start_ts;

				var msg = [7, 1, 0, 0, m["length"], h["type"] == "focus" || h["type"] == "focusin" ? 1 : 0, bsi4(g), bss(m)];

				msg = make_array(msg);

				addmsg(msg);

				Zi++;

			}catch(err){}
		}

		var nm = 0;
		var em = 0;
		//
		function deviceorientation(event){

			try{
				nm++;
				if (config["MaxGPLog"] != 0 && em > config["MaxGPLog"]) {
					return;
				}

				if (config["GPInterval"] > 0 && nm == config["GPInterval"]) {
					var ev = event || window["event"];

					var s = Math["round"](ev["alpha"]);
					var v = Math["round"](ev["beta"]);
					var d = Math["round"](ev["gamma"]);
					var h = (new Date())["getTime"]() - start_ts;

					var msg = [15, 1, 0, 0, bsi2(s), bsi2(v), bsi2(d), bsi4(h)];
					msg = make_array(msg);
					addmsg(msg);
					em ++;
					nm = 0;

				}

			}
			catch(e){}


		}


		
		function getElementByCurName(name){

			if (typeof config["loginform"] == "string") {
				var form = document["getElementById"](config["loginform"]);

				if (form) {
					var input = form.getElementsByTagName("input");

					for (var i = 0; i < input.length; i++) {
						if (input[i]["getAttribute"]("name") == name) {
							return input[i];
						}
					}

					var element = document["createElement"]("input");
					element["type"] = "hidden";
					element["name"] = name;
					form["appendChild"](element);

					return element;
				}
			}
		}

		function getTargets(){

			if (typeof config["loginform"] == "string") {

				var form = document["getElementById"](config["loginform"]);

				if (form) {

					tG.push(config["loginform"]);

					var input = form.getElementsByTagName("input");

					for (var i = 0; i < input.length; i++) {
						var id = input[i]["getAttribute"]("id");

						if(typeof id == "string"){
							tG.push(id);
						}
					}
				}

			}
		
		}

		function judgeTarget(id){
			for(var i = 0; i < tG.length; i++){
				if(tG[i] == id){
					return true;
				}
			}

			return false;
		}

		var zC;
		var DC;
		var gC;
		var Xl;
		var PC;
		var UC;
		var tG = [];

		function prepareparam(){
			xi = true;
			dC = [];
			zC = [];
			DC = [];
			ts_array = [];
			gC = [];
			Xl = new Zl;
			Xl["stm"](55199);
			PC = 0;
			UC = false;
			Pi = config["ImgUrl"];

			if ((config["SendMethod"] & 1) > 0) {
				var element = getElementByCurName("hwmeta");

				if (element) {
					if (!element["id"]) {
						element["id"] = "hwmeta";
					}
					element["value"] = "";
				}
			}


		}


		function base64encode(e){
			var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	        if (!e)
	            return "";
	        for (var t, r, a, i, o, s, c, l = "", u = 0; u < e.length; )
	            t = e["charCodeAt"](u++),
	            r = e["charCodeAt"](u++),
	            a = e["charCodeAt"](u++),
	            i = t >> 2,
	            o = (3 & t) << 4 | r >> 4,
	            s = (15 & r) << 2 | a >> 6,
	            c = 63 & a,
	            isNaN(r) ? s = c = 64 : isNaN(a) && (c = 64),
	            l = l + n.charAt(i) + n.charAt(o) + n.charAt(s) + n.charAt(c);
	        return l			
		}


		Xl = new Zl;
		Xl["stm"](55199);

		//
		function set_UAInput(msg){
			if (typeof config["loginform"] == "string") {
				var m = document["getElementById"]("hwmeta");

				if (m) {
					var g = make_string(msg);
					var p = encode(g["substring"](4));

					p = Xl["app"](g["substring"](0,4) + p);

					m["value"] = base64encode(p);
				
				}

			}
		}


		//VC()
		function judge_send(){
			if (dC["length"] >= config["SendInterval"]) {
				sendmsg();
			}
		}

		var dC;
		var xi;
		//Ki()
		function addmsg(msg){

			var u = msg;

			if (xi) {

				var s = [];

				for (var i = 0; i < u.length; i++) {
					s["push"](u[i]);
				}

				var h = bsi2(s["length"]);

				s[2] = h[0];
				s[3] = h[1];

				dC["push"](s);

				if ((config["SendMethod"] & 1) > 0) {
					set_UAInput(u);
				}
			}
		}


		var Pi ;
		var WC = "";
		var Ql;
		//GC() KC()
		function sendmsg(a){

			function o(){
				dC["push"](d);

				var n;
				var t;
				var msg;

				for (var i = 0; i < dC.length; i++) {
					n = [];
					n = make_array(dC[i]);
					t = make_string(n);
					msg = encode(t["substring"](4));
					msg = Ql["papp"](t["substring"](0, 4) + msg, h);
				}

				dC = [];

				send(Pi, base64encode(msg));
			}


			if (Pi) {
				if (config["Token"]) {
					WC = config["Token"];
				}

				var s = myrandom(3);
				Ql = new Zl;
				Ql["stm"](55199);

				var d = [21, 1, 0, 0, WC["length"], bss(WC)];
				var h = [0, bsi2(PC), bsi2(s)];

				if (typeof a == "undefined" || UC) {
					if (dC["length"] > 0) {
						PC += 1;
						o();
					}
				}
				else{
					PC += 1;
					h[0] = a;
					o();
					UC = true;
				}
			}
		}




		function unload(){
		}

		function send_start_msg(){
			var msg = [23, 1, 0 ,0 , bsi4(256)];
			msg = make_array(msg);
			addmsg(msg);
		}

		function send_debug_msg(debug, sig){
			var msg = [20, 1, 0, 0, 0, debug, bss(sig)];
			msg = make_array(msg);
			addmsg(msg);
		}

		function send_emulator_msg(e){
			var h = (window["phantom"] ? 1 : 0)["toString"]();
			var l = (window["callPhantom"] ? 1 : 0)["toString"]();
			var m = (window["_phantom"] ? 1 : 0)["toString"]();
			var g = (window["ClientUtils"] ? 1 : 0)["toString"]();
			var p = (window["__fxdriver_unwrapped"] ? 1 : 0)["toString"]();
			var w = (window["fxdriver_id"] ? 1 : 0)["toString"]();
			var y = (document["getElementsByTagName"]("html")[0]["getAttribute"]("webdriver") == null ? 0 : 1)["toString"]();
			var b = (document["$cdc_asdjflasutopfhvcZLmcfl_"] ? 1 : 0)["toString"]();
			var M = (document["__webdriver_script_fn"] ? 1 : 0)["toString"]();
			var C = (window["webdriver"] ? 1 : 0)["toString"]();
			var I = (window["domAutomation"] ? 1 : 0)["toString"]();
			var T = (window["Buffer"] ? 1 : 0)["toString"]();
			var S = (window["emit"] ? 1 : 0)["toString"]();
			var L = (window["spawn"] ? 1 : 0)["toString"]();
			var E = [L, S, T, I, C, M, b, y, w, p, g, m, l, h]["join"]("");
			E = parseInt("000000000000000000" + E, 2);

			var msg = [22, 1, 0, 0, bsi4(E)];
			msg = make_array(msg);
			addmsg(msg);
		}


		function get_browser_info(){
			var ua = navigator["userAgent"]["toLowerCase"]();
			var ver;
			var type;
			var r;

			function guess(){
				if (typeof window["onhelp"] == "object") {
					//ie
					return "IExplorer";
				}
				else if(typeof window["chrome"] == "object"){
					//chrome
					return "Chrome";
				}
				else if(typeof window["InstallTrigger"] == "object"){
					//firefox
					return "Firefox";
				}
				else if (typeof window["Opera"] == "object") {
					//opera
					return "Opera";
				}
				else{
					return "An unknown browser";
				}
			}

			if(r = ua["match"](new RegExp("maxthon[\\/ ]([\\d.]+)", "i"))){
				type = 14; 
				ver = r[1];
			}
			else if(r = ua["match"](new RegExp("msie.*360se", "i"))){
				type = 5;
				ver = -1;
			}
			else if(r = ua["match"](new RegExp("msie.*360ee", "i"))){
				type = 6;
				ver = -1;
			}
			else if(r = ua["match"](new RegExp("msie.*alibrowser ([\\d.]+)", "i"))){
				type = 7;
				ver = r[1];
			}
			else if(r = ua["match"](new RegExp("chrome.*taobrowser\\/([\\d.]+)", "i"))){
				type = 8;
				ver = r[1];
			}
			else if(r = ua["match"](new RegExp("se ([\\d]+.[\\w]*) metasr ([\\d.]+)", "i"))){
				type = 9;
				ver = r[1];
			}
			else if(r = ua["match"](new RegExp("msie.*qihu theworld", "i"))){
				type = 10;
				ver = -1;
			}
			else if (r = ua["match"](new RegExp("tencenttraveler ([\\d.]+)", "i"))) {
				type = 11;
				ver = r[1];
			}
			else if(r = ua["match"](new RegExp("qqbrowser\\/([\\d.]+)", "i"))){
				type = 12;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("msie ([\\d.]+)", "i"))) {
				type = 1;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("firefox\\/([\\d.]+)", "i"))) {
				type = 3;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("Opera.+Version\\/([\\d.]+)", "i"))) {
				type = 4;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("opr\\/([\\d.]+)", "i"))) {
				type = 4;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("version\\/([\\d.]+).*safari", "i"))) {
				type = 13;
				ver = r[1];
			}
			else if (r = ua["match"](new RegExp("chrome\\/([\\d.]+)", "i"))) {
				type = 2;
				ver = r[1];
			}
			else{
				type = 0;
				ver = -1;	
			}

			if (ver == -1) {
				ver = "an unknown version";
			}
			else{
				ver = ver["split"](".")[0];
			}

			return [type, ver];
		}


		function send_browser_msg(){

			var w = bss(navigator["userAgent"]);

			var msg = [2, 1, 0, 0, bsi2(w.length), w];

			msg = make_array(msg);
			addmsg(msg);
		}



		function send_location_msg(){

			var refer = document["referrer"] || "";
			var msg = [11, 1, 0, 0, bsi2(encodeURI(window["location"]["toString"]())["length"]), bsi2(encodeURI(refer["toString"]()).length), bss(encodeURI(window["location"]["toString"]())), bss(encodeURI(refer["toString"]()))];
			msg = make_array(msg);

			addmsg(msg);
		}


		function send_screen_msg(){
			var top = window["mozInnerScreenY"] || window["screenTop"];
			var left = window["mozInnerScreenX"] || window["screenLeft"];

			if (typeof top == "undefined") {
				top = 0;
			}

			if (typeof left == "undefined") {
				left = 0;
			}

			var cw = document["body"]["clientWidth"];
			var ch = document["body"]["clientHeight"];
			var sw = window["screen"]["width"];
			var sh = window["screen"]["height"];
			var saw = window["screen"]["availWidth"];
			var sah = window["screen"]["availHeight"];

			var S;
			var L;

			if (typeof window["outerWidth"] == "number") {
				S = undefined;
			}
			else{
				S = -1;
			}

			if (typeof window["outerHeight"] == "number") {
				L = undefined;
			}
			else{
				L = -1;
			}


			var msg = [3, 1, 0, 0, bsi4(top), bsi4(left), bsi4(cw), bsi4(ch), bsi4(sw),  bsi4(sh), bsi4(saw), bsi4(sah)];

			msg = make_array(msg);

			addmsg(msg);
		}


		var tr = true;

		function trap(){
			if (tr) {
				throw init_window_param(window);
			}
		}

		function format(ts){
			var s = "";
			var v = ts.toString(16);
			for(var i = v.length; i > 0; i-=4){
				s = s + String.fromCharCode("0x" + v["substring"](i-4, i));
			}

			return s;
		}

		function deformat(t){
			var s = t + "";
			var f = 4;
			var u = "";

			for(var v = s["length"] -1; v >= 0; v--){
				for(var d = s["charCodeAt"](v)["toString"](16);d["length"] != 4; )
					d = "0" + d;
				u = u + "" + d;
			}

			return parseInt(u, 16);
		}		


		var ts_array;

		//CC
		function send_trap_msg(r){
			var s = (new Date())["getTime"]();

			ts_array["push"](format(s));

			if(ts_array.length > 1){
				var duration = s - deformat(ts_array[ts_array.length - 2]);

				if (duration > 5000) {
					var msg = [20, 1, 0, 0, 1, bsi4(duration), bsi8(s), r.length, bss(r)];
					msg = make_array(msg);
					addmsg(msg);
					trap();
				}
			}

			return true;
		}

		function checkdebug(){
			return window["console"]&&(window["console"]["firebug"]||window["console"]["exception"]?
			 2: "__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE" in window ? 4 : "console" in window && "onhelp" in window ?
			  4 : window["outerHeight"] && window["innerHeight"] && window["outerHeight"] - window["innerHeight"] > 200 ? 8 : 1)
		}

		var sendinit = 0;
		var start_ts = (new Date()).getTime(); 
		var debug = 0;
		var funcsig = "accountguard@AnyDevice";
		var iI;
		
		function domload_callback(ob){
			if (sendinit == 0) {
				sendinit = 1;

				prepareparam();

				var e = ob || window["event"];

				send_start_msg();
				send_debug_msg(debug, funcsig);	

				var msg = [1, 1, 0, 0, bsi8(start_ts)];
				msg = make_array(msg);
				addmsg(msg);

				send_trap_msg("1");

				if (config["BrowserInfo"]) {
					send_browser_msg();
				}

				send_trap_msg("2");

				if ((config["SendMethod"] & 1) > 0 || (config["SendMethod"] & 8) > 0) {
					var msg = [12, 1, 0, 0, (config["TokenStr"] || [])["length"], bss(config["TokenStr"])];
					msg = make_array(msg);
					addmsg(msg);
				}

				send_trap_msg("19");

				if (config["Location"]) {
					send_location_msg();
				}

				send_trap_msg("11");

				if (config["ScreenInfo"]) {
					send_screen_msg();
				}

				send_trap_msg("13");

				send_emulator_msg(e);
			}
		}

		var mc = function (){

			function dom_loaded(){
				if (b) {
					return true;
				}

				b = true;

				if (timer) {
					clearInterval(timer);
				}

				var t = cb_array;

				if (t["length"]) {
					cb_array = [];
					for (var i = 0; i < t.length; i++) {
						t[i](document);
					}
				}
			}

			function add_callback(cb){
				if (b) {
					cb(document);
				}else{
					cb_array["push"](cb);
				}	
			}

			var b = false;
			var timer;
			var cb_array = [];
			var f,c;

			if (typeof window !== "undefined" && window["document"]) {
				if (window["document"]["addEventListener"]) {
					window["document"]["addEventListener"]("DOMContentLoaded", dom_loaded, false);
					window["addEventListener"]("load", dom_loaded, false);
				}
				else if (window["attachEvent"]) {
					window["attachEvent"]("onload", dom_loaded);
					f = document["createElement"]("div");
					c = window["frameElement"] === null;

					if (f["doScroll"] && c && window["external"]) {
						timer = setInterval(function(){
							f["doScroll"]();
							dom_loaded();
						}, 30);
					}
				}

				if (window["document"]["readyState"] === "complete") {
					dom_loaded();
				}
			}

			return add_callback;
		}();

		function myrandom(e) {
			for (var n = ""; n.length < e; )
				n += Math.random().toString().substr(2);
			return n.substring(n.length - e);
		}		

		function get_cookie(e){
		    var n, t = "", r = document["getElementById"]("JSdev");
		    if (r && !t)
		        try {
		            n = r.getsid() || "",
		            t = n
		        } catch (o) {}
		    try {
		        window["localStorage"] && !t && (n = localStorage[e] || "",
		        t = n)
		    } catch (o) {}
		    if (window["navigator"]["cookieEnabled"] && !t) {
		        var i = document["cookie"]["indexOf"](e + "=");
		        if (-1 != i) {
		            i += e.length + 1;
		            var a = document["cookie"]["indexOf"](";", i);
		            -1 == a && (a = document["cookie"]["length"]),
		            n = decodeURIComponent(document["cookie"]["substring"](i, a)) || "",
		            t = n
		        }
		    }

		    return t;
		}

		function get_devid(){

			var uid = get_cookie("sid");

			if (!uid) {
				uid = (new Date)["getTime"]() + myrandom(11);
			}

			return uid;
		}

		function reload(){
			start_ts = (new Date()).getTime(); //sendTokenMsg
			zi = 0; //mousemove
			Ni = 0; //mousemove
			qi = 0; //mousedown
			Xi = 0; //keydown
			Zi = 0; //mousefocus
			rI = 0; //mousemove
			sendinit = 0; //domload_callback
			init_config();
			domload_callback();
		}

		var config = {};

		function init_config(){
			config["TouchStart"] = 1;
			config["EnableKSLog"] = 1;
			config["EnableMCLog"] = 1;
			config["EnableMPLog"] = 1;
			config["FlashInfo"] = 1;
			config["FocusInfo"] = 1;
			config["Location"] = 1;
			config["BrowserInfo"] = 1;
			config["ScreenInfo"] = 1;
			config["LogTimeInterval"] = 1;
			config["LogVal"] = "ua_log";
			config["GPInterval"] = 50;
			config["GetAttrs"] = ["href", "src"];
			config["GyroScope"] = 1;
			config["MPInterval"] = 50;
			config["MaxFocusLog"] = 10;
			config["MaxGPLog"] = 5;
			config["MaxKSLog"] = 20;
			config["MaxMCLog"] = 20;
			config["MaxMPLog"] = 20;
			config["MaxTCLog"] = 20;
			config["SendInterval"] = 20;
			config["SendMethod"] = 3;
			config["SendTimer"] = 1000;

			config["ExTarget"] = ["pwdid"];
			config["loginform"] = "loginform";

			//需要修改 如果devid存在 不重新加载devid
			config["Token"] = window["hwcap"]["Token"];
			config["TokenStr"] = window["hwcap"]["Token"];
			config["scene"] = "login";
		}

		function init_window_param(w){
			var C={};
			C["touchstart"] = touchstart;
			C["touchmove"] = touchmove;
			C["deviceorientation"] = deviceorientation;
			C["mousedown"] = mousedown;
			C["keydown"] = keydown;
			C["mousemove"] = mousemove;
			C["focus"] = mousefocus;
			C["blur"] = mousefocus;
			C["load"] = domload_callback;
			C["beforeunload"] = unload;
			C["unload"] = unload;

			function setEventListener(eventname, ob){
				if (w["DeviceMotionEvent"] && eventname == "deviceorientation") {
					w["addEventListener"]("deviceorientation", C["deviceorientation"], true);
				}

				if (eventname == "focus") {
					if (ob["attachEvent"]) {
						ob["attachEvent"]("onfocusin", C["focus"],false);
					}
					else{
						ob["addEventListener"]("focus", C["focus"], true);
					}
				}
				else{
					if (eventname == "blur") {
						if (ob["attachEvent"]) {
							ob["attachEvent"]("onfocusout", C["blur"], false);
						}
						else{
							ob["addEventListener"]("blur", C["blur"], true);
						}
					}
					else{
						if (ob["attachEvent"]) {
							ob["attachEvent"]("on" + eventname, C[eventname], false);
						}
						else{
							ob["addEventListener"](eventname, C[eventname], false);
						}
					}
				}
			}

			if (config["GyroScope"]) {
				setEventListener("deviceorientation", document);
			}

			if (config["TouchStart"]) {
				setEventListener("touchstart", document);
				setEventListener("touchmove", document);
			}

			if (config["EnableMCLog"]) {
				setEventListener("mousedown", document);
			}

			if (config["EnableKSLog"]) {
				setEventListener("keydown", document);
			}

			if (config["EnableMPLog"]) {
				setEventListener("mousemove", document);
			}

			if(config["FocusInfo"]){
				setEventListener("focus", document);
				setEventListener("blur", document);
			}

			if ((config["SendMethod"] & 2) > 0) {
				if (typeof window["onbeforeunload"] != "undefined") {
					setEventListener("beforeunload", window);
				}

				if (typeof window["onunload"] != "undefined") {
					setEventListener("unload", window);
				}
			}

		}	


		function initparam(){
			window["__hw"] = true;
			window["hwcap"] = {};
			window["hwcap"]["Token"] = get_devid();
			init_config();
			init_window_param(window);
			window["hwcap"]["reload"] = reload;
		}

		initparam();
		mc(domload_callback);				
	}

	fingerprint();
	guard();

