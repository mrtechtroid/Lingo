const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO;

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

