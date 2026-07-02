import Product from "../Model/product.model.js";
import crudRepository from "./crud.js";

class productRepository extends crudRepository {
    constructor(){
        super(Product);
    }

    async getProducts(query,page,limit){
        const skip = (page-1)*limit;

        return this.model
                .find(query)
                .sort({createdAt:-1})
                .skip(skip)
                .limit(limit) 
                .lean()
    }

    async countProducts(query){
        return this.model.countDocuments(query);
    }


}

export default productRepository;