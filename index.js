const express = require("express");
// const mongoose = require("mongoose");

const app = express();
// mongoose.connect(process.env.MONGO_URL);
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`SERVER RUNNING : http://localhost:${PORT}`);
  }
});
