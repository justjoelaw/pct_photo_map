import jwt from 'jsonwebtoken';

const JWTExemptReqs = [
  {
    path: '/users',
    method: 'POST',
  },
];

const verifyJWTIfRequired = (req, res, next) => {
  const isExempt = JWTExemptReqs.find((exemptReq) => exemptReq.path === req.baseUrl && exemptReq.method === req.method);

  if (isExempt) {
    next();
  } else {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded.UserInfo.username;
      req.isAdmin = decoded.UserInfo.isAdmin;
      req.userId = decoded.UserInfo.userId;
      next();
    });
  }
};

export default verifyJWTIfRequired;
