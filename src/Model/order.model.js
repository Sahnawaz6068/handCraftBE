//order

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubOrder" }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  paymentId: String, 
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);

export default Order;