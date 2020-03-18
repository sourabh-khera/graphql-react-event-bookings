const { createNewUser, checkUser } = require('../../service/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  },

  login: (args) => {
    const authData = {
      email: args.authInput.email,
      password: args.authInput.password,
    };
    return checkUser(authData.email)
    .then(user => {
       return bcrypt.compare(authData.password, user.password)
       .then(result => {
        if(!result){
          throw new Error('Enter the correct Passoword');
        } else {
          const token = jwt.sign({userId: user._id, email: user.email}, 'secret@graphql123', {expiresIn: '5h'});
          return { userId: user._id, token };
        }
      })
      .catch(err => { throw err });   
    })
    .catch(err => {throw err});
  }
}