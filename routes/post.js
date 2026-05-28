const express = require('express');
const router = express.Router();

const post_model = require('../models/post.js');
const user_model = require('../models/user.js')

router.post('/', async (req, res) => {
  try {
    const newPost = await post_model.create({ title:req.body.postTitle , content:req.body.postContent , createdAt:Date.now()});
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Server POST error : ',err });
  }
});

// GET /posts: Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await post_model.find()//.populate('authorId','name email');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Server GET error : ',err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await post_model.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server DELETE error : '+String(err) });
  }
});

router.get('/latest/:n', async (req,res) => {
  try{
    const latest_n_entries = await post_model.find({}).sort({createdAt:-1}).limit(req.params.n)
    res.json(latest_n_entries)
  }
  catch (error) {
    console.error("latest GET error : ", error);
  }
})

router.get('/delete/:id', async (req, res) => {
  try {
    const deletedPost = await post_model.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Server error : '+String(err) });
  }
});

module.exports = router