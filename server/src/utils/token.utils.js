import jwt from 'jsonwebtoken';
import security from '../config/security';

const createToken = user => jwt.sign(
  {
    userId: user._id,
  },
  security.jwtSecret,
  {
    expiresIn: security.jwtExpiry,
  },
);

const otherUtils = {};

export { createToken, otherUtils };
