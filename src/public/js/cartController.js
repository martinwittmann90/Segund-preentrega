function addToCart(productId) {
  const cartId = '6477d7a56ad0a9fc9091dded'; 
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('Product added to cart');
    } else {
      throw new Error('Failed to add product to cart');
    }
  })
  .catch(error => {
    console.error(error);
  });
}