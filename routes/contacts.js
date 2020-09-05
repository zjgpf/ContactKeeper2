const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const ContactModel = require('../models/Contact');

router.get('/', auth, async ( req, res ) => {
  try {
    const contacts = await ContactModel.find({ user: req.user.id }).sort({date: -1});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async ( req, res ) => {
  try {
    const { name, email, phone, type } = req.body;
    const user = req.user.id;
    const newContact = new ContactModel({
      name,
      email,
      phone,
      type,
      user
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async ( req, res ) => {
  try {
    const id = req.params.id;
    const contact = await ContactModel.findById(id);
    if (!contact) return res.status(404).json({msg: 'Contact not found'});
    if (contact.user.toString() !== req.user.id) return res.status(401).json({msg: 'Not authorized'});
    await ContactModel.findByIdAndRemove(id);
    res.json({msg:'Contact removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res)=> {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name; 
  if (email) contactFields.email = email; 
  if (phone) contactFields.phone = phone; 
  if (type) contactFields.type = type; 
  try {
    const id = req.params.id;
    const contact = await ContactModel.findById(id);
    if (!contact) return res.status(404).json({msg: 'Contact not found'});
    if (contact.user.toString() !== req.user.id) return res.status(401).json({msg: 'Not authorized'});
    const contactNew = await ContactModel.findByIdAndUpdate(
        id,
        {$set: contactFields},
        {new: true}
    ); 
    res.json(contactNew);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
