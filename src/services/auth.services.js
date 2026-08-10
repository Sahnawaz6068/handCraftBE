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

async function updateUser(userId, data) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const {
    name,
    avtar,
    phone,
    email,
    addAddress,
    updateAddress,
    removeAddressId,
    setDefaultAddressId,
  } = data;

  if (name !== undefined) user.name = name;
  if (avtar !== undefined) user.avtar = avtar;

  // avoid setting empty string on sparse-unique fields — causes future conflicts
  if (phone !== undefined) user.phone = phone || undefined;
  if (email !== undefined) user.email = email ? email.toLowerCase() : undefined;

  if (addAddress) {
    const { lable, line1, line2, city, state, pinCode, country, isDefault } =
      addAddress;

    if (!line1 || !city || !state || !pinCode) {
      throw new Error("Missing required address fields");
    }

    const shouldBeDefault = isDefault || user.addresses.length === 0;

    if (shouldBeDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
    }

    user.addresses.push({
      lable: lable || "Home",
      line1,
      line2,
      city,
      state,
      pinCode,
      country: country || "India",
      isDefault: shouldBeDefault,
    });
  }

  if (updateAddress?.addressId) {
    const address = user.addresses.id(updateAddress.addressId);
    if (!address) {
      throw new Error("Address not found");
    }
    const { addressId, ...fields } = updateAddress;
    Object.assign(address, fields);
  }

  if (removeAddressId) {
    const address = user.addresses.id(removeAddressId);
    if (!address) {
      throw new Error("Address not found");
    }
    const wasDefault = address.isDefault;
    address.deleteOne();

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
  }

  if (setDefaultAddressId) {
    const target = user.addresses.id(setDefaultAddressId);
    if (!target) {
      throw new Error("Address not found");
    }
    user.addresses.forEach((a) => (a.isDefault = false));
    target.isDefault = true;
  }

  try {
    await user.save();
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      throw new Error(`This ${field} is already in use`);
    }
    throw err;
  }

  user.password = undefined;

  return user;
}

export default {
  registerUser,
  getUserDetail,
  signIn,
  updateUser,
};
