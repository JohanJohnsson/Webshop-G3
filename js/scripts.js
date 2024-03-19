/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function validateForm() {
    let name = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmai").value;
    let adress = document.getElementById("inputAddress").value;
    let city = document.getElementById("inputCity").value;
    let zip = document.getElementById("inputZip").value;
    let Phone = document.getElementById("inputPhone").value;

    let isValid = true;

    // Validera namn
    if (name.length < 2 || name.length > 50) {
        document.getElementById("nameError").innerText = "Namnet måste vara mellan 2 och 50 tecken långt.";
        isValid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    // Validera e-postadress
    if (!email.includes("@") || email.length > 50) {
        document.getElementById("emailError").innerText = "Ogiltig e-postadress.";
        isValid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    // Validera adress
    if (address.length < 2 || address.length > 50) {
        document.getElementById("addressError").innerText = "Adressen måste vara mellan 2 och 50 tecken lång.";
        isValid = false;
    } else {
        document.getElementById("addressError").innerText = "";
    }

    // Validera ort
    if (city.length < 2 || city.length > 50) {
        document.getElementById("cityError").innerText = "Ortnamnet måste vara mellan 2 och 50 tecken långt.";
        isValid = false;
    } else {
        document.getElementById("cityError").innerText = "";
    }

    // Validera postnummer
    if (zip.length !== 5 || isNaN(zip)) {
        document.getElementById("zipError").innerText = "Ogiltigt postnummer. Exakt 5 siffror krävs.";
        isValid = false;
    } else {
        document.getElementById("zipError").innerText = "";
    }

    // Validera telefonnummer
    if (!phone.match(/^[0-9()\-\s]{1,50}$/)) {
        document.getElementById("phoneError").innerText = "Ogiltigt telefonnummer.";
        isValid = false;
    } else {
        document.getElementById("phoneError").innerText = "";
    }

    return isValid;
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
  
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("my-2");
    cardDiv.classList.add("col-4");
    cardDiv.style.width = "18rem";
  
    const img = document.createElement("img");
    img.classList.add("card-img-top");              
    img.src = image;
    img.alt = `image describing ${title}`;
    img.style.height = "300px";
  
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
    cardPrice.classList.add("text-success");  
    cardPrice.textContent = price;
  
    const btn = document.createElement("a");
    btn.classList.add("btn", "btn-dark", "mt-auto");
    btn.id = "addToCartId" + id;
    btn.href = "#";
    btn.textContent = "Buy";
      
  
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(btn);
  
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
  
  
    const card = document.querySelector('#products');
    card.appendChild(cardDiv);
  }