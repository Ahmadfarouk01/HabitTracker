const calculateStreak = (completedDates = []) => {
  if (!Array.isArray(completedDates) || completedDates.length === 0) return [];

  // Convert everything to Date objects and remove invalid dates
  const dates = completedDates
    .map(d => new Date(d))
    .filter(d => !isNaN(d.getTime()));

  // Sort newest first
  dates.sort((a, b) => b - a);

  const streak = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build streak for last 7 days
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const done = dates.some(d => {
      const dateOnly = new Date(d);
      dateOnly.setHours(0, 0, 0, 0);
      return dateOnly.getTime() === day.getTime();
    });

    streak.push(done);
  }

  return streak; // array of booleans for your UI
};

module.exports = { calculateStreak };
