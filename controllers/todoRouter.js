const TODO_TYPE = require("../constants/todoType")
const Todo = require("../models/todo")
const User = require("../models/user")

const todoRouter = require("express").Router()

// todoRouter.get("/", async (req, res) => {
//   const todos = await Todo.find({})
//   res.status(200).send(todos)
// })

todoRouter.post("/", async (req, res) => {
  const { userId, eventName, eventType } = req.body
  const foundUser = await User.findOne({userId})
  if(!foundUser){
    return res.send("User not found")
  }
  const todo = new Todo({
    content: eventName,
    isCompleted: false,
    type: TODO_TYPE[eventType] ?? TODO_TYPE["Others"],
    creationDate: new Date()
  })
  foundUser.todos = [...foundUser.todos, todo]
  foundUser.save()
  await todo.save()
  // res.send("saved")
  res.status(200).send(todo)
})

todoRouter.post("/edit/:id", async (req, res) => {
  const todoId = req.params.id
  const { userId } = req.body
  const foundUser = await User.findOne({userId}).populate("todos")
  if(!foundUser){
    return res.status(404).send("User not found")
  }
  const foundTodo = await Todo.findById(todoId)
  foundTodo.isCompleted = !foundTodo.isCompleted
  await foundTodo.save()
  res.send(foundUser)
})

todoRouter.delete("/", async (req, res) => {
  const {todoId, userId} = req.body
  const foundUser = await User.findOne({userId}).populate('todos')
  if(!foundUser){
    return res.status(404).send("User not found")
  }
  foundUser.todos = foundUser.todos.filter(({id}) => id !== todoId)
  try {
    await Todo.findByIdAndDelete(todoId)
    foundUser.save()
  }catch(error){
    console.log(error)
  }
  res.status(200).send('done')
})

module.exports = todoRouter