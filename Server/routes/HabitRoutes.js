const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/AuthMiddleware');
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getTodayProgress,
  getMonthlyHabitOverview,
  getHabitProgress,
} = require('../controllers/HabitController');

router.route('/')
  .get(protect, getHabits)
  .post(protect, createHabit);

router.route('/:id')
  .put(protect, updateHabit)
  .delete(protect, deleteHabit);

router.patch('/:id/complete', protect, completeHabit);
router.get('/progress/today', protect, getTodayProgress);
router.get('/habit-progress', protect, getHabitProgress);
router.get('/monthly-overview', protect, getMonthlyHabitOverview);


module.exports = router;
