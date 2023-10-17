const express = require('express');
const router = express.Router();
const db = require('../models');
const isAuth = require('../middleware/middleware');
const CategoryService = require('../services/CategoryService');
const createHttpError = require('http-errors');
const categoryService = new CategoryService(db);

router.get('/', isAuth, async function (req, res, next) {
  const { id, email, name } = res.locals.tokenData;
  const categories = await categoryService.getCategories();
  res.jsend.success({ statusCode: 200, result: categories });
});

router.post('/', isAuth, async function (req, res, next) {
  const { name, UserId } = req.body;

  if (UserId == null || name == null) {
    return next(createHttpError(400, 'name and UserId cannot be empty'));
  }

  await categoryService.addCategory(name, UserId);
  res.jsend.success({ statusCode: 200, result: 'Category added' });
});

module.exports = router;
