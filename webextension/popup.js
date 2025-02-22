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
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab) {

                
                URL = tab.url;

                chrome.runtime.sendMessage({data : URL}, (response) => { 
                    console.log(response);
                });

                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['background.js']
                    // send arguemnts through here 
                    // potentiall receive feedback from test.js file
                })

                .then(() => {
                    console.log("Script executed successfully");
                })
            }
        });
        getJobButton.dataset.listenerAttached = true;
    }
});