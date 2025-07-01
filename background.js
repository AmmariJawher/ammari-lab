// Called when extension is installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Enable and send messages when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.includes("en.alibaba.com")) {
    // Enable the side panel for this tab
    chrome.sidePanel.setOptions({
      tabId: tabId,
      path: "sidepanel.html",
      enabled: true
    });

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
    });
  }
});
