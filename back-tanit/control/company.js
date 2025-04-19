const jobs = require("../schema/jobSchema");
const companies = require("../schema/companySchema");
const users = require("../schema/userSchema");

exports.addJob = async (req, res) => {
  const company = req.user.id;
  const { description, title, location, requirements } = req.body;
  try {
    const newJob = new jobs({
      description: description,
      title: title,
      location: location,
      requirements: requirements,
      company: company,
    });
    await newJob.save();
    const updateCompany = await companies.findByIdAndUpdate(
      company,
      { $push: { jobs: newJob._id } },
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "job added successfully ", newJob, updateCompany });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "error while trying to add a job", error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const job = await jobs.find().populate("candidates");

    res.status(200).send({ msg: "all the jobs r here ", job });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "error while trying get the jobs ", error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  const id = req.user.id;

  try {
    const companyFound = await companies.findById(id);
    if (!companyFound) {
      res.status(400).send({ msg: "company email does not exist " });
    } else {
      const companyUpdate = await companies.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.status(200).send({ msg: "company profile updated ", companyUpdate });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to update the company's profile",
      error: error.message,
    });
  }
};
exports.updateJob = async (req, res) => {
  const id = req.params.id;
  try {
    const jobFound = await jobs.findById(id);

    if (!jobFound) {
      res.status(400).send({ msg: "job is not found " });
    } else {
      const updateJob = await jobs.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.status(200).send({ msg: "job updated successfully " });
    }
  } catch (error) {
    res.status(500).send({ msg: "error while trying to update the job" });
  }
};
exports.deleteJob = async (req, res) => {
  const id = req.params.id;

  try {
    const jobFound = await jobs.findById(id);

    if (!jobFound) {
      res.status(400).send({ msg: "job is not found" });
    } else {
      const jobDelete = await jobs.findByIdAndDelete(id);
      const companyJobDelete = await companies.updateMany(
        { jobs: id },
        { $pull: { jobs: id } }
      );

      const updateResult = await users.updateMany(
        { applied: id },
        { $pull: { applied: id } }
      );
      res.status(200).send({ msg: "job deleted " });
    }
  } catch (error) {
    res.status(500).send({
      msg: "error whilte trying to delete a job ",
      error: error.message,
    });
  }
};
