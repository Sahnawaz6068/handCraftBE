import cartRepo from "../repositories/cartRepo.js";
import ProductRepository from "../repositories/product.repo.js";

const productRepo = new ProductRepository();

async function getOrCreateCart(userId) {
  let cart = await cartRepo.findByUserId(userId);

  if (!cart) {
    cart = await cartRepo.create(userId);
  }

  return cart;
}

async function addItem(userId, { productId, quantity = 1 }) {
  quantity = Number(quantity);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const product = await productRepo.read(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.status !== "active") {
    throw new Error("Product is not available");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      throw new Error("Quantity exceeds available stock");
    }

    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId: product._id,
      vendorId: product.vendorId,
      quantity,
      priceAtAdd: product.discountPrice || product.price,
    });
  }

  await cartRepo.save(cart);

  return cart;
}

async function updateItemQuantity(userId, productId, quantity) {
  quantity = Number(quantity);

  const cart = await cartRepo.findByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (!item) {
    throw new Error("Item not found in cart");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
  } else {
    const product = await productRepo.read(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (quantity > product.stock) {
      throw new Error("Quantity exceeds available stock");
    }

    item.quantity = quantity;
  }

  await cartRepo.save(cart);

  return cart;
}

async function removeItem(userId, productId) {
  const cart = await cartRepo.findByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cartRepo.save(cart);

  return cart;
}

async function clearCart(userId) {
  const cart = await cartRepo.findByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cartRepo.save(cart);

  return cart;
}

export default {
  getOrCreateCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};