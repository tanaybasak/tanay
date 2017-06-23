(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const flash = require('connect-flash');
  const morgan = require('morgan');
  const cors = require('cors');

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    // *** view engine *** //
    app.set('view engine', 'html');

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }

	// *** cross domain requests *** //
    const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	  // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, access_token');
      next();
    };

    app.use(cors());
    app.use(allowCrossDomain);
    app.use(cookieParser());
	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
	

    app.use(flash());

  };

})(module.exports);
