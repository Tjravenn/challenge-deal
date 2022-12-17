const { verifyToken } = require("../helpers/jwt");
const User  = require("../models/users");

// 1) jika tidak ada access_token, throw new error 'Unauthorized', messagenya missing token
// 2) verifyToken
// 3) jika dia bukan user throw new Error 'Unauthorized', message invalid token
module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if(!access_token) throw new Error ('Unauthenticated');
    const payload = verifyToken(access_token, process.env.SECRET_KEY);
    const user = await User.findById(payload.id);
    if(!user) throw new Error ('Unauthenticated');
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (error) {
    res.send({
      status: false,
      error: error.message || "Unauthenticated",
    });    
  }
};

