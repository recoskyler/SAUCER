function makeUL(array) {
    var list = document.createElement('ul');
    list.className = "historyList_saucer";

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a');

        item.className = "historyItem_saucer";
        link.className = "historyLink_saucer";

        console.log(array[i]);

        link.href = "https://nhentai.net/g/" + array[i] + "/";
        link.target = "_blank";

        link.appendChild(document.createTextNode(array[i]));
        item.appendChild(link);
        list.appendChild(item);
    }

    return list;
}

chrome.storage.local.get({favs : "[]"}, function (res) {
    console.log(JSON.parse(res.favs));

    if (res.favs == "") {
        return;
    }

    document.getElementById('main_saucer').appendChild(makeUL(JSON.parse(res.favs)));
});