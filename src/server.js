// Importing required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// const winston = require('winston');

// Database
const uri = 'mongodb+srv://admin:ATnx4q1qeQprnOZ2@cluster1.6phhv.mongodb.net/prueba-1?retryWrites=true&w=majority';
// const uri = 'mongodb://localhost/mevn-database';
const options = { useUnifiedTopology: true, useNewUrlParser: true }
mongoose.connect(uri, options)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

// Settings of Port
app.set('port', process.env.PORT || 3000);

// Defining middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/public/'));

// Routes
app.use('/api/products', require('./routes/index'));

// Middleware for Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + '/public/'));

// Listening to port
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

module.exports = app;
