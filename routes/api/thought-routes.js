const {
  createThought,
  getAllThoughts,
  getThoughtById,
  deleteThoughtById,
  updateThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");
const router = require("express").Router();

router.route("/").post(createThought);

router.route("/").get(getAllThoughts);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .delete(deleteThoughtById)
  .put(updateThoughtById);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
