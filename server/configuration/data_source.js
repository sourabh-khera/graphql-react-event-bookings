const Mongoose = require('mongoose');

Mongoose.connect("mongodb://localhost/event_booking");

(()=>{
	Mongoose.connection.on('open', (err, data) => {
		console.log('mongo connection successful');  
	});
	Mongoose.connection.on('error', (err, data) => {
		console.log(`mongo connection not successful ---- ${err}`);               
	});
})();