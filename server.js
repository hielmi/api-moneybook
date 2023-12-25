const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/indexModel");
const router = require("./routes/router");
const ErrorHandlingMiddleware = require("./middleware/ErrorHandlingMiddleware");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(router);

// error handling middleware
app.use(ErrorHandlingMiddleware);

try {
  db.dbConfig.authenticate();

  //   run before for migrate
  // db.dbConfig.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

var server = app.listen(
  4000,
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
  function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("running at http://" + host + ":" + port);
  }
);
