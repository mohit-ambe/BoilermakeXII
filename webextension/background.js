importScripts("test.js");

chrome.runtime.onInstalled.addListener(() => {console.log("installed")}); 
chrome.runtime.onStartup.addListener(() => {console.log("started")});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.data) {

      funky(message.data)
      sendResponse("bomboclat")
    }  

    return true; 

  });
  

  