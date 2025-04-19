const express = require("express");
const {
  signUp,
  emailValidation,
  signIn,
  getCurrent,
  logOut,
  updateUser,
  applyJob,
  getAppliedJobs,
  getUserId,
  deleteAppliedJob,
} = require("../control/control");
const { auth } = require("../middleware/isAuth");
const {
  addJob,
  getAllJobs,
  updateCompany,
  updateJob,
  deleteJob,
} = require("../control/company");

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/code", emailValidation);
userRouter.post("/signin", signIn);
userRouter.get("/getCurrent", auth, getCurrent);

userRouter.delete("/deletecookie", logOut);
userRouter.post("/addjob", auth, addJob);
userRouter.get("/getjobs", getAllJobs);

userRouter.put("/updatecompany", auth, updateCompany);
userRouter.put("/editjob/:id", updateJob);
userRouter.delete("/deletejob/:id", deleteJob);

userRouter.put("/updateuser", auth, updateUser);
userRouter.put("/applyjob/:id", applyJob);
// userRouter.get("/getappliedjobs", auth, getAppliedJobs);
userRouter.get("/getuserid/:id", getUserId);
userRouter.put("/deleteapplied/:id", auth, deleteAppliedJob);

module.exports = userRouter;
