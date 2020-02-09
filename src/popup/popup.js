// function popup() {
//     alert("This is the Link : ( " + document.URL + " )");
// }

function switchStatus() {
    const data = localStorage.getItem('status');
    if (data) {
        if (data === 'off') {
            const data0 = localStorage.getItem('uid');
            if (data0 && 'user_exists') {
                localStorage.setItem('status', 'on');
                chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                    const code = 'window.location.reload();';
                    chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
                });
            } else {
                localStorage.removeItem('uid');
                alert("User not found! Please bind your membership card first.");
                chrome.runtime.openOptionsPage();
            }
            document.getElementById("status").className = "activated";
            document.getElementById("btn").innerHTML = "Deactivate";
        } else {
            if (data !== 'on') {
                alert('Data corrupted. (invalid status)');
            }
            localStorage.setItem('status', 'off');
            chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                const code = 'window.location.reload();';
                chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
            });
            document.getElementById("status").className = "deactivated";
            document.getElementById("btn").innerHTML = "Activate";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementsByTagName("button")[0];
    btn.addEventListener('click', switchStatus);

    const data = localStorage.getItem('status');

    if (!data) {
        const data0 = localStorage.getItem('uid');
        if (data0 && 'user_exists') {
            localStorage.setItem('status', 'on');
        } else {
            localStorage.removeItem('uid');
            alert("User not found! Please bind your membership card first.");
            chrome.runtime.openOptionsPage();
        }
        document.getElementById("status").className = "activated";
        document.getElementById("btn").innerHTML = "Deactivate";
    } else {
        if ('on' === data) {
            document.getElementById("status").className = "activated";
            document.getElementById("btn").innerHTML = "Deactivate";
        } else {
            document.getElementById("status").className = "deactivated";
            document.getElementById("btn").innerHTML = "Activate";
        }
    }
});