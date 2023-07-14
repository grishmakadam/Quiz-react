const jwt = require("jsonwebtoken");
const { User } = require("../database");

module.exports = {
  createSecretToken: (id) => {
    console.log(process.env.TOKEN_KEY);
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
  },

  userVerification: async (req, res, next) => {
    if (!req.cookies) {
      return res.json({ status: false });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false });
    }
    try {
      const { id } = await jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findOne({ where: { email: id } });
      req.name = user.dataValues.name;
      req.email = user.dataValues.email;
      next();
    } catch (e) {
      // console.log(e.message);
      res.clearCookie("token");
      res.status(401).json({ error: "Request is not authorized" });
    }
  },
  clearCookie: async (req, res, next) => {
    res.clearCookie("token");
    res.send({ success: true });
  },
};
