const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;