const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name , email : user.email }, token: token, id: user.id });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError();
  }

  const user = await User.findOne({email});
  if (!user) {
    throw new UnauthenticatedError();
  }

  const isPasswordCorrect = await  user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name , email :user.email }, token: token, id: user.id });
};

module.exports = { register,login };
