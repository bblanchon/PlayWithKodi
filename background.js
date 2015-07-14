chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "set_videos") {
		chrome.browserAction.setBadgeText({
			"text": request.videos.length.toString(),
			"tabId": sender.tab.id
		});		
		chrome.browserAction.setBadgeBackgroundColor({"color":"#31afe1"});
	}
});

