// // order.service.js
import OrderRepo from "../repositories/order.repository.js";
import productRepository from "../repositories/product.repo.js";
import SubOrderRepo from "../repositories/subOrder.repository.js";


async function buyNow(userId, { productId, quantity }, shippingAddress) {

 const productRepositorys = new productRepository();

  // Rule 1: product must exist and be active
  const product = await productRepositorys.read(productId);
  if (!product || product.status !== "active") {
    throw new Error("Product is not available");
  }

  // Rule 2: stock must be sufficient
  if (product.stockQuantity < quantity) {
    throw new Error(`Only ${product.stockQuantity} unit(s) left in stock`);
  }

  const price = product.discountPrice || product.price;
  const totalAmount = price * quantity;

  // Rule 3: create Order (paymentStatus: created, not paid yet)
  const order = await OrderRepo.create({
    userId,
    shippingAddress,
    totalAmount,
    paymentStatus: "pending",
  });

  // Rule 4: single-vendor SubOrder (only one product, one vendor)
  const [subOrder] = await SubOrderRepo.createMany([
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

  order.subOrders = [subOrder._id];
  await order.save();

  // Rule 5: create Razorpay payment session
//   const razorpayOrder = await razorpay.orders.create({
//     amount: Math.round(totalAmount * 100), // paise
//     currency: "INR",
//     receipt: order._id.toString(),
//   });

//   order.razorpayOrderId = razorpayOrder.id;
//   await order.save();

  return {
    orderId: order._id,
    // razorpayOrderId: razorpayOrder.id,
    amount: totalAmount,
  };
}

export default { buyNow };