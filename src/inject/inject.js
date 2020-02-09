// red, yellow, green, blue
const colors = ["#b92929", "#faa828", "#56b947", "#00bcd4"];

function onLoaded() {
    // alert("Inject Done!");
    console.log("Wegasst Inject Done.");
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
            onLoaded();
        }
    }, 1000);
});