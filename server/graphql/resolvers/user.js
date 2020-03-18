const { createNewUser } = require('../../service/user');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: (args) => {
    const user = {
      email: args.userInput.email,
      password: args.userInput.password,
    }
    return bcrypt.hash(user.password, 10)
    .then((hash) => {
      return createNewUser({...user, password: hash})
    }) 
    .then(result => {
      return {...result._doc, password: null};
    })
    .catch(err => { throw err; })
  }
}