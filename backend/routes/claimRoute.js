const express = require('express');
const router = express.Router();
const User = require('../models/user');
const PointHistory = require('../models/pointHistory');

router.post('/:userId', async (req, res) => {
  const randomPoints = Math.floor(Math.random() * 10) + 1;
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).send('User not found');

  user.totalPoints += randomPoints;
  await user.save();

  const history = new PointHistory({ userId: user._id, points: randomPoints });
  await history.save();

  res.json({ points: randomPoints, user });
});

router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1
  }));
  res.json(leaderboard);
});

module.exports = router;