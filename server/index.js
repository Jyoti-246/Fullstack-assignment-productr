require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");

const app = express();

console.log("EMAIL USER:", process.env.EMAIL);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
  }),
);

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/test", (req, res) => {
  res.send("test running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on 5000");
});
