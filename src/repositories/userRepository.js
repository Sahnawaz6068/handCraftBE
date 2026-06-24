import User from "../Model/user.model.js";
import crudRepository from "./crud.js";

class UserRepository  extends crudRepository{
    constructor(){
        super(User);
    }
}

export default UserRepository;