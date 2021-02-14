const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('./model.js');

const createUser = async (req) => {
  const { name, email, password } = req.body;

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'identicon',
  });

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: encryptedPassword,
    avatar,
  });

  await user.save();
  return user;
};

module.exports = {
  createUser,
};