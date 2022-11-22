const { initDB } = require("./server");
const { deleteAll } = require("./controllers/todo");

module.exports = async () => {
  try {
    await initDB();
    await deleteAll();
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
};
