const path = require("path")
require("dotenv").config({path: path.join(__dirname, "../.env")})

const express = require("express");

const app = express();
const userRouter = require("./routes/users.router");

app.use(express.urlencoded({ extended: true })); //middleware
app.use(express.json());

app.use("/", userRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server berjalan....");
});
