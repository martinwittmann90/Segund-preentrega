const socket = io();
const cartButtom = document.getElementById("buttonCart");

document.querySelectorAll('.buttonCart').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const cartId = button.dataset.cartId;
      socket.emit('addProductInCart_front_to_back', cartId);
    });
  });

const titleContainer = document.getElementById("titleProduct");
const descriptionContainer = document.getElementById("descriptionProduct");
const priceContainer = document.getElementById("priceProduct");
const cartContainer = document.getElementById("cartContainer");

btn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleContainer.value;
    const description = descriptionContainer.value;
    const price = priceContainer.value;
    socket.emit("cart_front_to_back", {
        title: title,
        description: description,
        price: price
  });
});

socket.on("cart_back_to_front", (newCart) => {
    cartContainer.innerHTML = newCart
    .map((cart) => {
        return `<div
        class="notification is-primary is-light"
        style=" text-align: justify; margin-rigth:35px; padding: 15px;
        border-radius: 20px;">
            <div>
                <p>${title.title}</p>
                <p>${description.description}</p>
                <p>${price.price}</p>
            </div>
        </div>`;
    })
    .join("");
    /* window.location.reload(); */
});