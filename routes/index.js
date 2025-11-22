const express = require('express');
const router = express.Router();

// Root endpoint required by assignment
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my portfolio application' });
});

module.exports = router;
