const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn13: String,
  title: String,
  subtitle: String,
  authors: [String],
  categories: [String],
  thumbnail: String,
  description: String,
});

bookSchema.index({ authors: 1 });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
