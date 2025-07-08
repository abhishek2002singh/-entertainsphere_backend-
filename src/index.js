const express = require("express");
const { connectCloudinary } = require("./config/cloudinary");

require("dotenv").config();

const app = express();
const databaseConnection = require("./config/database");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const cors = require("cors");
const corsOptions = {
  //  origin:'http://localhost:5173',
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "DevTender Backend is running 🚀" });
});

// Routes
const handlerouter = require("./routes/router");

app.use("/user/v1", handlerouter);

connectCloudinary();
// Start Server
databaseConnection()
  .then(() => {
    console.log("Connection successful");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
