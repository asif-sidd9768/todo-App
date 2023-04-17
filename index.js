require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./models/todo")
const User = require("./models/user")
const shortid = require("shortid")
const userRouter = require("./controllers/userRouter")
const todoRouter = require("./controllers/todoRouter")
const app = express()

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to DB")
}).catch((error) => console.log("Failed to connect ", error.message))

app.use(express.static('build'))
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/todo", todoRouter)

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`)
})