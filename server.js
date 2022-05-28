//imports
const { errorHandler } = require("./middleware/errorMiddleware");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const colors = require("colors");
const path = require("path");
const cors = require("cors");
const ejs = require("ejs");

const port = process.env.PORT || 5000;

connectDB(); // connect to database function

//enable express middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable CORS
app.use("/", cors());

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "frontend/public/css"));
app.use("/css", express.static(__dirname + "frontend/public/js"));
app.use("/css", express.static(__dirname + "frontend/public/attachments"));

//set views
app.use(expressLayouts); // allows us to use ejs layouts
app.set("views", "./views");
app.set("view engine", "ejs");

//render pages
app.get("", (req, res) => { res.render("index");}); //display the index page
app.get("/user-registration-form", (req, res) => {res.render("user-registration-form");}); //end of app.get

//api pathways
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobrequests", require("./routes/jobrequestsRoutes"));
app.use("/api/contractor", require("./routes/ContractorsRoutes"));
app.use(errorHandler); //pathway to the error handler

// check that app is running on production mode
if (process.env.NODE_ENV === "production") {
  //forces https on the website
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

//check for the port
app.listen(port, () => console.log(`Server started on port ${port}`));
