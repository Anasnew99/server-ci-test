const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
});

const { initDB } = require("./db");
const express = require("express");

const authorize = require("./core/authorizer");
const app = express();
// app.use(e)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authorize);

app.use("/todo", require("./route/todo"));

module.exports = {
  app,
  initDB,
};
