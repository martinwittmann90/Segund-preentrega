import { mongoose } from "mongoose";
import { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }],
    default: [],
    require: true
  }
}, { versionKey: false })
const CartModel = new mongoose.model("carts", cartSchema);

export default CartModel;