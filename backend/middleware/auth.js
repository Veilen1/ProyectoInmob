import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid or expired' });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authorization required' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};