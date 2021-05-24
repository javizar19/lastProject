
let booksJSON = [];

function init(){
    getEvents();
};


//para las figuras la función getFigures y pintarListaFigura te las pinta en el html gracias a getfigures
function getEvents() {
    fetch('./data/events.json')
        .then(response => response.json())
        .then((collection) => {
            console.log("name", collection.nameCollection);
            pintarListaFiguras(collection.figures);
             });
}

// Arrow function
const pintarListaFiguras = (listaFiguras) => {
    const container = document.getElementById("list-events");
            for (let event of listaFiguras){
                container.innerHTML += `
                <div class="card" style="width: 18rem;">
                <img src="./img/${event.img}" class="card-img-top" alt="imagen">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <a href="#" class="btn btn-primary">Click and buy</a>
                </div>
            </div>
            `
            }

};


init();