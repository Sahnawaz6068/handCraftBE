import OrderRepo from "../repositories/order.repository.js";
import ProductRepository from "../repositories/product.repo.js";
import SubOrderRepository from "../repositories/subOrder.repository.js";

async function buyNow(userId, { productId, quantity }, shippingAddress) {
  const productRepo = new ProductRepository();
  const subOrderRepo = new SubOrderRepository();

  // Validate quantity
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive integer");
  }

  // Find product
  const product = await productRepo.read(productId);

  // Product must exist
  if (!product) {
    throw new Error("Product not found");
  }

  // Product must be active
  if (product.status !== "active") {
    throw new Error("Product is not available");
  }

  // Check stock
  if (product.stockQuantity < quantity) {
    throw new Error(
      `Only ${product.stockQuantity} unit(s) left in stock`
    );
  }

  // Calculate price
  const price = product.discountPrice || product.price;
  const totalAmount = price * quantity;

  // Create Order
  const order = await OrderRepo.create({
    userId,
    shippingAddress,
    totalAmount,
    paymentStatus: "pending",
  });

  // Create SubOrder
  const [subOrder] = await subOrderRepo.createMany([
    {
      orderId: order._id,
      vendorId: product.vendorId,
      items: [
        {
          productId: product._id,
          productName: product.productName,
          quantity,
          price,
        },
      ],
      subTotal: totalAmount,
    },
  ]);

  // Attach SubOrder to Order
  order.subOrders = [subOrder._id];

  await order.save();

  return {
    orderId: order._id,
    subOrderId: subOrder._id,
    amount: totalAmount,
  };
}


// Get all SubOrders belonging to a vendor
async function getVendorSubOrders(vendorId) {
  const subOrderRepo = new SubOrderRepository();

  const subOrders = await subOrderRepo.getSubOrdersByVendorId(vendorId);

  return subOrders;
}


export default {
  buyNow,
  getVendorSubOrders,
};