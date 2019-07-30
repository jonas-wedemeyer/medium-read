const router = require('koa-router')();
const controller = require('./controllers/controller');

router.get('/articles', controller.getArticles);
router.post('/articles', controller.postArticle);
router.delete('/articles/:id', controller.deleteArticle);

module.exports = router;
