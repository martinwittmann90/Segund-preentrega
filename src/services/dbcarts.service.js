//@ts-check
import  CartModel from '../DAO/models/cart.model.js';
import ProductModel from '../DAO/models/product.model.js';

class MongoDBCarts {
    getCarts = async () => {
        const carts = await CartModel.find({});
        return carts;
    }
    createCart = async () => {
        try {
            const newCart = await CartModel.create({ products: [] });
            const idString = newCart._id.toString();
            return idString
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }
    async getById(cId) {
        try {
            const cart = await CartModel.findOne({ _id: cId }).populate({
                path: "products",
                populate: { path: "_id", model: "products" },
            });
            return cart
        } catch (error) {
            throw error
        }
    }
    deleteCart = async (cId) => {
        try {
            const cart = await CartModel.findOne({ _id: cId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.products = []; // Vaciar la lista de productos del carrito
            return await cart.save();
        } catch (error) {
            throw error
        }
    }
    removeProductFromCart = async (cId, pId) => {
        try {
            const cart = await CartModel.findOne({ _id: cId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const product = await ProductModel.findOne({ _id: pId });
            if (!product) {
                throw new Error('product not found');
            }

            const productCart = cart.products.findIndex(item => item.products.toString() === pId);

            cart.products.splice(productCart, 1);

            await cart.save();

        } catch (error) {
            throw error;
        }
    }

    addProductToCart = async (cId, pId, pQuantity) => {
        try {
            const cart = await CartModel.findOne({ _id: cId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const product = await ProductModel.findOne({ _id: pId });
            if (!product) {
                throw new Error('product not found');
            }

            const productCart = cart.products.findIndex(item => item.products.toString() === pId);

            if (productCart === -1) {
                cart.products.push({
                    products: pId,
                    quantity: pQuantity
                })
                return await cart.save()

            } else {
                cart.products[productCart].quantity += pQuantity;
                return await cart.save()
            }
        } catch (error) {
            throw error
        }
    }


    updateCart = async (cId, cartData) => {
        try {
            const cart = await CartModel.findOne({ _id: cId });

            if (!cart) {
                throw new Error('Cart not found');
            }

            if (Object.keys(cartData).length === 0) {
                throw new Error('empty object');
            } else {
                cart.products = cartData;
            }

            return await cart.save();

        } catch (error) {
            throw error
        }
    }
}

export default MongoDBCarts;