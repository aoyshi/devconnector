const userService = require('./user.service.js');
const authHelper = require('../auth/auth.helper.js');
const errorHandler = require('../../helpers/errorHandling/errorHandler.js');

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).send(user);
  } catch (err) {
    errorHandler(res, err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req);
    const token = authHelper.createJwtToken(user);

    res.status(201).json({ token });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
};
