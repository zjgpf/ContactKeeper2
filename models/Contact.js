const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.objectId, ref:'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, default: 'personal' },
    date: { type: Date, default: true }
  }
);

module.exports = mongoose.model('contact', ContactSchema);
