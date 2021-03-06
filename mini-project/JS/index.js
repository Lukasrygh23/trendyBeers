'use strict';

let beerDiv = document.querySelector('#beerList');
let getAll = document.querySelector('#getAllBtn');
let getById = document.querySelector('#getIdBtn');
let beerId = document.querySelector('#beerId');

console.log(getAll.innerHTML);

const getBeers = () => {
    //fetch(`Whatever Kieran makes getAll to`).then((response => {
    fetch(`http://localhost:6969/beer/getAll`).then((response) => {
        if(response.status !== 200){
            console.error(response.status);
            return;
        }
        response.json().then((data) => {
            clearDiv();
            for(let object of data){
                createData(object);
            };
        });
    });
};

const getBeerId = (id) => {
    //fetch(`Whatever Kieran makes getId map to`).then((response => {}
    fetch(`http://localhost:6969/beer/get/:id`).then((response) => {
        if(response.status !== 200){
            console.error(response.status);
            return;
        }
        response.json().then((data) => {
            clearDiv();
            console.log(data[0]);
            createData(data[0]);
        });
    });
    
}

const deleteBeer = (id) => {
    console.log(id);
    fetch(`http://localhost:6969/beer/delete/:id`).then((response) => {
        if (response.status !== 202) {
            console.error(response.status);
            return;
        };
        console.log(response);
    });
}





const clearDiv = () => {
    beerDiv.innerHTML = "<h3> List of Beers </h3>"
}

const createData = (data) => {
    
    let name = document.createElement('h2');
    let tagline = document.createElement('h3');
    let description = document.createElement('p');
    let divContainer = document.createElement('div');
    let image = document.createElement('img');
    let deleteBtn = document.createElement('button');

    name.innerText = data.name;
    tagline.innerText = data.tagline;
    description.innerText = data.description;
    image.src = data.image_url;
    image.style.width = "100px"; 
    deleteBtn.classList = "btn btn-danger mb-3"
    deleteBtn.innerText = "Delete Beer"

    deleteBtn.addEventListener('click', function(){
        deleteBeer(data.id);
    })

    divContainer.classList = "container";
    divContainer.appendChild(name);
    divContainer.appendChild(tagline);
    divContainer.appendChild(description);
    divContainer.appendChild(image);
    divContainer.appendChild(deleteBtn);

    beerDiv.appendChild(divContainer);
}

getAll.addEventListener('click', getBeers);
getById.addEventListener('click', function() {
    let id = beerId.value;
    console.log(id);
    getBeerId(id);
})
