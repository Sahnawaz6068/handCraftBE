import User from "../Model/user.model.js";
import bcrypt from "bcrypt";

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

export default {
  registerUser,
  getUserDetail,
};
