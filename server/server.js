const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
//database connection
mongoose
  .connect(
    "mongodb+srv://hp523674:harii0@solace.wfupvri.mongodb.net/solace?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
// import routes
const userRoute = require("./routes/userRoute");
const doctorRoute = require("./routes/doctorRoute");

app.use("/uploads", express.static("uploads"));
//routes
app.use("/login", userRoute);
//signup route
app.use("/", userRoute);
//get user details
app.use("/", userRoute);
//Update user details
app.use("/", userRoute);
//forget password
app.use("/", userRoute);

//doctor routes
app.use("/", doctorRoute);
