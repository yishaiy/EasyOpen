chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log('got message');
		if (message.action == "create") {
			chrome.tabs.create({url: message.url, selected: false});
		} else if (message.action == "update") {
			chrome.tabs.update({url: message.url});
		} else if (message.action == "design") {
			console.log('design message action');
			var popup_document = chrome.extension.getViews({type: "popup"})[0].document;
			var value = popup_document.querySelector('input[name="design"]:checked').value;
			
			sendResponse({design: value});
		}
	}
);