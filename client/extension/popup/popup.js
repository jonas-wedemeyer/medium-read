// Articles Endpoint
const articlesEndpoint = 'http://localhost:4000/articles';

// Request article information from contentscript & inject it
const getArticleInfo = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, (res) => {
        resolve(res);
      });
    });
  });
};

// Inject title into form
const injectTitle = (title) => {
  document.getElementById('title').innerHTML = title;
};

// Post an article to the server
// TODO: Refactor to use standalone function for retrieving article
const postArticle = () => {
  document.getElementById('article-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getArticle: true }, ({ title, description, image, url }) => { // eslint-disable-line max-len
        fetch(articlesEndpoint, {
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
            .then(res => res.status === 201 ? res.json() : console.log(`Expected a 200 , but received this: ${res.status}`)) // eslint-disable-line
            .then(() => displaySucessPage()) // TODO: Add title to succes page
            .catch((err) => console.log(err.message)); // TODO: Show an error page
      });
    });
  });
};

// Function for checking if the article has already been added
const findArticle = async (title) => {
  try {
    const res = await fetch(`${articlesEndpoint}/${encodeURIComponent(title)}`);
    return res.status >= 400 ? false : true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

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

// Function for displaying pop-up for article that already exits
const articleExists = () => {
  document.getElementById('article-form').classList.add('hidden');
  document.getElementById('article-exists').classList.remove('hidden');
}

// Wrapper Function
const existsWrapper = async (title) => {
  const result = await findArticle(title);
  console.log("This is the result from the wrapper:", result);
  return result;
}


// Logic

(async () => {
  try {
    const article = await getArticleInfo();
    // Determining if the page is Medium through og prop
    // instead of url due to Medium's custom url feature
    if (article && article.site_name === 'Medium') {
      const exist = await findArticle(article.title);
      if (!exist) {
        injectTitle(article.title);
        postArticle();
      } else articleExists();
    } else displayNotOnMedium();
  } catch (err) {
    console.log(err);
    alert('Something went wrong, retry!')
  }
})();