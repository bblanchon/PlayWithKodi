function setVideos(videos) {
	var list = document.getElementById("videos");

	for(var i=0; i<videos.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = "<a href='" + videos[i].href + "'>" + videos[i].title + "</a>";
		list.appendChild(item);
	}
}

function onLoad() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id,"get_videos", setVideos);
    });
}

window.addEventListener('DOMContentLoaded', onLoad);
