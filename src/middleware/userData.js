const { default: axios } = require("axios");

const { API } = process.env;

const userData = async (req, res, next) => {
  try {
    let res = await axios.get(API);
      req.body.data = res.data.results;
      console.log(res.data.results)
    next();
  } catch (err) {
    res.status(500).send({ err: "Data collection to API failed !" });
  }
};

module.exports = { userData };
