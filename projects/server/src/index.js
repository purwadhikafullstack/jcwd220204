// https://nginep-f1ba2-default-rtdb.firebaseio.com/
const path = require("path");
dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("../models");
const authRoute = require("../routes/authRoute");
const propertiesRoute = require("../routes/propertiesRoute");
const roomRoute = require("../routes/roomRoute");
const tenantRoute = require("../routes/tenantRoute");
const citiesRoute = require("../routes/citiesRoute");
const calendarRoute = require("../routes/calendarRoute");
const transactionRoute = require("../routes/transactionRoute");
const reviewRoute = require("../routes/reviewRoute");

const fs = require("fs");
const categoryRoute = require("../routes/categoriesRoute");
const schedule = require("../schedule/paymentCheck");

const { verifyToken } = require("../middlewares/authMiddleware");

const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    // origin: [
    //   process.env.WHITELISTED_DOMAIN &&
    //     process.env.WHITELISTED_DOMAIN.split(","),
    // ],
  })
);

app.use(express.json());
app.use("/api", express.static(path.join(__dirname, ".././public")));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/review", reviewRoute);

app.use("/api/property", propertiesRoute);
app.use("/api/room", roomRoute);
app.use("/api/tenant", tenantRoute);
app.use("/api/cities", citiesRoute);
app.use("/api/category", categoryRoute);

// const register = require("./routes/register")

// app.use("/signup", register)

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    db.sequelize.sync({ alter: true });

    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
