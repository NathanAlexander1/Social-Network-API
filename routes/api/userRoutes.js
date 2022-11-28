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


//create new user

//update user by id

//delete user by id

//

module.exports = router;
