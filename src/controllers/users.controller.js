const {
  getAllUsers: getAllUsersModel,
  getUserById: getUserByIdModel,
  createUser: createUserModel,
  updateUser: updateUserModel,
  deleteUser: deleteUserModel,
} = require("../models/users");

//GET all
const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersModel();
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Tidak ada user",
        data: null,
      });
    }

    return res.status(200).json({
      message: "User berhasil diambil",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

//GET by Id
const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdModel(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "Tidak ada user yang sesuai",
        data: null,
      });
    }

    return res.status(200).json({
      message: "User berhasil diambil",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

//CREATE
const createUser = async (req, res, next) => {
  try {
    const { nama_lengkap, email, password } = req.body;

    if (!nama_lengkap || !email || !password) {
      return res.status(400).json({
        message: "nama lengkap, email, dan password harus diisi",
        data: null,
      });
    }

    const result = await createUserModel(req.body);

   return res.status(201).json({
      message: "User berhasil dibuat",
      data: {
        id: result.id, //pakai id dari model
        ...req.body,
      },
    });
  } catch (err) {
    next(err);
  }
};

//UPDATE
const updateUser = async (req, res, next) => {
  try {
    const result = await updateUserModel(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        data: null,
      });
    }

   return res.status(200).json({
      message: "User berhasil diupdate",
      data: {
        id: req.params.id,
        ...req.body,
      },
    });
  } catch (err) {
    next(err);
  }
};

//DELETE
const deleteUser = async (req, res, next) => {
  try {
    const result = await deleteUserModel(req.params.id)

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      })
    }

    return res.status(200).json({
      message: "User berhasil dihapus"
    })
  } catch (err) {
    next(err)
  }
}; 

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
