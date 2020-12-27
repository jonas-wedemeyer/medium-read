// Function for getting the required information about the article leveraging og mark up
function getArticleInfo() {
  return [...document.querySelectorAll('meta[property*="og:"]')].reduce((acc, el) => {
    const prop = el.attributes.property.value.split(':')[1];
    acc[prop] = el.attributes.content.value;
    return acc;
  }, {});
}

// Sending articleInfo upon receiving notification from popup.js
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.getArticle) sendResponse(getArticleInfo());
});
