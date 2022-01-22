const mongoose = require('mongoose');

const { Schema, model } = mongoose

const postsSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  publicationDate: { type: String, required: true },
  lastUpdate: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: String },
  location: { type: String },
});

module.exports = model('Post', postsSchema);
