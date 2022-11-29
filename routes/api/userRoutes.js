const router = require("express").Router();
const { User } = require("../../models");

//get all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

//get one user by id
router.get("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId })
    // .populate({ path: 'thoughts' })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});

//create new user
router.post("/", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

//update user by id
router.put("/:userId", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});

//delete user by id
router.delete("/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({ message: "user removed" })
    )
    .catch((err) => res.status(500).json(err));
});

//add new friend
router.post("/:userId/friends", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $addToSet: { friends: req.body.friendId },
    },
    { runValidators: true, new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

//delete friend
router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
})

module.exports = router;
