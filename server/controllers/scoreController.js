const { Score, User } = require("../database");

module.exports = {
  addScore: async (req, res) => {
    try {
      const { email, category, score } = req.body;
      const user = await User.findOne({ where: { email: email } });
      console.log(user);
      const t = await Score.create({
        categoryName: category,
        quiz_score: score,
        userId: user.id,
      });

      return res.json(t);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong!!!" });
    }
  },
  showScore: async (req, res) => {
    try {
      const { email } = req.params
      const user = await User.findOne({ where: { email: email } });
      const scores = await Score.findAll({ where: { userId: user.id } })
      return res.json(scores)
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong!!!" });
    }
  }
};
