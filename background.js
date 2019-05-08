// background.js

var contextMenuItem = {
    "id" : "openSauce",
    "title" : "SAUCE",
    "contexts" : ["selection"]
}

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "openSauce" && clickData.selectionText) {
        if (isInt(clickData.selectionText) && clickData.selectionText.length == 6) {
            var sauceURL = "https://nhentai.net/g/" + clickData.selectionText + "/";
            chrome.tabs.create({ url: sauceURL });
        }
    }
});