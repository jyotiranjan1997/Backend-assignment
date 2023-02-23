const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB Conntected....");
  } catch (err) {
    console.log("DB Conntection Failed....");
  }
};

module.exports = { connect };
