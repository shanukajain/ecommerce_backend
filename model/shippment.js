const mongoose = require('mongoose');

const ShippmentSchema = new mongoose.Schema({
   order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
   status:{type :String, default:"carrier partner picked up the package"},
});

const shippmentModel = mongoose.model('shippment', ShippmentSchema);

module.exports = shippmentModel;