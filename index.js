const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/userRoutes");
require("dotenv").config({ path: "./.env" });

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//middlewares

app.use("/api/user", routes);

mongoose.connect(process.env.MONGO_URL);
const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`MONGO CONNECTED`);
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`SERVER RUNNING : http://localhost:${PORT}`);
      }
    });
  }
});
