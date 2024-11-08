const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
require('dotenv').config();
require("./models/db");
const APIRouter = require("./routes/APIRoutes");
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/ping", (req, res) => {
  res.send("Submission for MERNIFY \n Current Date: " + new Date());
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/api_r", APIRouter);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const User = mongoose.model("User", {
//   name: String,
//   email: String,
//   password: String,
// });