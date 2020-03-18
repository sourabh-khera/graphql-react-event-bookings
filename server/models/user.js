const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
  type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    }
  ]
}, {versionKey: false});

module.exports = Mongoose.model('User', userSchema);