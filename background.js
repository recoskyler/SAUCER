// background.js

var contextMenuItem = {
    "id" : "openSauce",
    "title" : "OPEN SAUCE",
    "contexts" : ["selection"],
    "visible" : true
}

var code = "";

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function getCode() {
    code = "";

	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		var surl = tabs[0].url.split("/");
	
		if (surl.length >= 4) {
			if (surl[2] == "nhentai.net" && surl[3] == "g") {
                code = surl[4];
            }
        }

        chrome.browserAction.setBadgeText({text:code});
    });
}

getCode();

chrome.contextMenus.create(contextMenuItem);
chrome.browserAction.setTitle({title: "SAUCER"});
chrome.browserAction.setBadgeText({text:code});

//chrome.storage.local.remove('favs', function() {alert("ok")});
//chrome.storage.local.remove('history', function() {alert("ok")});

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "openSauce" && clickData.selectionText) {
        if (isInt(clickData.selectionText) && clickData.selectionText.length >= 1 && parseInt(clickData.selectionText, 10) > 0) {
            var sauceURL = "https://nhentai.net/g/" + clickData.selectionText + "/";
            chrome.tabs.create({ url: sauceURL });
        }
    }
});

document.addEventListener("selectionchange", function() {
    alert(window.getSelection());

    if(isInt(window.getSelection()) && window.getSelection().length >= 1 && parseInt(window.getSelection(), 10) > 0) {
        chrome.contextMenus.update("openSauce", {"visible": true, "title" : "OPEN SAUCE", "contexts" : "selection"});
    } else {
        chrome.contextMenus.update("openSauce", {"visible": false, "title" : "OPEN SAUCE", "contexts" : "selection"});
    }
});

chrome.tabs.onActiveChanged.addListener(function(activeInfo, tabId) {
    getCode();
});

