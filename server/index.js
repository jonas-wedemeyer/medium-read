const dotenv = require('dotenv');

const app = require('./app');
const db = require('./db');

dotenv.config({path: './.env'});

const port = process.env.PORT;

db.connect('mongodb://localhost:27017/articles', { useNewUrlParser: true, new: true }, (err) => {
  if (err) console.log('An error occured while connecting to the database: ', err); // eslint-disable-line no-console
  else console.log('Connection to the database has been established.'); // eslint-disable-line no-console
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on this ${port}.`);
});
