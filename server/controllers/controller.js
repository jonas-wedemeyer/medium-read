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

exports.findArticle = async (ctx) => {
  try {
    const { title } = ctx.params; // TODO: Refactor for url with encoded string
    const article = await Article.findOne({ title });
    if (!article) {
      ctx.status = 404;
    } else {
      ctx.status = 200;
      ctx.body = article;
    }
  } catch (err) {
    console.log('An error occured while retrieving an article: ', err.message); // eslint-disable-line no-console
    ctx.status = 500;
    ctx.body = err.message;
  }
};

exports.postArticle = async (ctx) => {
  try {
    const date = new Date(Date.now());
    date.setHours(date.getHours() + 71);
    const article = {
      ...ctx.request.body,
      date_added: date,
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

exports.deleteArticle = async (ctx) => {
  try {
    const { id } = ctx.params;
    await Article.findByIdAndDelete(id);
    ctx.status = 200;
  } catch (err) {
    console.log('An error occured in  :', err.message); // eslint-disable-line no-console
    ctx.status = 500;
    ctx.body = err.message;
  }
};
