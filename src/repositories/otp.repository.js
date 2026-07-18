import Otp from "../Model/otp.model.js";

async function create (data){
    return Otp.create(data);
}

async function findLatestByIdentifier(identifier,purpose){
    return Otp.findOne({identifier,purpose}).sort({createdAt: -1 })
}

async function deleteByIdentifier(identifier,purpose){
    return Otp.deleteMany({identifier,purpose})
}


export default {create,findLatestByIdentifier,deleteByIdentifier}

