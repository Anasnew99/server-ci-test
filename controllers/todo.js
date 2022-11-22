const { query, TABLE_NAME } = require("../db");
const createToDo = (title = "") => {
  return query(`INSERT INTO ${TABLE_NAME} (title) VALUES (?)`, [title]);
};

const getToDo = (id = 0) => {
  return query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);
};

const getToDos = () => {
  return query(`SELECT * FROM ${TABLE_NAME}`);
};

const updateToDo = (id = 0, title = "", completed = false) => {
  return query(
    `UPDATE ${TABLE_NAME} SET title = ?, completed = ? WHERE id = ?`,
    [title, completed, id]
  );
};

const deleteToDo = (id = 0) => {
  return query(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
};

const deleteAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await query(`DELETE FROM ${TABLE_NAME}`);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createToDo,
  getToDo,
  getToDos,
  updateToDo,
  deleteToDo,
  deleteAll,
};
