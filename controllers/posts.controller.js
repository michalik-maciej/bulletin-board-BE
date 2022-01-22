const Post = require('../models/post.model');
const User = require('../models/user.model');

const postControl = {
  getAll: async (req, res) => {
    try {
      const result = await Post
        .find({})
        .select('title price status')
        .populate('author', ['_id'])
        .sort({publicationDate: -1});
      if(!result) res.status(404).json({ post: 'Not found' });
      else res.json(result);
    }
    catch(err) {
      res.status(500).json(err);
    }
  },
  
  getById: async (req, res) => {
    try {
      const result = await Post
        .findById(req.params.id).populate('author', ['email', 'role']);
  
      if(!result) res.status(404).json({ post: 'Not found' });
      else res.json(result);
    }
    catch(err) {
      res.status(500).json(err);
    }   
  },

  add: async (req, res) => {
    try {
      const newPost = await new Post(req.body)
      await newPost.save();
      res.json(newPost)
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  editSelected: async (req, res) => {
    try {
      const recordBefore = await Post.findById(req.params.id)
      if (recordBefore) {
        await Post.updateOne({ _id: req.params.id }, { $set: req.body } )
        const recordAfter = await Post.findById(req.params.id)
        res.json(recordAfter)
      }
      else {
        res.status(404).json('post selected for edit not found')
      }
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  removeSelected: async (req, res) => {
    try {
      const record = await Post.findById(req.params.id)
      if (record) {
        await record.remove()
        res.json(`Post ${req.params.id} deleted successfully`)
      }
    }
    catch(err) {
      res.status(500).json(err);
    }
  },
}

module.exports = postControl;
