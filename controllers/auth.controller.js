const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Get JWT secret from environment variable or use default (change in production!)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, 'Email and password are required'));
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid email or password'));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(createError(401, 'Invalid email or password'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};
