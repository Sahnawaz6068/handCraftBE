import Cart from "../Model/cartItem.model.js";

async function findByUserId(userId) {
    return Cart.findOne({userId})
}

async function create(userId) {
    return Cart.create({userId,item:[]})
}

async function save(cart){
    return Cart.save();
}

export default {
    findByUserId,
    create,
    save
}