const { User } = require("../database");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/createAndVerifyToken");
module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
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
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true,name:user.name,email:user.email });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  
};
