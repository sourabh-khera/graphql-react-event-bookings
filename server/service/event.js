const eventModel = require('../models/event');

exports.createNewEvent = (eventDetails) => {
  return new Promise((resolve, reject) => {
    eventModel.find({ title: eventDetails.title }, (err, data) => {
      if (err) {
        reject(err);
      }
      else if (data.length) {
        reject('Event already exists');
      }
      else {
        eventModel.create({ ...eventDetails }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data)
          }
        });
      }
    });
  });
}

exports.getEvents = () => {
  return new Promise((resolve, reject) => {
    eventModel.find({}, (err, data) => {
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

exports.getSpecificUserEvents = (eventIds) => {
  return new Promise((resolve, reject) => {
    eventModel.find({_id:{$in: eventIds}}, (err, data) => {
      if (err) {
        reject(err);
      } else if (data.length) {
        resolve(data);
      } else {
        reject('Events doesn\'t exist');
      }
    });
  });
}