import Otp from "../Model/otp.model.js";

async function create (data){
    return Otp.create(data);
}

async function findLatestByIdentifier(identifire,purpose){
    return Otp.findOne({identifire,purpose}).sort({createdAt: -1 })
}

async function deleteByIdentifier(identifire,purpose){
    return Otp.deleteMany({identifire,purpose})
}


export default {create,findLatestByIdentifier,deleteByIdentifier}

