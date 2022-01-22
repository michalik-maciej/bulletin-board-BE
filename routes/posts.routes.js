const express = require('express');
const router = express.Router();
const { getAll, getById, add, editSelected, removeSelected } = require('../controllers/posts.controller');

router.get('/posts', getAll);
router.get('/posts/:id', getById);
router.post('/posts/add', add)
router.put('/posts/edit/:id', editSelected)
router.delete('/posts/:id', removeSelected)

module.exports = router;
