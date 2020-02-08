function popup() {
    alert("This is the Link : ( " + document.URL + " )");
}

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementsByTagName("button")[0];
    btn.addEventListener('click', popup);
});