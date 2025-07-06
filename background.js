// Called when extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Enable and send messages when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = new URL(tab.url);
  if (changeInfo.status === "complete") {
    // Enable the side panel for this tab
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "sidepanel.html",
      enabled: true
    });
    
    // Send NEW message to content script
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      url: url,
    });
  }
});
