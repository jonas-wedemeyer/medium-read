const mongoose = require('mongoose');

const { Schema } = mongoose;
const articleSchema = new Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  date_added: Date,
  completed: Boolean,
  deleted: Boolean,
}, { versionKey: false });

const Article = mongoose.model('Article', articleSchema);


module.exports = Article;
