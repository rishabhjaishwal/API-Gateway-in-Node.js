const express = require("express");
const bodyParser = require("body-parser");
const dotenv  = require('dotenv');
dotenv.config();
const cors = require("cors");
var helmet = require('helmet');
var compression = require('compression');

const { requestHandler } = require("./requestHandler");
const { handleError } = require("./helpers/error");
const tokenValidator = require('./middleware/tokenValidator');



// App initialization
const app = express();
app.use(compression());
app.use(cors());
app.disable("x-powered-by");
app.use(helmet());



// Configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenValidator);



// Welcome route
app.get("/", (req, res) => {
    res.send("🔥🔥🔥🔥Welcome to Gateway Server🔥🔥🔥🔥");
  });




app.use("*", requestHandler);

app.use((err, req, res, next) => {
    if (err.statusCode) handleError(err, res);
    else
      res.status(500).json({
        success: false,
        message: "Internal server error",
        statusCode: 500
      });
  });




const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

// Starting server
app.listen(PORT, HOST , () => {
    console.log(`Listening 👂 on  ${HOST}:${PORT}`);
  });

process.on('uncaughtException', err => {
      console.error(`Uncaught Exception thrown, error:${err}`);
      process.exit(1);

});

process.on('unhandledRejection', err => {
    console.error(`unhandledRejection thrown, error:${err}`);
  });

  module.exports = app;
