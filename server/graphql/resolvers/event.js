const { createNewEvent, getEvents, getSpecificUserEvents } = require('../../service/event');
const { getUser } = require('../../service/user');


const getCreator = (id) => {
  return getUser(id)
  .then(user => {
     return { ...user._doc, password: null, createdEvents: getCreatedEvents.bind(this, user._doc.createdEvents) }
  })
  .catch(err => {throw err});
};

const getCreatedEvents = (eventIds) => {
  return getSpecificUserEvents(eventIds)
  .then(events => {
    return events.map(event => {
      return {...event._doc, creator: getCreator.bind(this, event._doc.creator)};
    })
})
  .catch(err => { throw err});
}

module.exports = {
  events: () => {
    return getEvents()
    .then(result => {
      return result.map(event => {
        return {...event._doc, creator: getCreator.bind(this, event._doc.creator)};
      })
    })
    .catch(err => {
      throw err;
    })
  },
  createEvent: (args, req) => {
    if(!req.isAuth){
      throw new Error('User not authenticated'); 
    }
    const event = {
      title: args.eventInput.title,
      price: parseFloat(args.eventInput.price),
      description: args.eventInput.description,
      date: new Date(args.eventInput.date),
    };
    return createNewEvent(event)
    .then(result => {
      return result;
    })
    .catch(err => { throw err; });
  }
}

