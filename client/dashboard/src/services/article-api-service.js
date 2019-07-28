const artcileEndpoint = 'http://localhost:4000/articles';

exports.getArticles = (state, stateSetter) => {
  fetch(artcileEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(articles => stateSetter([...state, ...articles]))
    .catch(err => console.log('An error occured while retrieving the article data: ', err.message)); // eslint-disable-line no-console
};
