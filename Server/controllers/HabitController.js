const Habit = require('../models/HabitModel');
const asyncHandler = require('express-async-handler');
const { calculateStreak } = require('../utils/HabitUtils');
const { startOfMonth, endOfMonth, eachDayOfInterval, format } = require('date-fns');

// GET only this users habits
exports.getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  const habitsWithStreak = habits.map(habit => ({
    ...habit._doc,
    streak: calculateStreak(habit.completedDates),
  }));
  res.json(habits);
});


// POST create habit
exports.createHabit = asyncHandler(async (req, res) => {
  const { title, time } = req.body;

  const habit = await Habit.create({
    user: req.user._id,
    title,
    time,
  });

  res.status(201).json(habit);
});


// PUT update habit
exports.updateHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  if (habit.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  habit.title = req.body.title || habit.title;
  habit.time = req.body.time || habit.time;

  res.json(await habit.save());
});

// DELETE habit
exports.deleteHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  if (habit.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await habit.deleteOne();
  res.json({ message: 'Habit removed' });
});


// PATCH mark habit complete (basic version)
exports.completeHabit = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }

  if (habit.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // Normalize today to midnight (important!)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already completed today
  const alreadyDone = habit.completedDates.some(date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  if (!alreadyDone) {
    habit.completedDates.push(today);
    await habit.save();
  }

  res.json(habit);
});


exports.getTodayProgress = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let completedCount = 0;

  habits.forEach(habit => {
    const doneToday = habit.completedDates.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    if (doneToday) completedCount++;
  });

  res.json({
    completed: completedCount,
    total: habits.length,
  });
});


// 1️⃣ Habits Progress
exports.getHabitProgress = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });

  if (!habits || habits.length === 0) {
    return res.json({ progress: 0, streak: 0 });
  }

  // Count habits completed today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedToday = habits.filter(habit =>
    habit.completedDates?.some(d => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime() === today.getTime();
    })
  ).length;

  const progress = Math.round((completedToday / habits.length) * 100);

  // Calculate streak (consecutive days where all habits done)
  // Map each day’s completion into a boolean for today + past
  const streak = calculateStreak(habits.map(habit => habit.completedDates).flat());

  res.json({ progress, streak });
});



// 3️⃣ Monthly Overview (Habits Only)
exports.getMonthlyHabitOverview = asyncHandler(async (req, res) => {
  const month = req.query.month ? new Date(req.query.month) : new Date();
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  const habits = await Habit.find({ user: req.user._id });

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const completionDays = days.map(day => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);

    const completedCount = habits.filter(habit =>
      habit.completedDates?.some(d => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === dayStart.getTime();
      })
    ).length;

    const percent = habits.length === 0 ? 0 : Math.round((completedCount / habits.length) * 100);

    return { date: format(dayStart, 'yyyy-MM-dd'), percent };
  });

  res.json({ completionDays });
});