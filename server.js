//imports
const { errorHandler } = require("./middleware/errorMiddleware");
const asyncHandler = require('express-async-handler');
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
const cookie_parser = require("cookie-parser");

//Routes Imports
const JobRequests = require("./routes/jobrequestsRoutes");
const User = require("./routes/userRoutes");
const ContractorsRoutes = require("./routes/ContractorsRoutes");
const amIAContractor = require("./controllers/contractorController");
const port = process.env.PORT || 5000;

connectDB(); // connect to database function

//enable express middleware
const app = express();
app.use(express.json());
app.use(cookie_parser());
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

//set views
app.use(expressLayouts); // allows us to use ejs layouts
app.set("views", "./views");
app.set("view engine", "ejs");

let fileData = fs.readFileSync("./utils/services.json");
var industryObj = JSON.parse(fileData);

//render pages
//@Desc: routes to render the pages
app.get("/about", (req, res) => {
  session = req.headers.cookie;
  res.render("about");
}); //display the index page
app.get("/", (req, res) => {
  session = req.headers.cookie;
  res.render("index", {title: "Home"});
}); //display the index page
app.get("/signup", (req, res) => {
  res.render("signup", {title: "signup"});
}); //end of app.get
app.get("/contact", (req, res) => {
  session = req.headers.cookie,
  res.render("contact", {title: "contact"});
}); //end of app.get
app.get("/createjobform", (req, res) => {
  session = req.headers.cookie,
  res.render("createjobform", { industryObj: industryObj });
}); //end of app.get
app.get("/signin", (req, res) => {
  res.render("signin", {title: "signin"});
}); //end of app.get
app.get("/contractorform", (req, res) => {
  session = req.headers.cookie,
  res.render("contractorform" , {title: "contractor form"});
}); //end of app.get
app.get("/components/contractorupdateform", (req, res) => {
  session = req.headers.cookie,
  res.render("contractorupdateform", {title: "contractor update form"});
}); //end of app.get
app.get("/contractoroverview", (req, res) => {
  session = req.headers.cookie,
  res.render("contractoroverview", {title: "contractor update form"});
}); //end of app.get
app.get("/jobupdateform", (req, res) => {
  session = req.headers.cookie,
  res.render("jobupdateform");
}); //end of app.get
app.get("/404", (req, res) => {
  res.render("404");
}); //end of app.get

app.get("/401", (req, res) => {
  res.render("401");
});

app.get("/contractor_signin", (req, res) => {
  session = req.headers.cookie,
  res.render("contractor_signin");
});

//API routes
//@Desc: routes used to get data from the database
app.use("/users", User);
app.use("/jobrequests", JobRequests);
app.use("/contractor", ContractorsRoutes);
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

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
