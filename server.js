//imports
const { errorHandler } = require("./middleware/errorMiddleware");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const colors = require("colors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const ejs = require("ejs");
const fs = require("fs");

const JobRequests = require("./routes/jobrequestsRoutes");

const ejsLint = require("ejs-lint");
const port = process.env.PORT || 5000;

connectDB(); // connect to database function

//enable express middleware
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//Enable CORS
app.use("/", cors());

//static files
app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "frontend/public/css"));
// app.use("/css", express.static(__dirname + "frontend/public/js"));
// app.use("/css", express.static(__dirname + "frontend/public/attachments"));

//set views
app.use(expressLayouts); // allows us to use ejs layouts
app.set("views", "./views");
app.set("view engine", "ejs");

let fileData = fs.readFileSync("./utils/services.json");
var industryObj = JSON.parse(fileData);

//render pages
//@Desc: routes to render the pages
app.get("/useraccount", (req, res) => {
  res.render("useraccount");
}); //end of app.get
app.get("/", (req, res) => {
  res.render("index");
}); //display the index page
app.get("/user-registration-form", (req, res) => {
  res.render("user-registration-form");
  res.redirect("/");
}); //end of app.get
app.get("/contractorform", (req, res) => {
  res.render("contractorform");
}); //end of app.get
app.get("/createjobform", (req, res) => {
  res.render("createjobform", { industryObj: industryObj });
  res.redirect("/job-list");
}); //end of app.get
app.get("/signin", (req, res) => {
  res.render("signin");
}); //end of app.get
app.get("/contractorpreview", (req, res) => {
  res.render("contractorpreview");
}); //end of app.get

//API routes
//@Desc: routes used to get data from the database
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobrequests", JobRequests);
app.use("/api/contractor", require("./routes/ContractorsRoutes"));
app.use(errorHandler); //pathway to the error handler

// check that app is running on production mode
if (process.env.NODE_ENV === "production") {
  //forces https on the website
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

//check for the port
app.listen(port, () =>
  console.log(`Server started on port ${port}`.blue.underline)
);
