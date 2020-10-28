const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./middlewares');
require('dotenv').config();
require('./db/connection');
const compression = require('compression');
const app = express();

// Settings of Port
app.set('port', process.env.PORT || 3000);

// Defining middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(compression());

// Static folder
app.use(express.static(__dirname + '/public/'));

// Routes
app.use('/api', require('./routes'));

// Middleware for Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());

// Listening to port
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});

module.exports = app;
