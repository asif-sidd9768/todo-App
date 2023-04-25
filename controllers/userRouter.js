const User = require('../models/user')
const shortid = require('shortid')
const userRouter = require('express').Router()
const { uniqueNamesGenerator, adjectives, names, animals } = require('unique-names-generator');

// userRouter.get("/", async (req, res) => {
//    // big_red_donkey
// //   const shortName = uniqueNamesGenerator({
// //   dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
// // }); // big-donkey
//   // const users = await User.find({}).populate("todos")
//   res.send(randomName)
// })

userRouter.post("/", async (req, res) => {
  const { userId } = req.body
  // console.log(userId)
  const foundUser = await User.findOne({userId}).populate("todos")
  if(!foundUser){
    res.status(501).send("user not found")
  }
  res.send(foundUser)
})

userRouter.post("/register", async(req, res) => {
  const userId = shortid.generate()
  const username = uniqueNamesGenerator({ dictionaries: [adjectives, names], separator: " " });
  const user = new User({
    userId,
    username
  })
  await user.save()
  res.send(user)
})

module.exports = userRouter