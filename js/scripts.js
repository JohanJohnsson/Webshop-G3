/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener('click', function (event) {
      event.preventDefault();
      removeAlerts();

      const inputName = document.getElementById('inputName').value.trim();
      const inputEmail = document.getElementById('inputEmail').value.trim();
      const inputPhone = document.getElementById('inputPhone').value.trim();
      const inputAddress = document.getElementById('inputAddress').value.trim();
      const inputCity = document.getElementById('inputCity').value.trim();
      const inputZip = document.getElementById('inputZip').value.trim();
      let isValid = true;

      const onlyLettersRegex = /^[A-Za-z\s]{2,50}$/;
      const containsAtRegex = /@/;
      const phoneRegex = /^[0-9\d\s()-]{1,50}$/;
      const zipRegex = /^\d{3}\s?\d{2}$/;

      if (!onlyLettersRegex.test(inputName)) {
        displayAlert("Namn måste vara mellan 2-50 tecken och bara innehålla bokstäver.", document.getElementById('inputName'));
        isValid = false;
      }

      if (inputEmail.length > 50 || !containsAtRegex.test(inputEmail)) {
        displayAlert('E-postadressen får inte vara längre än 50 tecken och måste innehålla @.', document.getElementById('inputEmail'));
        isValid = false;
      }

      if (!phoneRegex.test(inputPhone)) {
        displayAlert('Numret får endast innehålla siffror, paranteser, bindestreck och max 50 tecken långt.', document.getElementById('inputPhone'));
        isValid = false;
      }

      if (inputAddress.length < 2 || inputAddress.length > 50) {
        displayAlert('Addressen får endast vara minst 2 tecken och max 50 tecken.', document.getElementById('inputAddress'));
        isValid = false;
      }

      if (!onlyLettersRegex.test(inputCity)) {
        displayAlert('Staden får endast innehålla 2-50 tecken.', document.getElementById('inputCity'))
        isValid = false;
      }

      if (!zipRegex.test(inputZip)) {
        displayAlert('Postnummer måste vara 5 siffror.', document.getElementById('inputZip'));
        isValid = false;
      }

      if (isValid) {
        window.location.href = 'purchaseConfirmationPage.html';
      }
    });
  }
});


function displayAlert(message, inputField) {
  // Create alert div
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', 'alert-danger');
  alertDiv.setAttribute('role', 'alert');
  alertDiv.textContent = message;
  alertDiv.style.padding = "5px 10px";
  alertDiv.style.fontSize = "0.8rem";

  // Insert alert after the input field
  inputField.parentNode.insertBefore(alertDiv, inputField.nextSibling);
}

function removeAlerts() {
  const alerts = document.querySelectorAll('.alert-danger');
  alerts.forEach(alert => alert.remove());
}

fetch("https://fakestoreapi.com/products/category/electronics")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((item) => {
      try {
        createCard(item);
      } catch (error) {

      }
    });
  });


function createCard(product) {
  const id = product.id;
  const title = product.title;
  const price = "Price: " + product.price + "$";
  const description = product.description;
  const image = product.image;

  const cardIndex = document.querySelectorAll('.card').length;
  if (cardIndex % 3 === 0) {
    const newRow = document.createElement("div");
    newRow.classList.add("row", "d-flex", "justify-content-around");
    document.querySelector('#products').appendChild(newRow);
  }

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.classList.add("my-2");
  cardDiv.classList.add("py-5")
  cardDiv.style.width = "18rem";

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = image;
  img.alt = `image describing ${title}`;
  img.style.height = "200px";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");
  cardBodyDiv.classList.add("d-flex");
  cardBodyDiv.classList.add("flex-column");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title.slice(0, 50);

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = description.slice(0, 100) + "...";

  const cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text");
  cardPrice.classList.add("text-danger");
  cardPrice.textContent = price;

  const btn = document.createElement("a");
  btn.classList.add("btn", "btn-dark", "mt-auto");
  btn.id = "addToCartId" + id;
  btn.type = "button";
  btn.textContent = "Buy";
  btn.onclick = function () {
    showToast('Item added to cart!');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      const productToAdd = { ...product, quantity: 1 };
      cart.push(productToAdd);
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount()
  };

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText);
  cardBodyDiv.appendChild(cardPrice);
  cardBodyDiv.appendChild(btn);

  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBodyDiv);


  const card = document.querySelector('#products');
  card.appendChild(cardDiv);
};


document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();
  // Retrieve the selected product details
  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  if (product) {
    document.getElementById('productImgElement').src = product.image;
    document.getElementById('ProductNameElement').textContent = product.title;
    document.getElementById('descriptionElement').textContent = product.description;
    document.getElementById('priceElement').textContent = product.price;
  }
});

document.getElementById('viewCartButton').addEventListener('click', function () {
  window.location.href = 'order-form.html'; // Redirect to the cart page
});


document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cartItems');
  const clearCartButton = document.getElementById('clearCartButton');
  const totalSumContainer = document.getElementById('totalSumContainer');
  let totalSum = 0;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to update the cart display
  function updateCartDisplay() {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';

      cart.forEach((item, index) => {
        let totalPricePerItem = item.price * item.quantity;

        const itemElement = document.createElement('li');
        itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        itemElement.innerHTML = `
        <div class="row align-items-center">
          <div class="col-sm-2 col-lg-1">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-4 col-lg-7">
            <h6 class="my-0">${item.title}</h6>
          </div>
          <div class="col-sm-3 col-lg-2 text-center">
            <button class="btn btn-outline-secondary btn-sm" onclick="changeQuantity(${index}, -1)">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
          <div class="col-sm-3 col-lg-2 text-end">
            <strong>$${totalPricePerItem.toFixed(2)}</strong>
          </div>
        </div>
      `;
        cartItemsContainer.appendChild(itemElement);
        totalSum += totalPricePerItem;
      });
      totalSumContainer.innerHTML = `<strong>Total Sum:</strong> $${totalSum.toFixed(2)}`;
    }
  }

  if (clearCartButton) {
    clearCartButton.addEventListener('click', function () {
      localStorage.removeItem('cart');
      cart = [];
      updateCartDisplay();
    });
  }
  updateCartDisplay();
});

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1); // Remove item if quantity is less than or equal to 0
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }
  updateCartCount()
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector('#viewCartButton .badge').textContent = totalCount;
}

document.addEventListener('DOMContentLoaded', () => {
  const purchasedItemsList = document.getElementById('purchasedItemsList');
  const totalSumContainer = document.getElementById('totalSumContainer');
  let totalSum = 0;

  if (purchasedItemsList) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                  <img src="${item.image}" alt="${item.title}" style="width: 80px; height: auto; margin-right: 20px;">
                  <div>
                      <strong>${item.title}</strong> - Quantity: ${item.quantity}
                  </div>
              </div>
              <span class="price" style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
      `;
      purchasedItemsList.appendChild(li);
      totalSum += item.price * item.quantity;
    });
    totalSumContainer.innerHTML = `<strong>Total Sum:</strong> $${totalSum.toFixed(2)}`;
    localStorage.removeItem('cart');
  }
});


function showToast(message) {
  const toastContainer = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.classList.add('toast', 'show', 'align-items-center', 'text-white', 'bg-dark', 'border-0');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></div>
    </div>
  `;

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Initialize and show the toast with Bootstrap's Toast JavaScript with autohide and delay options
  const bsToast = new bootstrap.Toast(toast, {
    autohide: true,
    delay: 2000 // Hide after 2 seconds
  });
  bsToast.show();

  // Automatically remove the toast after it hides
  toast.addEventListener('hidden.bs.toast', function () {
    toast.remove();
  });
}