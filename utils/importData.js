// require('dotenv').config();
// const asyncHandler = require('express-async-handler');
// const fs = require("fs");
// const User = require("../models/userModel");
// const connectDB = require("../config/db");

// connectDB();

// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// //console.log(users);
// const importData = asyncHandler (async () => {
//     try {
//         await User.create(users);
//         console.log(`Data Imported 👌`);
//         process.exit(0);
//     } catch (err) {
//         console.error(`There was an error 😢: ${err}`);
//         process.exit(1);
//     }
// });

// const deleteData = async () => {
//     try {
//       await User.deleteMany({});
//       console.log("Data successfully deleted");
//       process.exit();
//     } catch (error) {
//       console.log(`ERROR 💥: ${error}`);
//       process.exit(1);
//     }
//   };
  
//   if (process.argv[2] === "--import") {
//     importData();
//   } else if (process.argv[2] === "--delete") {
//     deleteData();
//   }