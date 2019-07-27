const router = require('koa-router')();
const controller = require('./controllers/controller');

router.get('/articles', controller.getArticles);
router.post('/articles', controller.postArticle);

module.exports = router;
