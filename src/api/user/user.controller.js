const userService = require('./user.service.js');
const authHelper = require('../auth/auth.helper.js');
const errorHandler = require('../../utils/errorHandling/errorHandler.js');

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    errorHandler(res, err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    const token = authHelper.createJwtToken(user);

    res.status(201).send({ user, token });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
};
