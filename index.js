const express = require("express");
const rateLimit = require("express-rate-limit");
const connection = require("./config/db");
const userrouter = require("./router/user");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

app.use(limiter);
app.use("/user", userrouter);




app.get("/", (req, res) => {
  res.send({ msg: "welcome" });
});





app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connection established");
  } catch (error) {
    console.log(error.message, "not connected");
  }
  console.log("listening on *:" + process.env.PORT);
});