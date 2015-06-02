var kodi;
var storageArea = chrome.storage.local;
storageArea.get(["url","username","password"], function(items) {
	kodi = new Kodi(items.url, items.username, items.password);
});

function setVideos(videos) {
	var list = document.getElementById("videos");

	for(var i=0; i<videos.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = "<a href='" + videos[i] + "'>" + videos[i] + "</a>";
		list.appendChild(item);
	}
}

function playUrl() {
	var url = document.getElementById("url").value;
	kodi.play(url);
}

function onLoad() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,"get_videos", setVideos);
    });
    document.getElementById("play").addEventListener("click", playUrl);
}

window.addEventListener('DOMContentLoaded', onLoad);
