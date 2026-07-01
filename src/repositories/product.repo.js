import Product from "../Model/product.model.js";
import crudRepository from "./crud.js";

class productRepository extends crudRepository {
    constructor(){
        super(Product);
    }
}

export default productRepository;