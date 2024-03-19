/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function validateForm() {
    var name = document.getElementById("inputName").value;
    var email = document.getElementById("inputEmail").value;
    var adress = document.getElementById("inputAddress").value;
    var city = document.getElementById("inputCity").value;
    var zip = document.getElementById("inputZip").value;
    var Phone = document.getElementById("inputPhone").value;


    if (name.length() < 2 || name.lenght() > 50) {
        alert("För få/många tecken.");
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Vänligen ange en giltig e-postadress.");
        return false;
    }

    if (email.length() > 50)
        alert("För många tecken, max 50")

    if (Phone)

    if (address.trim() === "") {
        alert("Vänligen ange din adress.");
        return false;
    }

    if (city.trim() === "") {
        alert("Vänligen ange din stad.");
        return false;
    }

    var zipRegex = /^[0-9]{5}$/;
    if (!zipRegex.test(zip)) {
        alert("Vänligen ange ett giltigt postnummer (5 siffror).");
        return false;
    }

    return true;
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
    btn.href = "#";
    btn.textContent = "Add to cart";
      
  
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(btn);
  
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
  
  
    const card = document.querySelector('#products');
    card.appendChild(cardDiv);
  }