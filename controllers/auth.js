const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  UserNameError,
} = require("../errors/index");

const register = async (req, res) => {
  const name = req.body.name;
  if ((name && name.length < 3) || name.length > 20) {
    throw new UserNameError("Username must be between 3-20 characters");
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({
      user: { name: user.name, email: user.email },
      token: token,
      id: user.id,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError();
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError();
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({
      user: { name: user.name, email: user.email },
      token: token,
      id: user.id,
    });
};

module.exports = { register, login };
