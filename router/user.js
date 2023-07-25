const express = require("express");
const UserModel = require("../model/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlockuserModel = require("../model/blockuser");
const { authenticate } = require("../Middleware/authentication");
const userrouter = express.Router();

userrouter.get("/", (req, res) => {
  res.send("user Router");
});

userrouter.post("/register", async (req, res) => {
  let { name, email, password, gender } = req.body;
  let data = await UserModel.findOne({ email: email });
  if (data) {
    res
      .status(409)
      .send({ msg: "User with same email address already exits." });
  } else {
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          let body = { name, email, password: hash, gender };
          let user = new UserModel(body);
          await user.save();
          res.status(200).send({ msg: "Registration Succesful" });
        }
      });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .send({ msg: "Something went wrong!", err: error.message });
    }
  }
});

userrouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await UserModel.findOne({ email: email });
    if (!data) {
      res.status(409).send({ msg: "User does not exits." });
    } else if (data) {
      let data1 = await BlockuserModel.findOne({ user_id: data.id });
      if (data1) {
        res.status(409).send({ msg: "Your account has been blocked" });
      } else {
        bcrypt.compare(password, data.password, function (err, result) {
          if (result) {
            let token = jwt.sign(
              { email: data.email, role: data.role },
              "backend"
            );
            console.log(token)
            res
              .status(200)
              .send({ msg: "Login successfull", token: token, user: data });
          } else {
            res.status(404).send({ msg: "Incorrect Password" });
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Something went wrong!", err: error.message });
  }
});
userrouter.use(authenticate);
userrouter.get("/logout", async (req, res) => {
  let token = req.headers.authorization;
  let user_id=req.body.user_id;
    let body=new BlockuserModel({user_id,token});
    await body.save();
  res.status(200).send({ msg: "logout successfull" });
});

module.exports = userrouter;
