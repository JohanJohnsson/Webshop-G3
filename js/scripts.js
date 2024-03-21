/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener('click', function(event) {
      event.preventDefault();

      removeAlerts();

        const inputName = document.getElementById('inputName').value.trim();
        const inputEmail = document.getElementById('inputEmail').value.trim();
        const inputPhone = document.getElementById('inputPhone').value.trim();
        const inputAddress = document.getElementById('inputAddress').value.trim();
        const inputCity = document.getElementById('inputCity').value.trim();
        const inputZip = document.getElementById('inputZip').value.trim();
        let isValid = true;

        // Regular expression to match only letters
        const onlyLettersRegex = /^[A-Za-z\s]{2,50}$/;
        const containsAtRegex = /@/;
        const phoneRegex = /^[\d\s()-]{0,50}$/;
        const onlyNumbersRegex = /[0-9]/;
        

        // Check if the name field is between 2 and 50 characters and contains only letters
        if (!onlyLettersRegex.test(inputName)) {
            displayAlert("Name must be between 2 and 50 characters long and contain only letters.", document.getElementById('inputName'));
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

        if (!inputZip.length === 5 || !onlyNumbersRegex.test(inputZip)) {
          displayAlert('Postkoden får endast vara 5 siffror', document.getElementById('inputZip'));
          isValid = false;
        }

        if (isValid) {
          window.location.href = 'purchaseConfirmationPage.html'; // Redirect the user
      }

        // You can add additional custom validation logic here as needed
    });
});

function displayAlert(message, inputField) {
    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-danger');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;

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
        try{
          createCard(item);
    } catch (error) {
  
    }
    });
  });



  function createCard(product) {
    const id = product.id;
    const title = product.title;
    const price = "Price: " + product.price + "$";
    //const category = product.category
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
    btn.onclick = function() {
        // Store product details in localStorage for retrieval on the next page
        localStorage.setItem('selectedProduct', JSON.stringify({id, title, price, description, image}));
        // Redirect to the product details page
        window.location.href = 'order-form.html';
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

  
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the selected product details
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (product) {
        // Assuming you have placeholders for product details
        document.getElementById('productImgElement').src = product.image;
        document.getElementById('ProductNameElement').textContent = product.title;
        document.getElementById('descriptionElement').textContent = product.description;
        document.getElementById('priceElement').textContent = product.price;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the selected product details
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (product) {
        // Select the product details container
        const container = document.getElementById('orderdItemContainer');
        
        // Update product details only within the container
        container.querySelector('#productImgElement').src = product.image;
        container.querySelector('#ProductNameElement').textContent = product.title;
        container.querySelector('#priceElement').textContent = product.price;
    }
});


  
  