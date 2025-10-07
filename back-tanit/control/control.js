const users = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const codes = require("../schema/codeSchema");
const companies = require("../schema/companySchema");
const jobs = require("../schema/jobSchema");

const randomCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

exports.emailValidation = async (req, res) => {
  const { email, password, method } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  try {
    const userFound = await users.findOne({ email });
    const companyFound = await companies.findOne({ email });

    if (userFound || companyFound) {
      res.status(400).send({ msg: "user already exists" });
    } else {
      const code = randomCode();

      const mailOptions = {
        to: email,
        html: `
                  <h1>welcome to our website</h1>
                  <p>please click the link to verify your account</p>
                  <span>${code}</span>
                  
                  `,
      };
      const newCode = await codes.insertOne({
        code: code,
        email: email,
        password: password,
        method: method,
      });
      await transporter.sendMail(mailOptions, (error) => {
        if (error) throw error;
      });

      res.status(200).send({ msg: "verification mail sent successfully " });
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: "error while trying to send code ", error: error });
  }
};

exports.signUp = async (req, res) => {
  const { code } = req.body;

  try {
    const codeFound = await codes.findOne({ code });

    if (codeFound == null) {
      return res
        .status(400)
        .send({ msg: "code is not found in your database" });
    }

    const saltRounds = 10;
    const hpassword = bcrypt.hashSync(codeFound.password, saltRounds);

    if (codeFound.method === "company") {
      const newCompany = new companies({
        email: codeFound.email,
        password: hpassword,
        method: codeFound.method,
      });
      await newCompany.save();
      const token = jwt.sign(
        {
          id: newCompany._id,
          password: newCompany.password,
          method: newCompany.method,
        },
        "abc123",
        { expiresIn: "7d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "None",
      });

      await codes.deleteOne({ code: codeFound.code });
      return res
        .status(200)
        .send({ msg: "User created successfully", newCompany });
    } else {
      const newUser = new users({
        email: codeFound.email,
        password: hpassword,
        method: codeFound.method,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          password: newUser.password,
          method: newUser.method,
        },
        "abc123",
        { expiresIn: "7d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "None",
      });

      await codes.deleteOne({ code: codeFound.code });
      return res
        .status(200)
        .send({ msg: "User created successfully", newUser });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "Failed to create a new user", error: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await users.findOne({ email });
    const companyFound = await companies.findOne({ email });

    if (!userFound && !companyFound) {
      res.status(400).send({ msg: "user does not exist" });
    } else if (userFound) {
      const match = bcrypt.compareSync(password, userFound.password);
      const token = jwt.sign(
        {
          id: userFound._id,
          email: userFound.email,
          method: userFound.method,
        },
        "abc123",
        { expiresIn: "7d" }
      );

      if (!match) {
        res.status(400).send({ msg: "password u entered is wrong " });
      } else {
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "None",
        });
        res.status(200).send({ msg: "welcome in mr user ", userFound });
      }
    } else if (companyFound) {
      const match = bcrypt.compareSync(password, companyFound.password);
      const token = jwt.sign(
        {
          id: companyFound._id,
          email: companyFound.email,
          method: companyFound.method,
        },
        "abc123",
        { expiresIn: "7d" }
      );

      if (!match) {
        res.status(400).send({ msg: "password u entered is wrong " });
      } else {
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "None",
        });
        res.status(200).send({ msg: "welcome in mr user ", userFound });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: "error while trying to log in ", error: error });
  }
};

exports.getCurrent = async (req, res) => {
  const user = req.user;
  try {
    if (user.method === "company") {
      const companyFound = await companies
        .findById(user.id)
        .populate({ path: "jobs", populate: { path: "candidates" } });
      if (companyFound) {
        res.status(200).send({ msg: "coupmany found", user: companyFound });
      } else {
        res.status(400).send({ msg: "company not found" });
      }
    } else if (user.method === "user") {
      const userFound = await users.findById(user.id).populate("applied");
      if (userFound) {
        res.status(200).send({ msg: "user found", user: userFound });
      } else {
        res.status(400).send({ msg: "user is not found" });
      }
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to get the crrent user",
      error: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).send({ msg: "cookies deleted successfully" });
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to delete cookies",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.user.id;

  try {
    const userFound = await users.findById(id);
    if (!userFound) {
      res.status(400).send({ msg: "company email does not exist " });
    } else {
      const userUpdate = await users.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.status(200).send({ msg: "company profile updated ", userUpdate });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to update the company's profile",
      error: error.message,
    });
  }
};

exports.applyJob = async (req, res) => {
  const jobID = req.params.id;
  const userID = req.body.user;

  try {
    const jobFound = await jobs.findById(jobID);
    const userFound = await users.findById(userID);
    console.log(jobFound);
    console.log(userFound);

    if (!jobFound || !userFound) {
      console.log("not found");
      res.status(400).send({ msg: "user or job is not found in ur database" });
    } else {
      const jobInuser = userFound.applied.includes(jobID);
      if (jobInuser) {
        res.status(400).send({ msg: "job already exists" });
      } else {
        const updateUser = await users.findByIdAndUpdate(
          userID,
          {
            $push: { applied: jobID },
          },
          { new: true }
        );

        const updateJob = await jobs.findByIdAndUpdate(
          jobID,
          { $push: { candidates: userID } },
          { new: true }
        );

        res
          .status(200)
          .send({ msg: "jobb applied added to user ", updateUser, updateJob });
      }
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to push an applied jog to the user",
      error: error.message,
    });
  }
};

// exports.getAppliedJobs = async (req, res) => {
//   const id = req.user._id;
//   try {
//     const userFound = await users.findById(id).populate("applied");

//     if (userFound) {
//       res.status(200).send({ msg: "user found ", userFound });
//     } else {
//       res.status(400).send({ msg: "use is not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ msg: "error while trying to fetch use", error: error.message });
//   }
// };
exports.getUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const userFound = await users.findById(id);
    if (!userFound) {
      res.status(400).send({ msg: "user is not found" });
    } else {
      res.status(200).send({ msg: "user found", userFound });
    }
  } catch (error) {
    res.status(
      (500).send({ msg: "error while getting user", error: error.message })
    );
  }
};

exports.deleteAppliedJob = async (req, res) => {
  const jobID = req.params.id;
  const userID = req.user.id;

  try {
    const jobFound = await jobs.findById(jobID);
    const userFound = await users.findById(userID);
    console.log(jobFound);
    console.log(userFound);

    if (!jobFound || !userFound) {
      console.log("not found");
      res.status(400).send({ msg: "user or job is not found in ur database" });
    } else {
      const jobInuser = userFound.applied.includes(jobID);
      if (!jobInuser) {
        res.status(400).send({ msg: "job does not exist" });
      } else {
        const updateUser = await users.findByIdAndUpdate(
          userID,
          {
            $pull: { applied: jobID },
          },
          { new: true }
        );

        const updateJob = await jobs.findByIdAndUpdate(
          jobID,
          { $pull: { candidates: userID } },
          { new: true }
        );

        res
          .status(200)
          .send({ msg: "jobb applied added to user ", updateUser, updateJob });
      }
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to push an applied jog to the user",
      error: error.message,
    });
  }
};
