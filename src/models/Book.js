 const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  genre: String,
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  bookUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema,"books");

module.exports = Book;
