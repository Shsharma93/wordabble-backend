const express = require('express');
const router = express.Router();
const Games = require('../models/games');
const validateGame = require('../validation/game');

router.get('/', async (req, res) => {
  let userId = '';
  if (req.query) {
    userId = {
      user: req.query.id
    };
  }
  try {
    const games = await Games.find(userId).sort({
      date: -1
    });
    res.json({ success: true, games });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { error } = validateGame(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const game = new Games({
      ...req.body
    });
    await game.save();
    res.json({ success: true, game });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
