// red, yellow, green, blue
const colors = ["#b92929", "#faa828", "#56b947", "#00bcd4"];

function onLoaded() {
    const items = document.getElementsByClassName("cell");
    for (let i = 0; i < items.length; i++) {
        items[i].style.border = "4px solid #999";
    }
    const itemButtons = document.getElementsByClassName("product-cell-add-to-cart");
    for (let i = 0; i < itemButtons.length; i++) {
        itemButtons[i].style.width = "101%";
    }
}

chrome.extension.sendMessage({}, function (response) {
    let readyStateCheckInterval = setInterval(function () {
        let prodCount = document.getElementsByClassName('cell').length;
        if (document.readyState === "complete" && prodCount > 2) {
            clearInterval(readyStateCheckInterval);
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function (response) {
                console.log(response.data);
                if (response.data === 'on') {
                    console.log("Wegasst Inject Done.");
                    onLoaded();
                } else {
                    console.log("Wegasst Off.");
                }
            });
        }
    }, 1000);
});