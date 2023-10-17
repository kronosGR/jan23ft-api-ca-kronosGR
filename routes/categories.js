const express = require('express');
const router = express.Router();
const db = require('../models');
const isAuth = require('../middleware/middleware');
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService(db);

router.get('/', isAuth, async function (req, res, next) {
  const { id, email, name } = res.locals.tokenData;
  const categories = await categoryService.getCategories();
  res.jsend.success({ statusCode: 200, result: categories });
});

router.post('/', isAuth, async function (req, res, next) {});

module.exports = router;
