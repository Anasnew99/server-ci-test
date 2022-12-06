var mysql = require("mysql");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}; // if we want to use other config for test or production, we can change this line by using process.env.NODE_ENV
var connection = mysql.createPool(config);

const query = (query = "", params = []) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((er, c) => {
      if (er) reject(er);
      if (c) {
        c.query(query, params, (error, results, fields) => {
          c.release();
          if (error) reject(error);
          resolve(results);
          if (process.env.NODE_ENV === "test") {
            connection.end();
            connection = mysql.createPool(config);
          }
        });
      }
    });
  });
};

const endDB = () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const prefix = "";
const TABLE_NAME = `${prefix}_todo`;
const initDB = async () => {
  try {
    await query(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false
    )
    `
    );

    console.log("Database initialized, Table created ", TABLE_NAME);
  } catch (e) {
    console.log("DB initialization failed", e);
  }
};

module.exports = {
  initDB,
  TABLE_NAME,
  query,
  endDB,
};
