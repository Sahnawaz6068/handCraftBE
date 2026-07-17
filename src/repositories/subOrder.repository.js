import crudRepository from "./crud.js";
import SubOrder from "../Model/subOrder.model.js";

class SubOrderRepository extends crudRepository {
  constructor() {
    super(SubOrder);
  }

  async createMany(subOrdersData) {
    return await this.model.insertMany(subOrdersData);
  }

  async getSubOrderByVendorId(id){
    return await this.model.find({vendorId:id});
  }
}

export default SubOrderRepository;

// I want the specifica all the subOrder means ==> for the vendor id this all the 
//suborder || not the whole suborder


//we get the suborder now -> check the this vendor id exist in the DB or not if not then return vendor does not exist
// here we have user also so if we find throug