const mysql = require("mysql2/promise");
const config = require("../config/config");

let connection;

const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createPool(config);
  }
  return connection;
};

module.exports = getConnection;
