// const jwt = require('jsonwebtoken');

// function authMiddleware(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains user id
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// }

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get token from header (format: "Bearer TOKEN")
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // split "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // attach decoded user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;

