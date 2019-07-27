const Article = require('../models/article');

exports.getArticles = async (ctx) => {
  try {
    const articles = await Article.find();
    ctx.status = 200;
    ctx.body = articles;
  } catch (err) {
    console.log('An error occured while retrieving the articles: ', err.message); // eslint-disable-line no-console
    ctx.status = 500;
    ctx.body(err.message);
  }
};

exports.postArticle = async (ctx) => {
  try {
    const article = {
      ...ctx.request.body,
      date_added: new Date(),
      completed: false,
      deleted: false,
    };
    ctx.body = await Article.create(article);
    ctx.status = 201;
  } catch (err) {
    console.log('An error occured while storing an article: ', err.message); // eslint-disable-line no-console
    ctx.status = 500;
    ctx.body = err.message;
  }
};
