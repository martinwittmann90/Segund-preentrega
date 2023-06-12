import express from 'express';
import MongoDBCarts from "../services/dbcarts.service.js";
import MongoDBProducts from "../services/dbproducts.service.js";

const cartsRouter = express.Router();

const dbCarts = new MongoDBCarts();
const dbProducts = new MongoDBProducts();

cartsRouter.put("api/carts/:cid", async (req, res) => { // borrar contenido de products y cargar arreglo nuevo
  try {
    const cartId = req.params.cid;
    const newProds = req.body;
    await replaceProductsInCart(cartId, newProds);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart updated',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.put("api/carts/:cid/products/:pid", async (req, res) => { // modificar cantidad del producto
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const prodQty = req.body;
    await changeProductQuantity(cartId, prodId, prodQty);
    return res.status(200).json({
      status: 'success',
      msg: 'Product in cart updated',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res)=>{
  try{
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    await dbCarts.addProductToCart(idCart, idProduct);
    res.status(200).json({
      success: true
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
        status: 'error',
        msg: error.message,
    });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await dbCarts.createCart();
    return res.status(201).json({
      status: 'success',
      msg: 'Cart created',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.get("api/carts/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await dbCarts.getCartById(idCart);
    res.render('carts', {});
    return res.status(200).json({
      status: 'success',
      msg: 'Cart found',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await dbCarts.getCartById(idCart);
    res.render('carts', {});
    return res.status(200).json({
      status: 'success',
      msg: 'Cart found',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.delete("api/carts/:cid", async (req, res) => { 
try {
  const idCart = req.params.cid;
  const cart = await dbCarts.deleteCartById(idCart);
  return res.status(200).json({
    status: 'success',
    msg: 'Cart deleted',
    payload: cart
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({
    status: 'error',
    msg: error.message,
  });
}
});

cartsRouter.post("api/carts/:cid/products/:pid", async (req, res) => {
try {
  const idCart = req.params.cid;
  const idProd = req.params.pid;
  const cart = await dbCarts.addProductToCart(idCart, idProd);
  return res.status(200).json({
    status: 'success',
    msg: 'Product added to cart',
    payload: cart
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({
    status: 'error',
    msg: error.message,
  });
}
});

cartsRouter.delete("api/carts/:cid/products/:pid", async (req, res) => { //borra el producto del carrito por completo
try {
  const idCart = req.params.cid;
  const idProd = req.params.pid;
  const cart = await dbCarts.removeProductFromCart(idCart, idProd);
  return res.status(200).json({
    status: 'success',
    msg: 'Product removed from cart',
    payload: cart
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({
    status: 'error',
    msg: error.message,
  });
}
});
export default cartsRouter;