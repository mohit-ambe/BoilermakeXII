document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("settings").addEventListener("click", function () {
        chrome.runtime.openOptionsPage();
    });

    document.getElementById("getJob").addEventListener("click", async () => {

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {console.log(tab.url);}
    });

    document.getElementById("pingmsg").addEventListener("click", function () {
        console.log("PINGED!");
    });

});
