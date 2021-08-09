import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    const error = new Error("Invalid email or password");
    throw error;
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

export const registerUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exits");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Get user profile
// @route POST /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const upadatedUser = await user.save();
    res.json({
      _id: upadatedUser._id,
      name: upadatedUser.name,
      email: upadatedUser.email,
      isAdmin: upadatedUser.isAdmin,
      token: generateToken(upadatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @route Delete /api/users/:id
// @access Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if(user){
    res.json(user);
  }else{
    res.status(404);
    throw new Error("User not found")
  }
 
});


// @desc Update User
// @route PUT /api/users/id
// @access Private/Admin

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin 


    const upadatedUser = await user.save();
    res.json({
      _id: upadatedUser._id,
      name: upadatedUser.name,
      email: upadatedUser.email,
      isAdmin: upadatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});