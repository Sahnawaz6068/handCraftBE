//Admin for now--> can see the pending vendor
//Check here the role is vendor or not
//user.vendorProfile?.isApproved = false --> get all pending vendor
//make user.vendorProfile?.isApproved = true --> make approve

import User from "../Model/user.model.js";
import { sendVendorApprovedMail } from "../utils/notify.js";

async function getPendingVendors() {
  const pendingVendors = await User.find({
    role: "vendor",
    "vendorProfile.isApproved": false,
  });

  return pendingVendors;
}

//Make approve the specific vendot
async function approveVendor(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "vendor") {
    throw new Error("User is not a vendor");
  }

  if (user.vendorProfile?.isApproved) {
    throw new Error("Vendor is already approved");
  }

  user.vendorProfile.isApproved = true;
  user.vendorProfile.approvedAt = new Date();

  await user.save();
  await sendVendorApprovedMail({
    recipient: user.email,
    vendorName: user.name,
    shopName: user.vendorProfile.shopName,
  });
  return user;
}

export default {
  approveVendor,
  getPendingVendors,
};
