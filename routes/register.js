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
    const isRegistered = await Users.findOne({ username: req.body.username });
    if (isRegistered)
      return res
        .status(400)
        .json({ success: false, message: 'username already exists' });

    const { password } = req.body;
    const user = new Users({ ...req.body });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = user.generateAuthToken();
    await user.save();

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
