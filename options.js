var storageArea = chrome.storage.local;
var elements;

function onSave() {	
	var items = {
		url: elements.url.value,
		username: elements.username.value,
		password: elements.password.value
	};
	storageArea.set(items, function() {
		elements.status.innerText = "Saved !"
	});
}

function onTest() {	
	var request = new XMLHttpRequest();
	var url = elements.url.value + "/jsonrpc";
	var params = {
		jsonrpc: "2.0",
		method: "Application.GetProperties",
		params: {
			properties: ["name", "version"]
		}, 
		id: 1
	};

	elements.status.innerText = "Testing, please wait..."
	request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
     		if(request.status == 200) {
     			var response = JSON.parse(request.responseText);
				elements.status.innerText = "Successfully connected to " + response.result.name + " " + response.result.version.major + "." + response.result.version.minor;
     		}
			else {
				elements.status.innerText = "ERROR :-(";
			}
		}
	};
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/json");	
	request.send(JSON.stringify(params));
}


function onLoad() {
	elements = {
		url: document.getElementById("url"),
		username: document.getElementById("username"),
		password: document.getElementById("password"),
		test: document.getElementById("test"),
		save: document.getElementById("save"),
		status: document.getElementById("status")
	};

	storageArea.get(["url","username","password"], function(items) {
		elements.url.value = items.url || "http://127.0.0.1:8080";
		elements.username.value = items.username || "kodi";
		elements.password.value = items.password || "";		
	});

	elements.save.addEventListener("click", onSave);
	elements.test.addEventListener("click", onTest);
}

document.addEventListener("DOMContentLoaded", onLoad);
