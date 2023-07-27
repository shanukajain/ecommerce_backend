const express = require("express");
const rateLimit = require("express-rate-limit");
const connection = require("./config/db");
const userrouter = require("./router/user");
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce',
      version: '1.0.0',
    },
    servers:[
      {
        url:"https://ecommerce-a9g9.onrender.com"
      }
    ]
  },
  apis: ['./swagger.yaml'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

require("dotenv").config();


const { ProductRouter } = require("./router/product");
const { CategoryRouter } = require("./router/CategoryRouter");
const { CartRoute } = require("./router/cart");
const { authenticate } = require("./Middleware/authentication");
const { OrderRouter } = require("./router/order");
const swaggerUI=require("swagger-ui-express")



const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});


app.get("/", (req, res) => {
  res.send({ msg: "welcome" });
});

app.use(limiter);
app.use("/docs",swaggerUI.serve,swaggerUI.setup(openapiSpecification))
app.use("/user", userrouter);
app.use("/category",CategoryRouter);
app.use("/product", ProductRouter);
app.use(authenticate);
app.use("/cart",CartRoute);
app.use("/order",OrderRouter);








app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connection established");
  } catch (error) {
    console.log(error.message, "not connected");
  }
  console.log("listening on *:" + process.env.PORT);
});