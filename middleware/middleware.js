const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to determine if the API endpoint request is from an authenticated user
function isAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.tokenData = decodedToken;
    next();
  } else {
    next(createHttpError(401, 'Unauthorized'));
  }
}

module.exports = isAuth;
