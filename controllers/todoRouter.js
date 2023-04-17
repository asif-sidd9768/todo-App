const Todo = require("../models/todo")
const User = require("../models/user")

const todoRouter = require("express").Router()

todoRouter.get("/", async (req, res) => {
  const todos = await Todo.find({})
  res.status(200).send(todos)
})

todoRouter.post("/", async (req, res) => {
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
  res.status(200).send(todo)
})

module.exports = todoRouter