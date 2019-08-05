var code = "";

getCode();

function oS() {
    if (document.getElementById("sauce_saucer").value != "") {
			chrome.storage.local.get({history : '[]'}, function (res) {
				var arr = JSON.parse(res.history);

				if (!arr.includes(document.getElementById("sauce_saucer").value)) {
					arr.push(document.getElementById("sauce_saucer").value);
				}

				chrome.storage.local.set({'history': JSON.stringify(arr)}, function () {
					var url = 'https://nhentai.net/g/' + document.getElementById("sauce_saucer").value;
					code = document.getElementById("sauce_saucer").value;
					chrome.browserAction.setBadgeText({text:code});
					window.open(url, '_blank');
				});
			});
    }
}

function addToFavs() {
	if (document.getElementById("sauce_saucer").value != "" && !isNaN(document.getElementById("sauce_saucer").value)) {
		chrome.storage.local.get({favs : '[]'}, function (res) {
			var arr = JSON.parse(res.favs);

			if (arr.includes(document.getElementById("sauce_saucer").value)) {
				return;
			}

			arr.push(document.getElementById("sauce_saucer").value);

			chrome.storage.local.set({'favs': JSON.stringify(arr)}, function () {checkColor();});
		})
    }
}

function remFromFavs() {
	if (document.getElementById("sauce_saucer").value != "" && !isNaN(document.getElementById("sauce_saucer").value)) {
		chrome.storage.local.get({'favs' : '[]'}, function (res) {
			var arr = JSON.parse(res.favs);

			if (!arr.includes(document.getElementById("sauce_saucer").value)) {
				return;
			}

			for( var i = 0; i < arr.length; i++){ 
				if ( arr[i] == document.getElementById("sauce_saucer").value) {
				  	arr.splice(i, 1); 
				}
			}

			chrome.storage.local.set({'favs': JSON.stringify(arr)}, function () {checkColor();});
		})
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      	textbox.addEventListener(event, function() {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
      	});
	});
}

function checkColor() {
	chrome.storage.local.get({favs : "[]"}, function (res) {
		var arr = JSON.parse(res.favs);

		if (arr.includes(document.getElementById("sauce_saucer").value)) {
			document.getElementById("atf_saucer").childNodes[0].nodeValue = "Remove From Favorites";
			document.getElementById("atf_saucer").onclick = remFromFavs;
			document.getElementById("atf_saucer").style.backgroundColor = "#b50000";
			document.getElementById("atf_saucer").style.cursor = "pointer";
		} else if (document.getElementById("sauce_saucer").value != "" && !arr.includes(document.getElementById("sauce_saucer").value)) {
			document.getElementById("atf_saucer").childNodes[0].nodeValue = "Add To Favorites";
			document.getElementById("atf_saucer").onclick = addToFavs;
			document.getElementById("atf_saucer").style.backgroundColor = "#ffa000";
			document.getElementById("atf_saucer").style.cursor = "pointer";
		} else {
			document.getElementById("atf_saucer").childNodes[0].nodeValue = "Add To Favorites";
			document.getElementById("atf_saucer").onclick = NaN;
			document.getElementById("atf_saucer").style.backgroundColor = "lightgray";
			document.getElementById("atf_saucer").style.cursor = "default";
		}
	});
}

function getCode() {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		var surl = tabs[0].url.split("/");
	
		if (surl.length >= 4) {
			if (surl[2] == "nhentai.net" && surl[3] == "g") {
				code = surl[4];
				document.getElementById("sauce_saucer").value = code;
				chrome.browserAction.setBadgeText({text:code});
			}
		}
	});
}

document.getElementById("sauce_saucer").addEventListener("keydown", function(event) {
	if (event.which === 13) {
		console.log("ENTER");
		oS();
	} else {
		console.log("COLOR");
		checkColor();
	}
});

document.getElementById("sauce_saucer").addEventListener("focus", function(event) {
	if (document.getElementById("sauce_saucer").value == code) {
		document.getElementById("sauce_saucer").value = "";
		checkColor();
	}
});

setInputFilter(document.getElementById("sauce_saucer"), function(value) {
	return /^\d*$/.test(value);
});

document.getElementById("atf_saucer").style.backgroundColor = "lightgray";
document.getElementById("openSauce_saucer").onclick = oS;
document.getElementById("sauce_saucer").value = code;
checkColor();