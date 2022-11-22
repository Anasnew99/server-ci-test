const { endDB } = require("./db");

module.exports = async () => {
  await endDB();
  process.exit(0);
};
