
import Order from "../Model/order.model.js";

async function create(data) {
  return Order.create(data);
}

async function findById(id) {
  return Order.findById(id).populate("subOrders");
}

async function updateById(id, updates) {
  return Order.findByIdAndUpdate(id, updates, { new: true });
}

export default { create, findById, updateById };