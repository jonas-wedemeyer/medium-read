// Request article information from contentscript & inject it into the popup.html
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, (res) => {
    document.getElementById('title').innerHTML = res.title;
  });
});

// Post an article
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('article-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, ({ title, description, image, url }) => { // eslint-disable-line max-len
        fetch('http://localhost:4000/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            description,
            image,
            url,
          }),
        })
          .then(res => res.json())
          .then(article => console.log(article)) // Will be used to display success message
          .catch(err => console.log(err.message));
      });
    });
  });
});
