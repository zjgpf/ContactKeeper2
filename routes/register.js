const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserModel = require('../models/User');

router.post( '/', async (req, res) => {
  try {
        const { name, email, password } = req.body;
        let user = await UserModel.findOne({email});
        if (user) return res.status(400).json({msg: 'User already exists'});
        user = UserModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {user:{id:user.id}};
        jwt.sign(
          payload, 
          config.get('jwtSecret'), 
          { expiresIn: 360000000 }, 
          (err, token) => {
            if (err) throw err;
            res.json({token});
          }
        ); 
      } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
