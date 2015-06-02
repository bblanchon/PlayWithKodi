chrome.runtime.sendMessage("show_page_action");

function findVideos() {
	var videos = document.getElementsByTagName("video");
	var result = [];
	for(var i=0; i<videos.length; i++) {
		var video = videos[i];
		if (video.src) result.push(video.src);
		var sources = video.getElementsByTagName("source");
		for(var j=0; j<sources.length; j++) {
			result.push(sources[j].src);
		}
	}
	return result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "get_videos") {
		sendResponse(findVideos());
	}
});
