const Todo = require('../models/TodoModel');
const asyncHandler = require('express-async-handler');
const { startOfMonth, endOfMonth, eachDayOfInterval, format } = require('date-fns');

// ------------------- EXISTING CRUD -------------------

// GET user's todos
exports.getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// POST create user's todo
exports.createTodo = asyncHandler(async (req, res) => {
  const { text, time, date } = req.body;

  const todo = await Todo.create({
    user: req.user._id,
    text,
    time,
    date,
  });

  res.status(201).json(todo);
});

// PUT update todo
exports.updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  todo.text = req.body.text || todo.text;
  todo.time = req.body.time || todo.time;
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  res.json(await todo.save());
});

// DELETE todo
exports.deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await todo.deleteOne();
  res.json({ message: 'Todo removed' });
});

// PATCH toggle complete
exports.toggleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.json(todo);
});

// ------------------- DASHBOARD / TODAY LOGIC -------------------

// Get today’s todos split by completed / uncompleted with timing info
exports.getTodayTodos = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todos = await Todo.find({
    user: req.user._id,
    date: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  }).sort({ time: 1 });

  const completed = todos.filter(t => t.completed);
  const uncompleted = todos.filter(t => !t.completed);

  const now = new Date();
  const uncompletedWithStatus = uncompleted.map(t => {
    let status = 'active';

    if (t.time) {
      const [hours, minutes] = t.time.split(':').map(Number);
      const todoTime = new Date(today);
      todoTime.setHours(hours, minutes, 0, 0);

      if (now.getTime() > todoTime.getTime()) status = 'time-passed';
      else if ((todoTime - now) / 60000 <= 30) status = 'almost'; // less than 30 min
    }

    return { ...t._doc, status };
  });

  res.json({
    completed,
    uncompleted: uncompletedWithStatus,
    total: todos.length,
    completedCount: completed.length,
  });
});

// Optional: reset old todos (mark expired)
exports.resetTodos = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await Todo.updateMany(
    { date: { $lt: today }, completed: false },
    { expired: true }
  );

  res.json({ message: 'Old todos marked as expired' });
});

// 2️⃣ Today's Summary (Todos Only)
exports.getTodayTodoSummary = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todos = await Todo.find({
    user: req.user._id,
    date: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  });

  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;

  res.json({ completed, total });
});
