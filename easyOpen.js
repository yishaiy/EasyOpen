var action_links = new Array;

function init_action_links(links)
{
	var nums = "1234567890";
	var shift_nums = "!@#$%^&*()";
	
	links = links.slice(0, 10);

	var n, sn, link, action;

	for (var i = 0; i < links.length; i++)
	{
		link = links[i];
		n = nums[i];
		sn = shift_nums[i];

		link.innerHTML = n + '. ' + link.innerHTML;

		action_links.push({character: n, url: link.href, action: "create"});
		action_links.push({character: sn, url: link.href, action: "update"});
	}
}

function search_results()
{
	var links = document.getElementsByTagName('a');
	links = Array.prototype.slice.call(links);

	links = links.filter(function (link) {
		var class_name = link.className.toLowerCase();

		return ((class_name.search('result') != -1) && (class_name.search('title') != -1));
	});

	return links;
}


function send_open_message(actionLink) {
	chrome.runtime.sendMessage({action: actionLink.action, url: actionLink.url});
}


(function () {
	var url = window.location.href;

	if (url.search('/search') != -1 && url.search('q=') != -1)
	{
		init_action_links(search_results());

		document.addEventListener("keypress", function (keypressed) {
			if (document.getElementById('search_input') != document.activeElement)
			{
				var ch = keypressed.key;

				var result = action_links.find(function (actionLink) { return actionLink.character == ch; });

				if (result != undefined) {
					send_open_message(result);
				}
			}
		});
	}
})();