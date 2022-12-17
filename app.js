const dotenv = require("dotenv");
dotenv.config(".env");

const express = require("express");
const router = require("./routes");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const cors = require("cors");
const initializeUser = require("./helpers/initialize-user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => { 
    initializeUser()
    console.log("Challenge is connected to mongo db");
  })
  .catch((err) => console.log("Error connect mongo db"));

app.listen(port, () => {
  console.log("Challenge is listening to port " + port);
});
