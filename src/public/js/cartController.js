const form = document.querySelector('.form')
const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const codeInput = document.getElementById('code')
const stockInput = document.getElementById('stock')

async function addToCart(productId) {
  try {
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {
      const response = await fetch('http://localhost:8080/api/carts', {
        method: 'POST'
      })
      const data = await response.json()
      cartId = data.payload._id
      localStorage.setItem('cartId', cartId)
    }
    console.log('=======================', cartId)
    console.log('=======================', productId)
    await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, { method: 'POST' })
    alert('product added correctly')
    // updateCartBadge()
  } catch (error) {
    alert('failed to add to cart')
  }
}

async function updateCartBadge() {
  try {
    const cartId = localStorage.getItem('cartId')
    if (!cartId) {
      document.getElementById('badgeCart').textContent = ''
      return
    }

    const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
    const data = await response.json()

    if (data.payload && data.payload[0] && data.payload[0].products) {
      const cart = data.payload[0]
      const itemCount = cart.products.length
      document.getElementById('badgeCart').textContent = itemCount.toString()
    } else {
      document.getElementById('badgeCart').textContent = ''
    }
  } catch (error) {
    document.getElementById('badgeCart').textContent = ''
  }
}
try {
  socket.on('productAdded', async (product) => {
    const container = document.getElementById('product-container')
    const productListElement = document.createElement('div')
    productListElement.innerHTML = `
              <div id="${product._id}" class="product">
                <h2>${product.title}</h2>
                <img src="${product.thumbnails}" alt="">
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <button class="delete-btn" onclick="deleteProductWithSocket('${product._id}')">Delete</button>
              </div>`

    container.appendChild(productListElement)
  })
  socket.on('product:deleted', (id) => {
    const div = document.getElementById(id)
    div.remove()
  })
} catch (error) { }
