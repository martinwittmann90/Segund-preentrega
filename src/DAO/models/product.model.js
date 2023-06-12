import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, index:true },
  price: { type: Number, required: true },
  thumbnail: {type: [String], required: true, },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: { type: String, enum: ["Camisetas", "Shorts", "Medias", "Botines", "Camperas"], default: "Camisetas"},
  status: { type: Boolean, default: true }
  }, 
  { versionKey: false });

productsSchema.plugin(mongoosePaginate);

const ProductModel  = mongoose.model('products',productsSchema);

export default ProductModel;

