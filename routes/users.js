var express = require('express');
const createHttpError = require('http-errors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserService = require('../services/UserService');
const db = require('../models');
var router = express.Router();
const userService = new UserService(db);

// Post for registered users to be able to login
router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  if (email == null || password == null) {
    return next(createHttpError(400, 'Email and password cannot be empty'));
  }

  userService.getByEmail(email).then((data) => {
    if (data === null) {
      return next(createHttpError(401, 'Incorrect email or password'));
    }

    crypto.pbkdf2(
      password,
      data.salt,
      31000,
      32,
      'sha256',
      function (err, hashedPassword) {
        if (err) {
          return cb(err);
        }

        if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
          return next(createHttpError(401, 'Incorrect email or password'));
        }

        let token;
        try {
          console.log(data);
          token = jwt.sign(
            { id: data.id, email: data.email, name: data.name },
            process.env.TOKEN_SECRET,
            {
              expiresIn: '1h',
            }
          );
        } catch (err) {
          console.log(err);
          return next(
            createHttpError(500, 'Something went wrong with creating JWT token')
          );
        }
        res.jsend.success({ result: 'You are logged in', token: token });
      }
    );
  });
});

// Post for new users to register / signup
router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;
  if (email == null || password == null || name == null) {
    return next(createHttpError(400, 'Name, email and password cannot be empty'));
  }
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(password, salt, 31000, 32, 'sha256', function (err, hashedPassword) {
    if (err) {
      return next(createHttpError(500, 'Something went wrong'));
    }
    userService.create(name, email, hashedPassword, salt);
    return res.jsend.success({
      data: { statusCode: 200, result: 'You have created an account' },
    });
  });
});

router.get('/fail', (req, res) => {
  return res
    .status(401)
    .jsend.error({ statusCode: 401, message: 'message', data: 'data' });
});

module.exports = router;
