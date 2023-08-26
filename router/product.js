const express = require("express");
const { ProductModel } = require("../model/product");
const rateLimit = require("express-rate-limit");
const ProductRouter = express.Router();
const multer = require("multer");
const path = require("path");
const redis = require('redis');

// Replace these with your actual Redis server configuration
const redisHost = 'localhost'; // Replace with your Redis server host
const redisPort = 6379;        // Replace with your Redis server port

// Create a Redis client instance
// const client = redis.createClient(redisPort);

// // Event listeners for client connection events
// client.connect();

// take the order, shipping parnter
// client.on('error', (error) => {
//     console.error('Error:', error);
// });





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });


ProductRouter.get("/", async (req, res) => {
  try {
    let category_id = req.query.category_id || null;
    let product_id = req.query.product_id || null;

    if (category_id) {
      if (category_id.length >= 12) {
        let data = await ProductModel.find({ category_id });

        if (data.length != 0) {

          res.status(200).send(data);
        } else {
          res.status(200).send({ message: "no such category there" });
        }
      } else {
        res.status(402).send({ message: "wrong category id" });
      }
    } else if (product_id) {
      if (product_id.length >= 12) {
        let data = await ProductModel.findOne({ _id: product_id });
        if (data.length != 0) {
          await client.setEx(data._id,60*60*60,data);
          res.status(200).send(data);
        } else {
          res.status(200).send({ message: "no such product there" });
        }
      } else {
        res.status(402).send({ message: "wrong product id" });
      }
    } else {
      let data = await ProductModel.find();
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

ProductRouter.post("/create", upload.array("images", 10), async (req, res) => {
  try {
    let body = req.body;
    const Images = req.files.map(
      (file) =>
        "file:///C:/Users/jains/Desktop/projects/practice/Code%20for%20learning/ecommerce_backend/uploads/" +
        file.filename
    );
    body.Images = Images;
    if (body.title && body.price && body.category_id) {
      let payload = new ProductModel(body);
      await payload.save();
      res.status(200).send("done");
    } else {
      res.status(422).send({ message: "enter all details" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

ProductRouter.patch("/:_id", async (req, res) => {
  try {
    let _id = re.params._id;
    let body = req.body;
    await ProductModel.findByIdAndUpdate({ _id }, body);
    res.status(200).status({message:"done"});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

ProductRouter.delete("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    await ProductModel.findByIdAndDelete({ _id });
    res.status(200).send("done");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: { error: "Too many requests, please try again later." },
});
ProductRouter.use(limiter);
ProductRouter.get("/search/:id",async(req,res)=>{
try {
  let _id=req.params.id;
  let data=await ProductModel.find({_id});
  res.status(200).send({message:"done",data});
} catch (error) {
  res.status(500)
}
})

module.exports = { ProductRouter };
