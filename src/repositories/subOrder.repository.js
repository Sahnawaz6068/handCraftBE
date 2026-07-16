import crudRepository from "./crud.js";
import SubOrder from "../Model/subOrder.model.js";

class SubOrderRepository extends crudRepository {
  constructor() {
    super(SubOrder);
  }

  async createMany(subOrdersData) {
    return await this.model.insertMany(subOrdersData);
  }
}

export default SubOrderRepository;

// I want the specifica all the subOrder means ==> for the vendor id this all the 
//suborder || not the whole suborder