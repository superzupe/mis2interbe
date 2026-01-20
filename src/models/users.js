const getConnection = require("../db/connection");

//GET all users
const getAllUsers = async () => {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM users");

  return rows;
};

//GET user by ID
const getUserById = async (id) => {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

  return rows[0];
};

//INSERT
const createUser = async (data) => {
  const db = await getConnection();
  const [result] = await db.query(
    "INSERT INTO users (nama_lengkap, email, password, no_hp) VALUES (?, ?, ?, ?)",
    [data.nama_lengkap, data.email, data.password, data.no_hp || null]
  );

  return {
    id: result.insertId, //id yang otomatis dibuat oleh db
  };
};

//UPDATE
const updateUser = async (id, data) => {
  const db = await getConnection();

  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  if (!rows[0]) return { affectedRows: 0 };

  const user = rows[0];

  const [result] = await db.query(
    "UPDATE users SET nama_lengkap=?, email=?, password=?, no_hp=? WHERE id=?",
    [
      data.nama_lengkap || user.nama_lengkap,
      data.email || user.email,
      data.password || user.password,
      data.no_hp ?? user.no_hp,
      id,
    ]
  );

  return {
    affectedRows: result.affectedRows,
  };
};

//DELETE
const deleteUser = async (id) => {
  const db = await getConnection();
  const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);

  return {
    affectedRows: result.affectedRows,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
