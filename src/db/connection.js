const mysql = require("mysql2/promise");
const config = require("../config/config");

let connection;

const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(config);
  }
  return connection;
};

module.exports = getConnection;
