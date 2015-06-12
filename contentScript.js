chrome.runtime.sendMessage("show_page_action");

var youtubeRegex = /https:\/\/www\.youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9]+)/;
var youtubePluginUrl = "plugin://plugin.video.youtube/?action=play_video&videoid=$1";

function findVideosInUrls(urls, videos) {
	for(var i=0;i<urls.length; i++) {
		var url = urls[i];

		var youtubeVideoUrl = url.replace(youtubeRegex, youtubePluginUrl)
		if (url != youtubeVideoUrl) videos.push(youtubeVideoUrl);
	}
}

function findUrlsInPage(videos) {
	videos.push(document.location.href);

	iframes = document.getElementsByTagName("iframe");
	for(var i=0; i<iframes.length; i++) videos.push(iframes[i].src);
	
	anchors = document.getElementsByTagName("a");
	for(var j=0; j<anchors.length; j++) videos.push(anchors[j].href);
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
		var videos = [];
		var urls = [];
		findHtml5Videos(videos);
		findUrlsInPage(urls);
		findVideosInUrls(urls, videos);
		sendResponse(videos);
	}
});
