const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Stock = mongoose.model("stock", mongoose.Schema({}));
//get the all the stock
app.get("/", async (req, res) => {
  const stock = await Stock.find().sort({ Company: 1 });
  res.send(stock);
});
//get by comany name
app.get("/company", async (req, res) => {
  const stock = await Stock.find({ Company: /.*Agilent.*/i });
  res.send(stock);
});

// get the stock of given id
app.get("/:id", async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (!stock)
    return res.status(404).send("The stock with the given ID was not found.");

  res.send(stock);
});

//deleting stock by give id

app.delete("/:id", async (req, res) => {
  const stock = await Stock.findByIdAndRemove(req.params.id);

  if (!stock)
    return res.status(404).send("The Stock with the given ID was not found.");

  res.send(stock);
});

module.exports = app;
