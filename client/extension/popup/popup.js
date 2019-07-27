// Request article information from contentscript & inject it into the popup.html
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, (res) => {
    document.getElementById('title').innerHTML = res.title;
  });
});
