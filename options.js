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
	elements.status.innerText = "Testing, please wait..."
	var kodi = new Kodi(elements.url.value, elements.username.value, elements.password.value);
	kodi.getVersion(function(version){
		elements.status.innerText = version ? "Successfully connected to " + version : "ERROR :-(";
	});
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
