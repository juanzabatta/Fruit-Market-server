const mongoose = require('mongoose');

// Database
const uri =process.env.DB_URI;
// const uri = 'mongodb://localhost/mevn-database';
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
};
mongoose
	.connect(uri, options)
	.then((db) => console.log('DB is connected'))
	.catch((err) => console.log(err));

module.exports = mongoose;
