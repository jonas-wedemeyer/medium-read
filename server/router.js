const router = require('koa-router')();
const controller = require('./controllers/controllers');

router.get('/articles', controller.getArticles);
router.get('/articles/:title', controller.findArticle);
router.post('/articles', controller.postArticle);
router.delete('/articles/:id', controller.deleteArticle);

module.exports = router;
