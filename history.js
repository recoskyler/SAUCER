function makeUL(array) {
    var list = document.createElement('ul');
    list.className = "historyList";

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a');

        item.className = "historyItem";
        link.className = "historyLink";

        console.log(array[i]);

        link.href = "https://nhentai.net/g/" + array[i] + "/";
        link.target = "_blank";

        link.appendChild(document.createTextNode(array[i]));
        item.appendChild(link);
        list.appendChild(item);
    }

    return list;
}

function clearHistory() {
    chrome.storage.local.set({'history': JSON.stringify([])}, function() {location.reload();});
}

chrome.storage.local.get({history : "[]"}, function (res) {
    console.log(JSON.parse(res.history));

    if (res.history == "") {
        return;
    }

    document.getElementById('main').appendChild(makeUL(JSON.parse(res.history)));
});

document.getElementById("clr").onclick = clearHistory;