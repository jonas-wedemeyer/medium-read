const getCurrDomain = () => {
  return new Promise((res) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      res(tabs[0].url);
    });
  });
};

getCurrDomain()
    .then((domain) => domain
        .match(/:\/\/\w+/)
        .toString()
        .includes('medium')
            ? articleInfo() && postArticle()
            : displayNotOnMedium());

// Request article information from contentscript & inject it
const articleInfo = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, (res) => {
      document.getElementById('title').innerHTML = res.title;
    });
  });
};

// Post an article to the server
const postArticle = () => {
  document.getElementById('article-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, ({ title, description, image, url }) => { // eslint-disable-line max-len
        fetch('http://localhost:4000/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            image,
            url,
          }),
        })
            .then(res => res.status === 201 ? res.json() : console.log('Expected another HTTP status.')) // eslint-disable-line
            .then(() => displaySucessPage()) // TODO: Add title to succes page
            .catch((err) => console.log(err.message)); // TODO: Show an error page
      });
    });
  });
};

// Function for for showing the success page
const displaySucessPage = () => {
  document.getElementById('article-form').classList.add('hidden');
  document.getElementById('success-page').classList.remove('hidden');
};

// Function for displaying the pop for not being on Medium
const displayNotOnMedium = () => {
  document.getElementById('article-form').classList.add('hidden');
  document.getElementById('not-on-medium').classList.remove('hidden');
};
