const { createNewBooking, getBookings, cancelEventBooking, getCanceledEvent } = require('../../service/booking');
const { getUser } = require('../../service/user');
const { getSpecificUserEvents } = require('../../service/event');


const getBookedBy = (id) => {
  return getUser(id)
  .then(user => {
     return { ...user._doc, password: null }
  })
  .catch(err => {throw err});
};


const getBookedEvents = (eventIds) => {
  return getSpecificUserEvents(eventIds)
  .then(events => {
    return events.map(event => {
      return {...event._doc};
    })
})
  .catch(err => { throw err});
}

module.exports = {
  bookings: () => {
    return getBookings()
    .then(result => {
      return result.map(event => {
        return {...event._doc, bookedBy: getBookedBy.bind(this, event.user), bookedEvent: getBookedEvents.bind(this, event.event)}
      });
    })
    .catch(err => {
      throw err;
    })
  },
  createBooking: (args) => {
    const event = {
      eventId: args.eventId,
      bookedBy: "5e6f6f85e1788c105e3abbe7",
    };
    return createNewBooking(event)
    .then(result => {
      return result;
    })
    .catch(err => {throw err});
  },
  cancelBooking: (args) => {
    const bookingDetails = {
      bookingId: args.bookingId,
    };
    return getCanceledEvent(bookingDetails.bookingId)
    .then(result => {
      return cancelEventBooking(bookingDetails)
      .then(deleted => {
        const event = {
          ...result.event._doc,
          creator: getBookedBy.bind(this, result.event._doc.creator)
        };
        console.log(event, "event----")
        return event;
      })
      .catch(err => {throw err});
    })
    .catch(err => { throw err });
  }
}

