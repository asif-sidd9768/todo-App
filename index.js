require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./models/todo")
const User = require("./models/user")
const shortid = require("shortid")
const app = express()

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to DB")
}).catch((error) => console.log("Failed to connect ", error.message))

app.use(express.static('build'))
app.use(express.json())

app.get("/user", async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

app.post("/user", async (req, res) => {
  const { userId } = req.body
  // console.log(userId)
  const foundUser = await User.findOne({userId})
  console.log(foundUser)
  if(foundUser){
    res.send(foundUser)
  }else{
    res.send('no luck')
  }
  console.log(foundUser)
})

app.post("/user/register", async(req, res) => {
  const userId = shortid.generate()
  const user = new User({
    userId
  })
  user.save()
  res.send(user)
})

app.get("/", async (req, res) => {
  const todos = await Todo.find({})
  res.status(200).send(todos)
})

app.post("/", async (req, res) => {
  const { userId, content } = req.body
  const foundUser = await User.findOne({userId})
  if(!foundUser){
    return res.send("User not found")
  }
  const todo = new Todo({
    content,
    isCompleted: false
  })
  foundUser.todos = [...foundUser.todos, todo]
  foundUser.save()
  console.log(todo)
  await todo.save()
  // res.send("saved")
  res.status(200).send("saved")
})

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`)
})