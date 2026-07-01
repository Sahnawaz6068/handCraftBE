import productRepository from "../repositories/product.repo.js";

const ProductRepo = new productRepository();

async function createProducts (data){
    try {
        const product = await ProductRepo.create(data);
        return product;
    }catch (err){
        throw err;
    }
}

async function productById(id) {
    try {
        const product = await ProductRepo.read(id);
        return product;
    } catch (error) {
        throw error;
    }
    
}

async function getAllProduct() {
    try {
        const products = await ProductRepo.readAll();
        return products;
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const product = await ProductRepo.delete(id);
        return product;
    } catch (error) {
        throw error;
    }
}

async function updateProduct(id, data) {
    try {
        const product = await ProductRepo.update(id,data);
        return product;
    } catch (error) {
        throw error;
    }
}

export default {
    createProducts,
    productById,
    getAllProduct,
    deleteProduct,
    updateProduct
}