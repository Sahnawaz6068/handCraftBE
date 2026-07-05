import User from "../Model/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

async function registerUser(data) {
  try {
    const saltRound = 10;

    const hashPassword = await bcrypt.hash(data.password, 10);
    const registeredUser = await User.create({
      ...data,
      password: hashPassword,
    });
    return registeredUser;
  } catch (error) {
    throw error;
  }
}

async function getUserDetail(id) {
  try {
    const userDetail = await User.findById(id);
    return userDetail;
  } catch (error) {
    throw error;
  }
}

async function signIn(data) {
  const { identifier, password } = data;

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isActive) {
    throw new Error("Account has been disabled");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your account");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.lastLoginAt = new Date();

  await user.save();

  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
}

export default {
  registerUser,
  getUserDetail,
  signIn
};
