import User from "../Model/User.Model.js";
import crudRepository from "./crud.js";

class UserRepository  extends crudRepository{
    constructor(){
        super();
    }
}

export default UserRepository;