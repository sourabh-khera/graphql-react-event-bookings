const bookingModel = require('../models/booking');


exports.createNewBooking = (eventDetails) => {
  return new Promise((resolve, reject) => {
    bookingModel.create({event: eventDetails.eventId, user: eventDetails.bookedBy}, (err, data) => {
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}

exports.getBookings = (userId) => {
  return new Promise((resolve, reject) => {
    bookingModel.find({}, (err, data) => {
      if (err) {
        reject(err);
      }
      else if (data.length) {
        resolve(data);
      }
      else {
        reject('No Events Exist');
      }
    });
  });
}

exports.cancelEventBooking = (bookingDetails) => {
  return new Promise((resolve, reject) => {
    bookingModel.deleteOne({_id: bookingDetails.bookingId}, (err, data) => {
      if(err){
        reject(err);
      } else if(data.deletedCount){
        resolve(true);
      } else {
        reject('Error in cancellation');
      }
    }); 
  });
}

exports.getCanceledEvent = (bookingId) => {
  return new Promise((resolve, reject) => {
    bookingModel.findById({_id: bookingId}).populate('event').exec((err, data) => {
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}
