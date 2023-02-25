const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}!`);
});
