const express = require("express");
const port = 5000;
const app = express();
const config = require("./config/config");
const cors = require("cors");
const userRouter = require("./router/router");
const cookieParser = require("cookie-parser");

app.use(express.json());

config();
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // allow all origins dynamically
    },
    credentials: true,
  })
);

// app.use("/", userRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log("server is running");
});
