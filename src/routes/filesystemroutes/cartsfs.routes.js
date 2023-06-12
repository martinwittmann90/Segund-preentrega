/* import { Router } from "express";
const cartRouter = Router()
import CartManager from "../../DAO/appManager/cartManager.js";
const path = "./src/DAO/db/carts.json";
const cartManager = new CartManager(path);


cartRouter.post("/", async (req, res) => {
  try {
    const newCart = req.body;
    const cartCreated = await cartManager.addCart(newCart);
    cartCreated
      ? res.status(201).json({
          status: "success",
          payload: cartCreated,
        })
      : res.json({
          status: "error",
        });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

cartRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        const carts = await cartManager.getAllCarts();
        if (limit) {
            res.status(200).json(carts.slice(0, limit));
        } else {
            res.status(200).json(carts);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
    }
});

cartRouter.post("/:cartId/product/:productsId", async (req, res) => {
    try {
        const cartId = req.params.cartId
        const productsId = req.params.productsId
        await cartManager.addProductToCart(cartId, productsId);
        return res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        if (error.message === "Cart not found") {
            res.status(404).json({ message: "Cart not found" });
        } 
    }
});

cartRouter.delete("/:cartId/product/:productsId", async (req, res) => {
    try {
        const cartId = req.params.cartId
        const productsId = req.params.productsId
        await cartManager.removeProductFromCart(cartId, productsId);
        return res.status(201).json({ message: "Product removed from cart" });
    } catch (error) {
        if (error.message === "Cart not found") {
            res.status(404).json({ message: "Cart not found" });
        }
    }
});

export default cartRouter;

 */