chrome.runtime.sendMessage("show_page_action");


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "get_videos") {
		sendResponse([
			{
				"title": "coucou",
				"href": "http://coucouc"
			}]);
	}
});
