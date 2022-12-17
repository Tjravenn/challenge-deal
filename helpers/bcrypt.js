const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(12);

const hashPass = async (password) => await bcrypt.hash(password, salt);
const comparePass = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { hashPass, comparePass };
