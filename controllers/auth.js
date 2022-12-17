const { comparePass } = require("../helpers/bcrypt");
const User = require("../models/users");
const jwt = require('jsonwebtoken');

exports.userLogin = async (req, res, next) => {
  try {
    // 1) validasi request (username, password required)
    if (!req.body.username) throw new Error("Username required");
    if (req.body.username.length < 6) throw new Error("Username min 6 length");
    if (!req.body.password) throw new Error("Password required");

    // 2) cek username ke database (findOne)
    const user = await User.findOne({
      username: req.body.username,
    });

    // 3) jika user tidak terdaftar, tolak
    if (!user) throw new Error("User is not registered");
    
    // 4) cek pasword benar / tidak
    const validPass = await comparePass(req.body.password, user.password);
    if (!validPass) throw new Error ("Wrong password");

    // 5) create jwt
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.SECRET_KEY, { expiresIn: '7h' });

    // 6) response
    res.send({
      status: true,
      data: {
        token: token
      }
    })
  } catch (error) {
    res.send({
      status: false,
      error: error.message
    })
  }
}