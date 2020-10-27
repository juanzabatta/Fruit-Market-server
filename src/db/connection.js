const mongoose = require('mongoose');

// Database
const uri =
	'mongodb+srv://admin:ATnx4q1qeQprnOZ2@cluster1.6phhv.mongodb.net/prueba-1?retryWrites=true&w=majority';
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
