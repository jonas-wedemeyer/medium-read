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

exports.deleteOne = (state, stateSetter, id) => {
  fetch(`${artcileEndpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => stateSetter(state.filter(article => article._id !== id))) // eslint-disable-line 
    .catch(err => console.log('An error occured while deleting the article data: ', err.message)); // eslint-disable-line no-console
};
