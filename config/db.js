require("dotenv").config()
const mongoose = require("mongoose")
const connentDB = async () => {

  try {
    await mongoose.connect(
      // "mongodb://localhost/something",
      process.env.DB_Connetion_URI,

      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    console.log("db connected")
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}
module.exports = connentDB
