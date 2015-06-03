var kodi;
var elements;
var storageArea = chrome.storage.local;
storageArea.get(["url","username","password"], function(items) {
	kodi = new Kodi(items.url, items.username, items.password);
});

function play(url) {
	kodi.play(url, function(response) {
			elements.statusContent.innerHTML = response;
			elements.statusOverlay.classList.remove("hidden");
			window.setTimeout(function() {
					elements.statusOverlay.classList.add("hidden");
				}, 5000);
		});
}

function onVideoLinkClick(event) {
	play(event.target.href);
}

function onPlayUrlClick() {
	play(elements.url.value);
}

function setVideos(videos) {
	var list = document.getElementById("videos");

	for(var i=0; i<videos.length; i++) {
		var item = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.href = videos[i];
		anchor.innerText = videos[i];
		anchor.addEventListener("click", onVideoLinkClick);
		item.appendChild(anchor)
		list.appendChild(item);
	}
}

function onLoad() {
	elements = {
		play: document.getElementById("play"),
		statusContent: document.getElementById("status-content"),
		statusOverlay: document.getElementById("status-overlay"),
		url: document.getElementById("url")
	};
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,"get_videos", setVideos);
    });
    elements.play.addEventListener("click", onPlayUrlClick);
}

window.addEventListener('DOMContentLoaded', onLoad);
