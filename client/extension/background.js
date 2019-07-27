// Informing contentscript about change in DOM to (re)fetch article information
chrome.webNavigation.onCompleted.addListener(({ frameId, tabId }) => {
  if (frameId === 0) chrome.tabs.sendMessage(tabId, { updatedTab: true });
});
