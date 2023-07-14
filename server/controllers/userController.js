const { User } = require("../database");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/createAndVerifyToken");
module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const t = await User.findOne({ where: { email: email } });

      if (t) {
        res.status(400).json({ message: "User already exists!!!" });
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      const token = createSecretToken(email);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
        secure: true,
      });
      res.status(201).json({
        message: "User signed in successfully",
        success: true,
        name: user.name,
        email: user.email,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const u = await User.findOne({ where: { email: email } });
      console.log(u)
      if (!u) {
        res.status(400).json({ message: "User does not exist" });
      }

      const auth = await bcrypt.compare(password, u.password);
      if (!auth) {
        return res.json({ message: "Incorrect password or email" });
      }
      const token = createSecretToken(u.email);
      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
      });
      res.status(200).json({
        message: "User signed in successfully",
        success: true,
        name: u.name,
        email: u.email,
      });
    } catch (e) {
     
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
};
