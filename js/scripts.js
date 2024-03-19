/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function validateForm() {
    var name = document.getElementById("inputName").value;
    var email = document.getElementById("inputEmai").value;
    var adress = document.getElementById("inputAddress").value;
    var city = document.getElementById("inputCity").value;
    var zip = document.getElementById("inputZip").value;
    var Phone = document.getElementById("inputPhone").value;


    if (name.lenght() < 2 || name.lenght() > 50) {
        alert("För få/många tecken.");
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Vänligen ange en giltig e-postadress.");
        return false;
    }

    if (email.lenght() > 50)
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
