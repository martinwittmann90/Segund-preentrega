//@ts-check
import MongoDBProducts from '../services/dbproducts.service.js';
import MongoDBChats from '../services/dbchats.service.js';
import MongoDBCarts from '../services/dbcarts.service.js';

const dbChat = new MongoDBChats();
const productManager = new MongoDBProducts();
const dbCarts = new MongoDBCarts();

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New client websocket: ", socket.id);
    //SOCKET PRODUCTS
    socket.on('product_front_to_back', async (newProduct)=>{
        try{
            await productManager.createProduct(newProduct);
            const productList = await productManager.getAllProducts();
            io.emit("products_back_to_front", {productList})
        }
        catch (error) {
            console.log(error);
        }
    })
    //SOCKET DELETE ELEMENTS
    socket.on('deleteProduct_front_to_back', async (id) => {
      try {
          await productManager.deleteProduct(id);
          socket.emit('productDeleted_back_to_front', { message: 'Product successfully removed' });
          const productList = await productManager.getAllProducts();
          io.emit('products_back_to_front', { productList });
      } catch (error) {
          console.error('Error al eliminar el producto:', error);
          socket.emit('productDeleteError_back_to_front', { error: 'An error occurred while deleting the product' });
      }
  });
    //SOCKET CART 
    socket.on('addProductInCart_front_to_back', async (cartId) => {
      try {
          await dbCarts./* actualizar carrito */(cartId);
          socket.emit('paddProductInCart_back_to_front', { message: 'Producto eliminado exitosamente' });
          const cartList = await dbCarts./*???*/();
          io.emit('addProductInCart', { cartList });
      } catch (error) {
          console.error('Error adding product:', error);
          socket.emit('addProductError_back_to_front', { error: 'Ocurrió un error al eliminar el producto' });
      }
  });
    //SOCKET CHAT
    socket.on("chat_front_to_back", async (message) => {
      dbChat.createChat(message);
      const messages = await dbChat.getChat();
      console.log(messages);
      socket.emit("chat_back_to_front", messages);
      socket.broadcast.emit("chat_back_to_front", messages);
    });
    //SOCKET DESCONEXION
    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
};









