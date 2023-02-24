const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDb Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
