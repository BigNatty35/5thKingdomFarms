const { Order } = require('../models');
const { Product } = require('../models');


const createOrder = async (req, res) => {
  const { user_id, products, order_date, total_amount } = req.body;
  console.log(`${user_id}, ${products}, ${order_date}, ${total_amount}`);
  try {
    // Create the order
    const order = await Order.create({ user_id, order_date, total_amount });

    // Create order items for each product
    for (const product of products) {
      const { product_id, quantity } = product;

      // Find the product by ID
      const foundProduct = await Product.findByPk(product_id);

      // If the product is not found, return an error
      if (!foundProduct) {
        return res.status(404).json({ error: `Product not found for ID: ${product_id}` });
      }

      console.log("PRODUCT!!!:", foundProduct)
      // Create the order item with product details
      await order.createOrderItem({
        order_id: order.order_id,
        product_id: foundProduct.product_id,
        quantity,
        item_price: foundProduct.price
      });
    }

    // Return the created order as a response
    return res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: `Order not found for ID: ${orderId}` });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

const getAllUserOrdersById = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { user_id: userId }
    })

    if (!orders) {
      return res.status(404).json({ error: `No orders found for userId: ${userId}`});
    }
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving user orders:', error)
    return res.status(500).json({error: 'Internal server error'});
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllUserOrdersById
}
