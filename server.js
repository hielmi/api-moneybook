const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const envConfig = require("./config/envConfig");
const dbConfig = require("./config/db");
const router = require("./routes/router");
const ErrorHandlingMiddleware = require("./middleware/ErrorHandlingMiddleware");

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
app.use(ErrorHandlingMiddleware);

const startServer = async () => {
  await dbConfig.authenticate();

  const port = process.env.PORT || 4000;
  const host = envConfig.isProduction ? "0.0.0.0" : "localhost";

  app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
  });
};

startServer();
