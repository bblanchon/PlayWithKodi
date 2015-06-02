function Kodi(url, username, password) {
	var performRequest = function(method, params, callback) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState != 4) return;
			callback(request.status==200 ? JSON.parse(request.responseText).result : undefined);
		};
		request.open("POST", url + "/jsonrpc", true);
		request.setRequestHeader("Content-type", "application/json");	
		request.send(JSON.stringify({
			jsonrpc: "2.0",
			method: method,
			params: params, 
			id: 1
		}));
	}

	this.getVersion = function(callback) {
		performRequest("Application.GetProperties", {properties:["name","version"]}, function(response) {
			callback(response && response.name + " " +response.version.major + "." + response.version.minor);
		});		
	}
}
