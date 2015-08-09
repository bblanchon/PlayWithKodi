chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "set_videos") {
    var badge =
        request.videos.length > 0 ? request.videos.length.toString() : '';
    chrome.browserAction.setBadgeText({"text": badge, "tabId": sender.tab.id});

    chrome.browserAction.setBadgeBackgroundColor({"color": "#31afe1"});
  }
});
