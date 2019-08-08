const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router');
const { errorHandling } = require('./middlewares/errorHandling');

const app = new Koa();

app
  .use(errorHandling)
  .use(cors())
  .use(bodyparser())
  .use(router.routes());

module.exports = app;