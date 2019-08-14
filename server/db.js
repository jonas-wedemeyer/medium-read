const db = require('mongoose');

db.connect('mongodb://localhost:27017/articles', { useNewUrlParser: true, new: true }, (err) => {
  if (err) console.log('An error occured while connecting to the database: ', err); // eslint-disable-line no-console
  else console.log('Connection to the database has been established.'); // eslint-disable-line no-console
});

module.exports = db;
