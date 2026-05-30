const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const product = new Product({
      name: req.body.name,
      type: req.body.type,
      quantityStock: Number(req.body.quantityStock),
      mrp: Number(req.body.mrp),
      sellingPrice: Number(req.body.sellingPrice),
      brandName: req.body.brandName,
      exchangeEligibility: req.body.exchangeEligibility,
      published: false,

      images: req.files.map((file) => file.filename),
    });

    const saved = await product.save();

    console.log("SAVED PRODUCT:", saved);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const {
      name,
      type,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      exchangeEligibility,
      published,
    } = req.body;

    const updatedData = {
      name,
      type,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      exchangeEligibility,
      published: published === "true",
    };

    // if new images uploaded
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map((file) => file.filename);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch("/:id/publish", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.published = !product.published;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
