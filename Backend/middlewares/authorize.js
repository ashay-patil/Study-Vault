const jwt = require('jsonwebtoken');


const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'You need to login first' });
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user data to request
      next();
    } catch (err) {
      return res.status(403).json({ msg: 'You need to login first' });
    }
};

module.exports = authorize;