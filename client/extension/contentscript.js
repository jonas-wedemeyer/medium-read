// Storage for article information
let articleInfo = {};

// Function for getting the required information about the article leveraging og mark up
function getArticleInfo() {
  return [...document.querySelectorAll('meta[property*="og:"]')].reduce((acc, el) => {
    const prop = el.attributes.property.value.split(':')[1];
    acc[prop] = el.attributes.content.value;
    return acc;
  }, {});
}

// Retrieving articleInfo upon message from background.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.updatedTab) articleInfo = getArticleInfo();
});

// Sending articleInfo upon receiving notification from popup.js
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.getArticle) sendResponse(articleInfo);
});
