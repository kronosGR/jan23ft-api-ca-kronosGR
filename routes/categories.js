const express = require('express');
const router = express.Router();
const db = require('../models');
const isAuth = require('../middleware/middleware');
const CategoryService = require('../services/CategoryService');
const createHttpError = require('http-errors');
const categoryService = new CategoryService(db);

router.get('/', isAuth, async function (req, res, next) {
  // #swagger.tags = ['Categories']
  // #swagger.description = "Get the list of categories for the user"
  // #swagger.produces = ['text/json']
  // #swagger.responses = [200]
  const { id, email, name } = res.locals.tokenData;
  const categories = await categoryService.getCategories(id);
  res.jsend.success({ statusCode: 200, result: categories });
});

router.post('/', isAuth, async function (req, res, next) {
  // #swagger.tags=['Categories']
  // #swagger.description = "Add new category for the user"
  // #swagger.produces = ['text/json']
  // #swagger.responses = [201, 400]
  /* #swagger.parameters['body']={
    "name": "body",  
    "in":"body",
    "schema":{
      $ref: "#/definitions/CategoryAdd"
    }
  }*/
  const { name, UserId } = req.body;

  if (UserId == null || name == null) {
    return next(createHttpError(400, 'name and UserId cannot be empty'));
  }

  await categoryService.addCategory(name, UserId);
  res.jsend.success({ statusCode: 201, result: 'Category added' });
});

router.put('/:id', isAuth, async function (req, res, next) {
  // #swagger.tags=['Categories']
  // #swagger.description = "Update the category"
  // #swagger.produces = ['text/json']
  // #swagger.responses=[201,400]
  /* #swagger.parameters['body']={
    "name":"body",
    "in":"body",
    "schema":{
      $ref:"#/definitions/CategoryUpdate"
    }
  }

  */
  const { name, UserId } = req.body;
  const id = req.params.id;

  if (UserId == null || name == null) {
    return next(createHttpError(400, 'name and UserId cannot be empty'));
  }

  await categoryService.updateCategory(id, name, UserId);
  res.jsend.success({ statusCode: 201, result: 'Category updated' });
});

router.delete('/:id', isAuth, async function (req, res, next) {
  // #swagger.tags=['Categories']
  // #swagger.description = "Delete a category"
  // #swagger.produces = ['text/json']
  // #swagger.responses = [200]
  const id = req.params.id;
  await categoryService.deleteCategory(id);
  res.jsend.success({ statusCode: 200, result: 'Category deleted' });
});

module.exports = router;
