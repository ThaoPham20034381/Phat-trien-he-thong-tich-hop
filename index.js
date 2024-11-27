const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const router = require("./router/root.router");
const port = process.env.PORT;
sequelize;
connectDBMongoDB();

// xử lý CORS headers
//app.use((req, res, next) => {
//  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//  next();
//});

//localhost:3000/public/image/abc.jpg
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json()); // Middleware để xử lý JSON data
app.use(express.urlencoded({ extended: true })); // Middleware để xử lý urlencoded data

app.use("/", router);

app.listen(port, () => {
  console.log("run at http://localhost:3000");
});
