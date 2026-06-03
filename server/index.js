require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on 5000");
});
