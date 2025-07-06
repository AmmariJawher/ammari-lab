// Called when extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Enable and send messages when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
<<<<<<< HEAD
  const url = new URL(tab.url);
  if (changeInfo.status === "complete") {
=======
  if (changeInfo.status === "complete" && tab.url && tab.url.includes("en.alibaba.com")) {
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
    // Enable the side panel for this tab
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "sidepanel.html",
      enabled: true
    });
<<<<<<< HEAD
    
    // Send NEW message to content script
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      url: url,
=======

    // Send NEW message to content script
    const url = new URL(tab.url);
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      baseUrl: url.origin,
    });
  } else if (changeInfo.status === "complete") {
    // Optionally send LIST message on other pages
    chrome.tabs.sendMessage(tabId, {
      type: "LIST",
      baseUrl: url.origin,
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
    });
  }
});
