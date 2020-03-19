const Mongoose = require('mongoose');

const bookingSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }
}, {versionKey: false, timestamps: true});

module.exports = Mongoose.model('Booking', bookingSchema);