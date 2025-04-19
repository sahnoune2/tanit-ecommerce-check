const jwt = require("jsonwebtoken");
const users = require("../schema/userSchema");
const companies = require("../schema/companySchema");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const verify = jwt.verify(token, "abc123");
    console.log(verify);

    const userFound = await users.findById(verify.id);
    const companyFound = await companies.findById(verify.id);

    if (!userFound && !companyFound) {
      res.status(400).send({ msg: " isauth user does not exist " });
    } else if (userFound) {
      req.user = userFound;
      console.log(req.user.id);
      next();
    } else if (companyFound) {
      req.user = companyFound;

      next();
    }
  } catch (error) {
    res
      .status(500)
      .send({
        msg: "error while trying to authentificate u ",
        error: error.message,
      });
  }
};
