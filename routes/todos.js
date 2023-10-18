var express = require('express');
var router = express.Router();
const isAuth = require('../middleware/middleware');
const db = require('../models');
const TodoService = require('../services/TodoService');
const createHttpError = require('http-errors');
const todoService = new TodoService(db);

/* Return all the logged in users todo's with the category associated with each todo and
status that is not the deleted status */
router.get('/', isAuth, async (req, res) => {
  const { UserId } = res.locals.tokenData;
  const data = await todoService.getAllByUserButNotDeleted(UserId);
  res.jsend.success({ statusCode: 200, result: data });
});

// Return all the users todos including todos with a deleted status
router.get('/all', isAuth, async (req, res) => {
  const { UserId } = res.locals.tokenData;
  const data = await todoService.getAllByUser(UserId);
  res.jsend.success({ statusCode: 200, result: data });
});

// Return all the todos with the deleted status
router.get('deleted', isAuth, async (req, res) => {
  const { UserId } = res.locals.tokenData;
  const data = await todoService.getDeletedByUser(UserId);
  res.jsend.success({ statusCode: 200, result: data });
});

// Add a new todo with their category for the logged in user
router.post('/', isAuth, async (req, res) => {
  const { name, description, CategoryId, StatusId, UserId } = req.body;
  if (
    name == null ||
    description == null ||
    CategoryId == null ||
    StatusId == null ||
    UserId == null
  ) {
    return next(createHttpError(400, 'All fields are required'));
  }
  await todoService.addTodo(name, description, CategoryId, StatusId, UserId);
  res.jsend.success({ statusCode: 201, result: 'Todo added' });
});

// Return all the statuses from the database
router.get('/statuses', async (req, res) => {
  const data = await todoService.getAllStatuses();
  res.jsend.success({ statusCode: 200, result: data });
});

// Change/update a specific todo for logged in user
router.put('/:id', isAuth, async (req, res) => {
  const { UserId } = res.locals.tokenData;
  const id = req.params.id;
  const { name, description, CategoryId, StatusId } = req.body;
  if (
    name == null ||
    description == null ||
    CategoryId == null ||
    StatusId == null ||
    UserId == null
  ) {
    return next(createHttpError(400, 'All fields are required'));
  }

  await todoService.updateTodo(id, name, description, CategoryId, StatusId, UserId);
  res.jsend.success({ statusCode: 201, result: 'Todo updated' });
});

// Delete a specific todo if for the logged in user
router.delete('/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  await todoService.updateDeleteTodo(id);
  res.jsend.success({ statusCode: 200, result: 'Todo deleted' });
});

module.exports = router;
