import express from 'express';
import MongoDBCarts from "../services/dbcarts.service.js";
import MongoDBProducts from "../services/dbproducts.service.js";

const dbCarts = new MongoDBCarts();
const cartRouter = express.Router()

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await dbCarts.createOne();
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await dbCarts.get(cartId); ;
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    console.log(cid, pid);
    const cart = await dbCarts.addProductToCart(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await dbCarts.removeProduct(cid, pid);
    res
      .status(200)
      .json({ status: "success", message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await dbCarts.updateCart(cid, products);
    res
      .status(200)
      .json({ status: "success", message: "Cart updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await dbCarts.updateProductQuantity(cid, pid, quantity);
    res
      .status(200)
      .json({ status: "success", message: "Product quantity updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await dbCarts.clearCart(cid);
    res
      .status(200)
      .json({ status: "success", message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

export default cartRouter;