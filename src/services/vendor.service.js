import User from "../Model/user.model.js";
import UserRepository from "../repositories/userRepository.js";
import { sendEmailNewVendorApplication } from "../utils/notify.js";

const userRepository = new UserRepository();

async function applyForVendor(userId, vendorDetail) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.role === "vendor" && !user.vendorProfile?.isApproved) {
    throw new Error("Your vendor application is already pending approval");
  }
  if (!vendorDetail.shopName || !vendorDetail.description) {
    throw new Error("shopName and description are required");
  }

  user.role = "vendor";
  user.vendorProfile = {
    shopName: vendorDetail.shopName,
    description: vendorDetail.description,
    logo: vendorDetail.logo || null,
    isApproved: false,
  };

  await sendEmailNewVendorApplication({
  recipients: process.env.ADMIN_EMAIL,
  applicantName: user.name,
  applicantEmail: user.email,
  shopName: vendorDetail.shopName,
  description: vendorDetail.description,
});

  await user.save();

  return user;
}

async function getVendorProfile(userId) {
  const user = await userRepository.read(userId);
  if (!user) {
    throw new Error("user does not exist");
  }

  if (user.role !== "vendor") {
    throw new Error("You are not a vendor");
  }

  return user;
}

export default {
  applyForVendor,
  getVendorProfile,
};
