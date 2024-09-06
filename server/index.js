
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./routes/usersroutes.js");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");


const app = express();

//middleware 
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

dotenv.config();


app.use(express.urlencoded({ extended: false }));
app.use("/api", route);

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;


//connecting with MongoDB
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
