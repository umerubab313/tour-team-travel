const express = require('express');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'securepass';

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple check against hardcoded credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: 'Admin logged in successfully' });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
