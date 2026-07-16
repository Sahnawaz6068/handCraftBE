import SubOrderRepository from "../repositories/subOrder.repository.js";

const subOrderRepository = new SubOrderRepository();

async function getAllSuborder() {
  try {
    const subOrders = await subOrderRepository.readAll();
    return subOrders;
  } catch (error) {
    throw error;
  }
} // Here not all the suborder I need I need here the suborder with vendorId so 
// Should i use ref in the suborder or in the user relation table 
// the for the vendor this there is all thesuborders

// async function getSubOrderAndUpdate(id,data) {
//     try {
//         const updatedSubOrder = await subOrderRepository.update(id,data);
//         return updatedSubOrder;
//     } catch (error) {
//         throw error
//     }
// }

async function getSubOrderAndUpdate(id, data) {
  try {
    const subOrderExist = await subOrderRepository.read(id);

    if (!subOrderExist) {
      throw new Error("SubOrder not found");
    }

    const allowedStatus = [
      "placed",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (data.status && !allowedStatus.includes(data.status)) {
      throw new Error("Invalid status");
    }

    const allowedFields = ["status"];
    const updateData = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const updatedSubOrder = await subOrderRepository.update(id, updateData);

    return updatedSubOrder;
  } catch (error) {
    throw error;
  }
}

async function deleteSubOrder(id) {
  try {
    const subOrderExist = await subOrderRepository.read(id);
    if (!subOrderExist) {
      throw new Error("SubOrder not found");
    }
    const updatedSubOrder = await subOrderRepository.delete(id);
  } catch (error) {
    throw error;
  }
}

export default {
  getAllSuborder,
  deleteSubOrder,
  getSubOrderAndUpdate
};
