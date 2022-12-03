const jwt = require('jsonwebtoken');
const BadAuth = require('../errors/badAuthError');

module.exports = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadAuth('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
    req.user = payload;
  } catch (err) {
    return next(new BadAuth('Необходима авторизация'));
  }

  next();
  return false;
};
