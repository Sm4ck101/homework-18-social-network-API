const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");
const router = require("express").Router();

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:userId")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
