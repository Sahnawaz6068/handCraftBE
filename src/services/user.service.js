
import UserRepository from "../repositories/userRepository.js";

const userRepository =  new UserRepository();

async function createUser(data) {
    try{
        const user = await userRepository.create(data);
        return user;
    }catch(err){
        throw err
    }
}

export default {
    createUser
}