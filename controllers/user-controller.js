const { User } = require("../models");
const { Types } = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("Get all users errors", error);
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const userCreated = await User.create(req.body);
    res.status(201).json(userCreated);
  } catch (error) {
    console.log("Could not create user", error);
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // console.log(user.friendCount)
    res.status(200).json(user);
  } catch (error) {
    console.log("Get one user error", error);
    res.status(500).json(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(202).json({ message: "User deleted" });
  } catch (error) {
    console.log("Delete one user error", error);
    res.status(500).json(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(
      req.params.userId,
      req.body
    );
    userUpdated.username = req.body.username;
    res.status(202).json(userUpdated);
  } catch (error) {
    console.log("User update error", error);
    res.status(500).json(error);
  }
};

const addFriend = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        friends: new Types.ObjectId(req.params.friendId),
      },
    });
    userUpdated.friends.push(req.params.friendId);
    res.status(202).json(userUpdated);
  } catch (error) {
    console.log("User update error", error);
    res.status(500).json(error);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.userId, {
      $pull: {
        friends: new Types.ObjectId(req.params.friendId),
      },
    });
    // userUpdated.friends.push(req.params.friendId)
    const index = userUpdated.friends.indexOf(req.params.friendId);
    userUpdated.friends.splice(index, 1);
    res.status(202).json(userUpdated);
  } catch (error) {
    console.log("User update error", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  addFriend,
  deleteFriend,
};
