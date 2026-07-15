

import SubOrder from "../Model/subOrder.model.js";

async function createMany(subOrdersData) {
  return SubOrder.insertMany(subOrdersData);
}

export default { createMany };