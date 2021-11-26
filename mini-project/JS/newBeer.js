const { json } = require("body-parser");

let nameField = document.querySelector('#newName');
let tagField = document.querySelector('#newTagline');
let descField = document.querySelector('#newDesc');
let brewedField = document.querySelector('#newBrewed');
let imageField = document.querySelector('#newImage');
let createBeer = document.querySelector('#submitBeer');

const postBeer = (data) => {
    console.log(data);
    fetch(`http://localhost:6969/beer/create`, {
         method: 'POST',
         headers: {
             "Content-type": "application/json"
        },
        body: JSON.stringify(data),
     }).then((response) => {
         console.log(response);
     })
};

createBeer.addEventListener('click', function() {
    let beer = {
        name : nameField.value,
        tagline: tagField.value,
        description: descField.value,
        brewed_date: brewedField.value,
        image_url: imageField.value,
    };

    console.log(beer);
    postBeer(beer);
})