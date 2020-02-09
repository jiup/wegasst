function onLoaded() {
    // alert("Inject Done!");
    console.log("Wegasst Inject Done.");
    const items = document.getElementsByClassName("cell");
    for (let i = 0; i < items.length; i++) {
        items[i].style.border = "4px solid grey";
    }
    const itemBtns = document.getElementsByClassName("product-cell-add-to-cart");
    for (let i = 0; i < itemBtns.length; i++) {
        itemBtns[i].style.width = "101%";
    }
}

chrome.extension.sendMessage({}, function (response) {
    let readyStateCheckInterval = setInterval(function () {
        let prodCount = document.getElementsByClassName('cell').length;
        if (document.readyState === "complete" && prodCount > 2) {// && $("div.clearfix").length) {
            clearInterval(readyStateCheckInterval);
            onLoaded();
        }
    }, 1000);
});