module.exports = (sequelize, Sequelize) => {
  const Score = sequelize.define("score", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quiz_score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Score;
};
