const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://krimiseif140:VAqweZMrXclUEZCO@cluster0.nk16i.mongodb.net/TanitJobs"
    );
    console.log("database is connected ");
  } catch (error) {
    console.log("error while trying to connect to database");
  }
};
