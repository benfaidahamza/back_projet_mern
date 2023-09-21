const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String
  }
}, { versionKey: false });

module.exports = mongoose.model('Users', UsersSchema, 'Users');

