'use strict';

let beerDiv = document.querySelector('#beerList');
let getAll = document.querySelector('#getAllBtn');
let getById = document.querySelector('#getIdBtn');
let beerId = document.querySelector('#beerId');

console.log(getAll.innerHTML);

const getBeers = () => {
    fetch(`https://api.punkapi.com/v2/beers`).then((response) => {
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
    fetch(`https://api.punkapi.com/v2/beers/${id}`).then((response) => {
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
    // fetch(`delete URI`).then((response) => {
    //     if(response.status !== 202){
    //         console.error(response.status);
    //         return;
    //     };
    //     console.log(response);
    // })
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
