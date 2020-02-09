function switchStatus() {
    const data = localStorage.getItem('status');
    if (!data || data === 'off') {
        const data0 = localStorage.getItem('uid');
        if (data0 && 'user_exists') {
            localStorage.setItem('status', 'on');
            location.reload();
        } else {
            localStorage.removeItem('uid');
            location.reload();
        }
        document.getElementById("status").className = "activated";
        document.getElementById("activateBtn").innerHTML = "Deactivate";
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
        document.getElementById("activateBtn").innerHTML = "Activate";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById("activateBtn");
    btn.addEventListener('click', switchStatus);

    const data = localStorage.getItem('status');

    if (!data) {
        const data0 = localStorage.getItem('uid');
        if (!(data0 && 'user_exists')) {
            localStorage.removeItem('status');
            localStorage.removeItem('uid');
            alert("Please bind your membership card before activation.");
        } else {
            document.getElementById("status").className = "activated";
            document.getElementById("activateBtn").innerHTML = "Deactivate";
        }
    } else {
        if ('on' === data) {
            document.getElementById("status").className = "activated";
            document.getElementById("activateBtn").innerHTML = "Deactivate";
        } else {
            document.getElementById("status").className = "deactivated";
            document.getElementById("activateBtn").innerHTML = "Activate";
        }
    }

    let uid = localStorage.getItem("uid");
    let cTarget = localStorage.getItem("cTarget");
    if (uid) {
        document.getElementById('membershipId').value = uid;
        document.getElementById('uBtn').value = 'Logout';
    }
    if (cTarget) document.getElementById('cTarget').value = cTarget;

    document.getElementById('uBtn').addEventListener('click', function () {
        if (document.getElementById('uBtn').value === 'Logout') {
            localStorage.removeItem("status");
            localStorage.removeItem("uid");
            localStorage.removeItem("cTarget");
            location.reload();
            return false
        }
        let newUId = document.getElementById('membershipId').value;
        if (!newUId) {
            alert("ID cannot be empty!");
            return false;
        }
        localStorage.setItem('uid', newUId);
        alert("Membership Associated Successfully!");
        document.getElementById('uBtn').value = 'Logout';
    });
    document.getElementById('cBtn').addEventListener('click', function () {
        let newCTarget = document.getElementById('cTarget').value;
        if (!newCTarget) {
            alert("Your calories credit cannot be empty!");
            return false;
        }
        localStorage.setItem('cid', newCTarget);
        alert("Weekly Calories Credit Updated!");
    });
});