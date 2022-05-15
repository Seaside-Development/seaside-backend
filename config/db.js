const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline)
  } catch (error) {
    console.log(`There was an error: ${error}`.red.underline)
    process.exit(1)
  }
}

module.exports = connectDB