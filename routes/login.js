const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validateUser = require('../validation/users');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });

    const token = user.generateAuthToken();

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .json({ success: true, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
