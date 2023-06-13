//@ts-check
async function addToCart(productId) {
  try {
    await client.connect();
    const db = client.db('carts'); //

    let cartCollection = db.collection('carts');
    let cart = await cartCollection.findOne();
    
    if (!cart) {
      const response = await fetch('http://localhost:8080/api/carts', {
        method: 'POST'
      });
      const data = await response.json();
      cart = { _id: data.payload._id };
      await cartCollection.insertOne(cart);
    }

    await fetch(`http://localhost:8080/api/carts/${cart._id}/product/${productId}`, { method: 'POST' });
    alert('product added correctly');
  } catch (error) {
    alert('failed to add to cart');
  } finally {
    await client.close();
  }
}

async function updateCartFunction() {
  try {
    await client.connect();
    const db = client.db('carts'); // Reemplaza 'tu-base-de-datos' con el nombre de tu base de datos en MongoDB

    let cartCollection = db.collection('carts');
    let cart = await cartCollection.findOne();

    if (!cart) {
      document.getElementById('CartVisuals').textContent = '';
      return;
    }

    const response = await fetch(`http://localhost:8080/api/carts/${cart._id}`);
    const data = await response.json();

    if (data.payload && data.payload[0] && data.payload[0].products) {
      const itemCount = data.payload[0].products.length;
      document.getElementById('CartVisuals').textContent = itemCount.toString();
    } else {
      document.getElementById('CartVisuals').textContent = '';
    }
  } catch (error) {
    document.getElementById('CartVisuals').textContent = '';
  } finally {
    await client.close();
  }
}
