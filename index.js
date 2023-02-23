require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./src/config/db");
const { userRoute } = require("./src/routes/userRoute");
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

app.listen(5000, async (req, res) => {
  await connect();
  console.log("listening at 50000");
});
