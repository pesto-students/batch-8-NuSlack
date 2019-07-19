const security = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: 60 * 120,
};

Object.freeze(security);

export default security;
