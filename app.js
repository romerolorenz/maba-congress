'use strict';

require('dotenv').config();

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const helmet = require('helmet');
const {logger} = require('./api/utilities/Logger.js');

app.use(helmet());

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use((err, req, res, next) => {
    res.status(err.httpStatus || 500).json({
      message: err.message,
      eventCode: err.eventCode,
      status: err.status,
    });
  });

  var port = process.env.PORT || 10010;
  app.listen(port);

  logger.info('API Started...')
});
