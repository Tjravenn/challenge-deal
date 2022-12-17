const User = require('../models/users');
const { hashPass } = require('./bcrypt');

module.exports = async () => {
  try {
    const users = await User.find();
    if (users.length <= 0) {
      await User.create({
        username: 'superadmin',
        password: await hashPass('123456'),
        role: 1
      });
    }
  } catch (error) {

  }
}