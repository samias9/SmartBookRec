const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  grade: { 
    type: String, 
    enum: ['free', 'basic', 'premium'], 
    default: 'user', 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);
