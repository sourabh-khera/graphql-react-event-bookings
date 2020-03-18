const { createNewEvent, getEvents } = require('../../service/event');


module.exports = {
  events: () => {
    return getEvents()
    .then(result => {
      return result
    })
    .catch(err => {
      throw err;
    })
  },
  createEvent: (args) => {
    const event = {
      title: args.eventInput.title,
      price: parseFloat(args.eventInput.price),
      description: args.eventInput.description,
      date: new Date(args.eventInput.date),
    }
    return createNewEvent(event)
    .then(result => {
      return result;
    })
    .catch(err => { throw err; });
  }
}

