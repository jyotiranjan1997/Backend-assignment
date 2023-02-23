const express = require("express");
const { User } = require("../model/userModel");
const userRoute = express.Router();
const { userData } = require("../middleware/userData");

userRoute.get("/", async (req, res) => {
  try {
    const { page, gender, age } = req.query;
   
    const s = 10 * page;
    if (gender && age) {
        let data = await User.find({ gender: gender }).sort({"dob.age": age }).skip(s).limit(10);
      res.status(200).send({ user: data });
    } else if (gender) {
      let data = await User.find({ gender }).skip(s).limit(10);
      res.status(200).send({ user: data });
    } else if (age) {
      let data = await User.find().sort({'dob.age':age}).skip(s).limit(10);
      res.status(200).send({ user: data });
    } else {
      let data = await User.find().skip(s).limit(10);
      res.status(200).send({ user: data });
    }
  } catch (err) {
    res.status(500).send({ err: "failed data get" });
  }
});

userRoute.post("/", userData, async (req, res) => {
  const { data } = req.body;
  try {
    await User.insertMany(data);
    res.status(200).send({ msg: "Data stored in DB successfully !" });
  } catch (err) {
    res.status(500).send({ err: "Failed to store in DB !" });
  }
});

userRoute.delete("/", async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).send({ msg: "User deleted on DB successully !" });
  } catch (err) {
    res.status(500).send({ err: "Failed Delete in DB !" });
  }
});

module.exports = { userRoute };
