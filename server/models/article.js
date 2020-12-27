const db = require('../db');

const { Schema } = db;
const articleSchema = new Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  date_added: Date,
  completed: Boolean,
  deleted: Boolean,
}, { versionKey: false });

const Article = db.model('Article', articleSchema);


module.exports = Article;
