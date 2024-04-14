const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, minlength: 10, maxlength: 50},
  password: { type: String, required: true, minlength: 20, maxlength: 1000 },
  avatar: { type: String, required: true },
  phone: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
