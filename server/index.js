const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on this ${port}.`);
});
