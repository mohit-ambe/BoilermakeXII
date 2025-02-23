chrome.runtime.onMessage.addListener(function (message) {
    document.getElementById('pagetitle').innerHTML = message;
    console.log(message);
});

document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settings");
    const getJobButton = document.getElementById("getJob");

    if (settingsButton && !settingsButton.dataset.listenerAttached) {
        settingsButton.addEventListener("click", function () {
            chrome.runtime.openOptionsPage();
        });
        settingsButton.dataset.listenerAttached = true;
    }

    if (getJobButton && !getJobButton.dataset.listenerAttached) {
        getJobButton.addEventListener("click", async () => {
            let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            if (tab) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id}, files: ['utilities.js']
                })
                    .then(() => {
                        console.log("Script executed successfully");
                    })
            }
        });
        getJobButton.dataset.listenerAttached = true;
    }
});