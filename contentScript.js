chrome.runtime.sendMessage("show_page_action");

function findVideos() 
{
	var _videos = {}

	var addVideo = function(url, title, type) {
		_videos[url] = { "url": url, "title": title, "type": type };
	}

	var getConfirmedVideos = function() {
		var result = [];
		for (var key in _videos) {
			var video = _videos[key];
			if (video.type) result.push(video);			
		}
		return result;
	}

	function findHtml5Videos() {
		var videos = document.getElementsByTagName("video");
		for(var i=0; i<videos.length; i++) {
			var video = videos[i];
			if (video.src && !isBlobUrl(video.src)) addVideo(video.src, video.src,  "html5");
			var sources = video.getElementsByTagName("source");
			for(var j=0; j<sources.length; j++) {
				if (!isBlobUrl(sources[j].src)) {
					addVideo(sources[j].src, sources[j].src,  "html5");
				}
			}
		}
	}

	function isBlobUrl(url) {
		return url.indexOf("blob:") == 0;
	}

	function findCandidateUrls() {
		addVideo(document.location.href, document.title);

		iframes = document.getElementsByTagName("iframe");
		for(var i=0; i<iframes.length; i++) addVideo(iframes[i].src);
		
		anchors = document.getElementsByTagName("a");
		for(var j=0; j<anchors.length; j++) addVideo(anchors[j].href, anchors[j].innerText);
	}

	function detectYoutubeVideos() {
		var youtubeRegex = /https:\/\/www\.youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9]+)/;

		for (var key in _videos) {
			var video = _videos[key];
			if (video.type) continue;
			var matches = youtubeRegex.exec(video.url);
			if (!matches) continue;
			var youtubeVideoId = matches[1];
			video.url = "plugin://plugin.video.youtube/?action=play_video&videoid=" + youtubeVideoId;
			video.type = "youtube";
			if (!video.title) video.title = "https://youtu.be/" + youtubeVideoId;
		}
	}

	findCandidateUrls();
	detectYoutubeVideos();
	findHtml5Videos();
	return getConfirmedVideos();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "get_videos") {
		var videos = findVideos();
		sendResponse(videos);
	}
});
