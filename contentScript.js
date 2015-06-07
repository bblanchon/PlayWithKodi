chrome.runtime.sendMessage("show_page_action");

var youtubeRegex = /https:\/\/www\.youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9]+)/;
var youtubePluginUrl = "plugin://plugin.video.youtube/?action=play_video&videoid=$1";

function findYoutubeVideosInLocation(result) {
	var url1 = document.location.href;
	var url2 = url1.replace(youtubeRegex, youtubePluginUrl)
	if (url1 != url2) result.push(url2);
}

function findYoutubeVideosInIframes(result) {
	var iframes = document.getElementsByTagName("iframe");
	for(var i=0; i<iframes.length; i++) {
		var url1 = iframes[i].src;
		var url2 = url1.replace(youtubeRegex, youtubePluginUrl)
		if (url1 != url2) result.push(url2);
	}
}


function isBlobUrl(url) {
	return url.indexOf("blob:") == 0;
}

function findHtml5Videos(result) {
	var videos = document.getElementsByTagName("video");
	for(var i=0; i<videos.length; i++) {
		var video = videos[i];
		if (video.src && !isBlobUrl(video.src)) result.push(video.src);
		var sources = video.getElementsByTagName("source");
		for(var j=0; j<sources.length; j++) {
			if (!isBlobUrl(sources[j].src)) {
				result.push(sources[j].src);
			}
		}
	}
	return result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "get_videos") {
		var result = [];
		findHtml5Videos(result);
		findYoutubeVideosInLocation(result);
		findYoutubeVideosInIframes(result);
		sendResponse(result);
	}
});
