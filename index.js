const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
mongoose.connect(process.env.MONGO_URL);

const cookieParser = require("cookie-parser");
const { protect } = require("./middlewares/protect");
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin:"https://mern-auth-gy5d.onrender.com/"
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//middlewares

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/todo", protect, require("./routes/todoRoutes"));

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
