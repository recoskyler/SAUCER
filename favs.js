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

chrome.storage.local.get({favs : "[]"}, function (res) {
    console.log(JSON.parse(res.favs));

    if (res.favs == "") {
        return;
    }

    document.getElementById('main').appendChild(makeUL(JSON.parse(res.favs)));
});