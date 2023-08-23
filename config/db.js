const mongoose = require('mongoose');
require("dotenv").config()
console.log()
const connection =  mongoose.connect(process.env.mongourl)
module.exports = connection