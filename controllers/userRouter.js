const User = require('../models/user')

const userRouter = require('express').Router()

userRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

userRouter.post("/", async (req, res) => {
  const { userId } = req.body
  // console.log(userId)
  const foundUser = await User.findOne({userId})
  if(!foundUser){
    res.status(501).send("user not found")
  }
  res.send(foundUser)
})

userRouter.post("/register", async(req, res) => {
  const userId = shortid.generate()
  const user = new User({
    userId
  })
  user.save()
  res.send(user)
})

module.exports = userRouter