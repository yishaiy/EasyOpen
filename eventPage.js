chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		if (message.action == "create") {
			chrome.tabs.create({url: message.url, selected: false});
		} else if (message.action == "update") {
			chrome.tabs.update({url: message.url});
		}
	}
);