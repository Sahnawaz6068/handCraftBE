import productRepository from "../repositories/product.repo.js";

const ProductRepo = new productRepository();

async function createProducts(vendorId,data) {
  data.vendorId=vendorId;
  try {
    const product = await ProductRepo.create(data);
    return product;
  } catch (err) {
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
    const product = await ProductRepo.update(id, data);
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProducts(queryParams) {
    const { page = 1, limit =12, search } = queryParams;

    const pageNumber = Math.max(1, Number(page));
    const pageLimit = Math.min(50, Math.max(1, Number(limit)));

    const query = {
        status: "active",
    };

    if (search) {
        query.$text = {
            $search: search,
        };
    }

    const [products, total] = await Promise.all([
        ProductRepo.getProducts(query, pageNumber, pageLimit),
        ProductRepo.countProducts(query),
    ]);

    return {
        products,
        pagination: {
            total,
            page: pageNumber,
            limit: pageLimit,
            totalPages: Math.ceil(total / pageLimit),
            hasNextPage: pageNumber < Math.ceil(total / pageLimit),
            hasPrevPage: pageNumber > 1,
        },
    };
}

export default {
  createProducts,
  productById,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getProducts,
};
