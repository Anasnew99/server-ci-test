const { endDB } = require("./db");

module.exports = async () => {
  await endDB();
};
