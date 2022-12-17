const { hashPass } = require("../helpers/bcrypt");
const User = require("../models/users");

exports.createUser = async (req, res, next) => {
  try {
    // 1) Validasi Request
    if (!req.body.username) throw new Error("Username required");
    if (req.body.username.length < 6) throw new Error("Username min 6 length");
    if (!req.body.password) throw new Error("Password required");
    if (!req.body.role) throw new Error("Role required");

    // 2) Cek username exist / not
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) throw new Error("Username already exist, please try another username");

    // 3) Create new user + bcrypt password
    const newUser = await User.create({
      username: req.body.username,
      password: await hashPass(req.body.password),
      role: req.body.role,
    });

    // 4) Send response
    res.send({
      status: true,
      data: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unknown Error",
    });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    // 1) get all user (page & limit)
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;

    const users = await User.find().skip((page - 1) * limit).limit(limit).sort('-createdAt').select("-password");

    // 2) Send response
    res.send({
      status: true,
      data: users,
    });
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unknown Error",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // 1) Validasi ID / Request
    const id = req.params.id;
    if (!id) throw new Error("Bad request");

    // 2) Cek User ke DataBase
    const user = await User.findById(id);
    if (!user) throw new Error("Bad request");

    // 3) Cek Password Dan Konfirmasi Password
    if (req.body.password || req.body.confirmation_password || (req.body.password && req.body.confirmation_password)) {
      if (req.body.password != req.body.confirmation_password) throw new Error("Password and Confirmation password not match");
    }

    // 4) Update Data User
    user.username = req.body.username || user.username;
    user.password = req.body.password ? await hashPass(req.body.password) : user.password;
    user.role = req.body.role || user.role;

    await user.save();

    // 5) Response

    res.send({
      status: true,
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unknown Error",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({
      status: true,
      data: {
        message: 'Success to delete user',
      }
    });
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unknown Error",
    });    
  }
}
