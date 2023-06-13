import { Schema, model } from 'mongoose'

export const cartSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
},{ versionKey: false })

const CartModel = model('carts', cartSchema)

export default CartModel;


