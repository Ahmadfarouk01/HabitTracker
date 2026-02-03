const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/AuthMiddleware');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  getTodayTodoSummary,
  getTodayTodos,
  resetTodos,
} = require('../controllers/TodoController');

router.route('/')
  .get(protect, getTodos)
  .post(protect, createTodo);

router.route('/:id')
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

router.patch('/:id/toggle', protect, toggleTodo);
router.get('/today-summary', protect, getTodayTodoSummary);
router.get('/today', protect, getTodayTodos);
router.post('/reset-old', protect, resetTodos); 


module.exports = router;
