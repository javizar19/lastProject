const containerDiv = document.querySelector('#list-events');
let eventSelect = document.querySelector("#filtrar-estrellas");
const buscarBtn = document.querySelector("#search-btn");
let eventXML = "";

window.onload = function () {
    cargarXMLEvent();
    buscarBtn.addEventListener("click", (event) => {
        filtrarEvents();
    });
};

const cargarXMLEvent = () => {
    fetch("./data/hoteles.xml")
        .then(response => response.text())
        .then(texto => (new window.DOMParser()).parseFromString(texto, "text/xml"))
        .then(datos => {
            eventXML = datos;
            pintaEvents(eventXML.querySelectorAll('hotel'))
        })
        .catch(Error => {
            alert("Archivo no encontrado");
            console.log(Error);
        });
};


const pintaEvents = (listaEvents) => {
    containerDiv.innerHTML = "";
    listaEvents.forEach(event => {
        let nombre = event.querySelector("nombre").textContent;
        let descripcion = event.querySelector("descripcion").textContent;
        let estrellas = event.querySelector("estrellas").textContent;
        let comentarios = event.querySelector("comentarios").textContent;
        let destacado = event.getAttribute("destacado");
        let puntuacion = event.querySelector("puntuacion").textContent;
        let img = event.querySelector("fotoPortada").textContent;
        let municipio = event.querySelector("municipio").textContent;
        let servicios = event.querySelector("servicios").textContent;

        containerDiv.innerHTML += pintaEventCard({
            nombre,
            descripcion,
            estrellas,
            comentarios,
            destacado,
            img,
            municipio,
            servicios,
            puntuacion
        });
    })
}


const pintaEventCard = (event) => {
    return `
                    <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="./img/${event.img}" alt="Card image cap" style="width:286px height:120px;height: 210px;">
                        <div class="card-body">
                            <h5 class="card-title">${event.nombre}</h5>
                            <p class="card-text">${event.descripcion}</p>
                            <a href="#" class="btn btn-primary">Click and buy</a>
                         </div>
                    </div>
    `
}


const filtrarEvents = () => {
    let eventSeleccionado = eventSelect.options[eventSelect.selectedIndex].value;
    if(eventXML!=""){
        const listaEvents = eventXML.querySelectorAll('hotel');
        let listaFiltrada=[];
        listaEvents.forEach(event => {
            if (event.querySelector("estrellas").textContent == eventSeleccionado || eventSeleccionado==""){
                listaFiltrada.push(event);
            }
        });
        pintaEvents(listaFiltrada);
    };
};