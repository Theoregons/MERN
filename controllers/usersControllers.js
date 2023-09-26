const User = require('../models/User')
// const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route Get /users
// @access private
const getAllUsers = asyncHandler (async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users.length){
        return res.status(404).json({message : 'no users found'})
    }
    res.json(users)
})

// @desc Create all users
// @route POST /users
// @access private
const createNewUser = asyncHandler (async (req,res) => {
    const { username, password, roles} = req.body

    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message : 'all field required'})
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate){
        return res.status(409).json({message : 'duplicate username'})
    }

    const hashPwd = await bcrypt.hash(password, 10)

    const userObject = { username, "password": hashPwd, roles}

    //store new user
    const user = await User.create(userObject)

    if (user){ //created
        res.status(201).json({message: 'created'})
    } else {
        res.status(400).json({message: 'invalid data received'})
    }
})

// @desc Update all users
// @route PATCH /users
// @access private
const updateUser = asyncHandler (async (req,res) => {

})

// @desc Delete all users
// @route DELETE /users
// @access private
const deleteUser = asyncHandler (async (req,res) => {

})

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}