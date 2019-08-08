const Article = require('../models/article');

exports.getArticles = async (ctx) => {
  const articles = await Article.find();
  ctx.status = 200;
  ctx.body = { status: 'success', data: { articles } };
};

exports.findArticle = async (ctx) => {
  const { title } = ctx.params; // TODO: Refactor for url with encoded string
  const article = await Article.findOne({ title });
  if (!article) {
    ctx.status = 404;
    ctx.body = { status: 'fail', data: { article: 'Article doesn\'t exist' } }
  } else {
    ctx.status = 200;
    ctx.body = { status: 'success', data: { article } };
  }
};

exports.postArticle = async (ctx) => {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + 71);
  const article = {
    ...ctx.request.body,
    date_added: date,
    completed: false,
    deleted: false,
  };
  const newArticle = await Article.create(article);
  ctx.body = { status: 'success', data: { article: newArticle } };
  ctx.status = 201;
};

exports.deleteArticle = async (ctx) => {
  const { id } = ctx.params;
  const art = await Article.findByIdAndDelete(id);
  if (!art) {
    ctx.status = 404;
  } else { 
    ctx.body = { status: 'success', data: null };
    ctx.status = 200;
  }
};
