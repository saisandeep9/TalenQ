const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("express-async-errors");

app.use(express.json());

app.use(helmet());

//connecting to the Data base
mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

const stocks = require("./routes/stocks");

app.use("/api", stocks);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
