const { initDB } = require("./server");
const { deleteAll } = require("./controllers/todo");
const { endDB } = require("./db");

module.exports = async () => {
  try {
    await initDB();
    await deleteAll();
    await endDB();
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
};
