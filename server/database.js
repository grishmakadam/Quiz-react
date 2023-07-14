const Sequelize = require("sequelize");

const sequelize = new Sequelize("quiz", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("./models/User")(sequelize, Sequelize);
const Score = require("./models/Score")(sequelize, Sequelize);

User.hasMany(Score);

db.sequelize
  .sync({ force: false })
  .then(async (res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = {db,User,Score}

//db.articles = require(“./article.model”)(sequelize, Sequelize);

//const db = {};

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
