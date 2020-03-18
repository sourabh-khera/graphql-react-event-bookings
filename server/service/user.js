const userModel = require('../models/user');

exports.createNewUser = (userDetails) => {
  return new Promise((resolve, reject) => {
    userModel.find({ email: userDetails.email }, (err, data) => {
      if (err) {
        reject(err);
      }
      else if (data.length) {
        reject('User already exists');
      }
      else {
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