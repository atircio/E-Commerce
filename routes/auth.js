const router = require("express").Router();
const UserModal = require("../src/models/User");
const CryptoJS = require("crypto-js");

//RERGISTER

router.post("/register", async (req, res) => {
  const newUser = new UserModal({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
