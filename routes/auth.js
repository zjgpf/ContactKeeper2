const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth');
const UserModel = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    return res.json(user);
  }
  catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});
    if (!user) return res.status(400).json({msg: 'Invalid Credentials'});
    if(! await bcrypt.compare(password, user.password)) {
      return res.status(400).json({msg: 'Invalid Credential'});
    }
    const payload = {user: {id: user.id}};
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000000},
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  }
  catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
