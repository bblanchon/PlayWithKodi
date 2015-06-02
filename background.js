chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "show_page_action") {
		chrome.pageAction.show(sender.tab.id);
	}
});
