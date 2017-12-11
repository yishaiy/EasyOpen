var action_links = {};

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

        // Show shortcut key
        link.innerHTML = n + '. ' + link.innerHTML;

        // Add extension action
		action_links[n] = {url: link.href, action: "create"};
		action_links[sn] = {url: link.href, action: "update"};
	}
}

function rimon_search_results()
{
	var links = document.getElementsByTagName('a');
	links = Array.prototype.slice.call(links);

	links = links.filter(function (link) {
		var class_name = link.className.toLowerCase();

		return ((class_name.search('result') != -1) && (class_name.search('title') != -1));
	});

	return links;
}

function normal_search_results()
{
    var h3s = Array.prototype.slice.call(document.getElementsByTagName('h3'));
    var links = h3s.map(h3 => h3.getElementsByTagName('a')[0]);

    return links;
}

function search_results()
{
    var links = rimon_search_results();

    if (links.length == 0) {
        links = normal_search_results();
    }

    return links;
}


function send_open_message(actionLink) {
	chrome.runtime.sendMessage(actionLink);
}


(function () {
	init_action_links(search_results());

	document.addEventListener("keypress", function (keypressed) {
		if (document.activeElement.tagName.toLowerCase() === "input")
		{
			var ch = keypressed.key;

			var result = action_links[ch];

			if (result != undefined) {
				send_open_message(result);
			}
		}
	});
})();
