const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  googleId: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
});

module.exports = model('User', usersSchema);
