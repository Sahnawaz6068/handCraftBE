import cartRepo from "../repositories/cartRepo.js";
import productRepository from "../repositories/product.repo.js";

const ProductRepo = new productRepository();

async function getOrCreateCart(userId) {
  let cart = await cartRepo.findByUserId(userId);
  if (!cart) {
    cart = await cartRepo.create(userId);
  }
}

async function addItem(userId, { productId, quantity = 1 }) {
  const product = await ProductRepo.read(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  if (product.status !== "active") throw new Error("Product is not available");

  const cart = await getOrCreateCart(userId);
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.itmes.push({
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
  const cart = await CartRepo.findByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (!item) throw new Error("Item not in cart");

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
  } else {
    item.quantity = quantity;
  }

  await CartRepo.save(cart);
  return cart;
}

async function removeItem(userId, productId) {
  const cart = await CartRepo.findByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await CartRepo.save(cart);
  return cart;
}

async function clearCart(userId) {
  const cart = await CartRepo.findByUserId(userId);
  if (!cart) return null;
  cart.items = [];
  await CartRepo.save(cart);
  return cart;
}

export default { getOrCreateCart, addItem, updateItemQuantity, removeItem, clearCart };
