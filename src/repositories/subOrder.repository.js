import crudRepository from "./crud.js";
import SubOrder from "../Model/subOrder.model.js";

class SubOrderRepository extends crudRepository {
  constructor() {
    super(SubOrder);
  }

  async createMany(subOrdersData) {
    return await this.model.insertMany(subOrdersData);
  }

  async getSubOrdersByVendorId(vendorId) {
    return await this.model.find({ vendorId });
  }
}

export default SubOrderRepository;