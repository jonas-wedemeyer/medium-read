const dotenv = require('dotenv');

const app = require('./app');
const db = require('./db');

dotenv.config({path: './.env'});

const port = process.env.PORT;
const dbURL = process.env.DB_URL;

(async function () {
  try {
    await db.connect(dbURL, { useNewUrlParser: true });
    console.log('Database connected.')
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
})();

