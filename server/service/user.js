const userModel = require('../models/user');

exports.createNewUser = (userDetails) => {
  return new Promise((resolve, reject) => {
    userModel.find({ email: userDetails.email }, (err, data) => {
      if (err) {
        reject(err);
      } else if (data.length) {
        reject('User already exists');
      } else {
        userModel.create({ ...userDetails }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      }
    });
  });
}

exports.checkUser = (userEmail) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ email: userEmail }, (err, data) => {
      if (err) {
        reject(err);
      } else if (data) {
        resolve(data);
      } else {
        reject('User not found');
      }
    });
  });
}

exports.getUser = (userId) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({_id: userId}, (err, data) => {
      if(err){
        reject(err);
      } else if(data){
        resolve(data);
      } else {
        reject('Creator not found');
      }
    })
  });
}

exports.updateUser = (userDetail) => {
  return new Promise((resolve, reject) => {
    userModel.update({_id: userDetails.userId}, {$push: {createdEvents: userDetails.eventID}}, (err, data) => {
      if(err){
        reject(err);
      } else if(data) {
        resolve(data);
      } else {
        reject('User not found');
      }
      console.log(data, "data-----")
    });
  });
}