const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router');

const port = 4000;

const app = new Koa();

app
  .use(cors())
  .use(bodyparser())
  .use(router.routes());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on this ${port}.`);
});
