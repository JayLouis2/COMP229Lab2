const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Get JWT secret from environment variable or use default (change in production!)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

exports.requireAuth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'No token provided'));
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token'));
    }
    if (err.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'));
    }
    next(err);
  }
};
