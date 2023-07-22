const router = require("express").Router();
const UserModal = require("../src/models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
  try {
    //User validation
    const user = await UserModal.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    //Password decryption
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    //password validation
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    //Send a valid login
    res.status(200).json({ ...others, accessToken });
  } catch (error) {}
});

module.exports = router;
