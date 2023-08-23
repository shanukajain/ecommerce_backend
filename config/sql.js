const { Sequelize } = require("sequelize");
// const sequelize=new Sequelize("userblogs","admin","shanu123",{
// host:"database-1.c4wyxfqovg91.eu-north-1.rds.amazonaws.com",
//     dialect:"mysql"
// });
const sequelize = new Sequelize("product", "root", "Sh@nu123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };