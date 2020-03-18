const Mongoose = require('mongoose');


const eventSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  creator: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {versionKey: false});

module.exports = Mongoose.model('Event', eventSchema);