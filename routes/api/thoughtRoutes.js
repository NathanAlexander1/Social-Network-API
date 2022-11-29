const router = require("express").Router();
const { Thought, User } = require("../../models");

//get all thoughts
router.get("/", (req, res) => {
  Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

//get one thought by id
router.get("/:thoughtId", (req, res) => {
  Thought.findOne({ _id: req.params.thoughtId })
    // .populate({ path: 'thoughts' })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

//create new thought
router.post("/", (req, res) => {
  Thought.create(req.body).then((thought) => {
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { thoughts: thought._id },
      },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user with that ID, but thought was created",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  });
});

//update thought by id
router.put("/:thoughtId", (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});

//delete thought by id
router.delete("/:thoughtId/:userId", (req, res) => {
  Thought.findByIdAndDelete(req.params.thoughtId).then((thought) => {
    !thought
      ? res.status(404).json({ message: "No thought with that ID" })
      : User.findByIdAndUpdate(
          req.params.userId,
          {
            $pull: { thoughts: req.params.thoughtId },
          },
          { new: true }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "No user with that ID" })
            : res.json(user)
        );
  });
});
//add new reaction
router.post("/:thoughtId/reactions", (req, res) => {
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    {
      $addToSet: { reactions: req.body },
    },
    { new: true }
  ).then((thought) =>
    !thought
      ? res.status(404).json({ message: "No thought with that ID" })
      : res.json(thought)
  );
});

//delete reaction
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
})

module.exports = router;
