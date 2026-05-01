console.log("App starting...");
require("dotenv").config();
const User = require("./User");
const Task = require("./Task");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));

// Test route
app.get("/", (req,res)=>{
  res.send("Server working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title
  });

  await task.save();
  res.send(task);
});
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (user) {
    res.send(user);
  } else {
    res.send({ message: "Invalid credentials" });
  }
});
