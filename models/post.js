const mongoose = require('mongoose');

const post_schema = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorID: { type:String, required: false, default:"user-test"},
  createdAt: { type: Date, default: Date.now }
}

const post = mongoose.model("Post",post_schema,"test")

module.exports = post