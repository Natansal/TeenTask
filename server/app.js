const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const userAccess = require("./routes/user_access");
const userInfo = require("./routes/user_info");
const jobRouter = require("./routes/job");
const reviewRouter = require("./routes/reviews");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: true }));

app.use("/user_access", userAccess);
app.use("/users", userInfo);
app.use("/jobs", jobRouter);
app.use("/reviews", reviewRouter);

module.exports = app;
