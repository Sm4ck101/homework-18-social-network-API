const { Thought, User } = require("../models");
const { Types } = require("mongoose");

const createThought = async (req, res) => {
  try {
    const thoughtCreated = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        thoughts: new Types.ObjectId(thoughtCreated._id),
      },
    });
    res.status(201).json(thoughtCreated);
  } catch (error) {
    console.log("Could not create thought", error);
    res.status(500).json(error);
  }
};

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).json(thoughts);
  } catch (error) {
    console.log("Get all thoughts errors", error);
    res.status(500).json(error);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    // console.log(thought.friendCount)
    res.status(200).json(thought);
  } catch (error) {
    console.log("Get one thought error", error);
    res.status(500).json(error);
  }
};

const deleteThoughtById = async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.thoughtId);
    res.status(202).json({ message: "thought deleted" });
  } catch (error) {
    console.log("Delete one thought error", error);
    res.status(500).json(error);
  }
};

const updateThoughtById = async (req, res) => {
  try {
    const thoughtUpdated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body
    );
    thoughtUpdated.thoughtText = req.body.thoughtText;
    res.status(202).json(thoughtUpdated);
  } catch (error) {
    console.log("User update error", error);
    res.status(500).json(error);
  }
};

const addReaction = async (req, res) => {
  try {
    const thoughtUpdated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $push: {
          reactions: req.body,
        },
      }
    );

    res.status(202).json(thoughtUpdated);
  } catch (error) {
    console.log("thought update error", error);
    res.status(500).json(error);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thoughtUpdated = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: {
          reactions: { reactionId: req.params.reactionId },
        },
      }
    );
    // userUpdated.friends.push(req.params.friendId)
    // const index = userUpdated.friends.indexOf(req.params.friendId)
    // userUpdated.friends.splice(index, 1)
    res.status(202).json(thoughtUpdated);
  } catch (error) {
    console.log("thought update error", error);
    res.status(500).json(error);
  }
};

module.exports = {
  createThought,
  getAllThoughts,
  getThoughtById,
  deleteThoughtById,
  updateThoughtById,
  addReaction,
  deleteReaction,
};
