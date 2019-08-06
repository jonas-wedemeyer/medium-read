const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app
  .use(cors())
  .use(bodyparser())
  .use(router.routes());

module.exports = app;