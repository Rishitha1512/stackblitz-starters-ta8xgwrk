const mongoose = require('mongoose');

// Define the comment schema first because it is referenced inside the blogPostSchema
const commentSchema = new mongoose.Schema({
  username: { // Username of the commenter
    type: String,
    required: true,
  },
  message: { // The comment text.
    type: String,
    required: true,
  },
  commentedAt: { // Automatically records the comment creation time.
    type: Date,
    default: Date.now,
  },
});

// Define the blog post schema
const blogPostSchema = new mongoose.Schema({
  title: { // Serves as the title of the blog post.
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  content: { // The main content of the blog post
    type: String,
    required: true,
    minlength: 50,
  },
  author: { // Username of the author.
    type: String,
    required: true,
  },
  tags: { // Optional field for storing tags or keywords related to the post
    type: [String],
    default: [],
  },
  category: { // Indicates the post category
    type: String,
    default: 'General',
  },
  likes: { // Stores usernames of users who liked the post.
    type: [String],
    default: [],
  },
  comments: {
    type: [commentSchema], // Embedding comment subdocuments inside blog post
    default: [],
  },
  createdAt: { // Automatically records the post creation time.
    type: Date,
    default: Date.now,
  },
  updatedAt: { // Automatically updated on modifications.
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Export the blog post schema as the model
module.exports = mongoose.model('BlogPost', blogPostSchema);
