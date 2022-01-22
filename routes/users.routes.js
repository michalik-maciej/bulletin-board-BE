const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get('/users', async (req, res) => {
  try {
    const allUsers = await User
      .find({})
      .select(['_id', 'role'])
    if(!allUsers) res.status(404).json({ users: 'Not found' });
    else res.json(allUsers);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
