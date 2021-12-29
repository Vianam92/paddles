"use strict";

let data = [];
let prefers = [];

//me traje los datos y lo meti en un array
const getData = () => {
  fetch("./data/palettes.json")
    .then((response) => response.json())
    .then((paleta) => {
      data = paleta.palettes;
      paintPaleta(data);
    });
};

//Pinto mis paletas
const paintPaleta = (paletes) => {
  const divContainer = document.querySelector(".js-container");
  divContainer.textContent = "";
  for (const palete of paletes) {
    //create name palette
    const newTitle = document.createElement("h3");
    newTitle.className = "text";
    newTitle.textContent = `${palete.name} from ${palete.from}`;
    //create palette container
    const newContainer = document.createElement("ul");
    newContainer.className = "list-container";
    newContainer.id = palete.id;
    for (const color of palete.colors) {
      //palette colors
      const newListColor = document.createElement("li");
      newListColor.className = "color__item";
      newListColor.style.backgroundColor = `#${color}`;
      newContainer.appendChild(newListColor);
    }
    divContainer.appendChild(newTitle);
    divContainer.appendChild(newContainer);
    //document.querySelector(".").innerHTML = html;
  }
  eventListener();
  eventSearch();
};

//handler

const handlerFavorite = (eve) => {
  //creo una const que me va a guardar mi id que esta en el ul.
  const paleteId = eve.currentTarget.id;
  const currentTarget = eve.currentTarget;
  //buscar en favorite para encontrar si esta la paleta
  let foundId = prefers.find((item) => item.id === paleteId);
  //como prefers esta vacia va a dar undefine y entra en el if.
  if (foundId === undefined) {
    //busco en data para encontrar la paleta
    let foundOtherId = data.find((item) => item.id === paleteId);
    console.log("entra al primer if");
    //si no esta la agrego
    prefers.push({
      id: foundOtherId.id,
      name: foundOtherId.name,
      colors: foundOtherId.colors,
    });
    console.log(prefers);
    //evaluando agregar o no a favoritos
    currentTarget.firstChild.classList.add("fas");
    currentTarget.firstChild.classList.add("fa-heart");
    setInLocalStorge();
    //y si esta no hago nada
  } else if(foundId !== undefined){
    console.log("entra al else");
    currentTarget.firstChild.classList.remove("fas");
    currentTarget.firstChild.classList.remove("fa-heart");
    const prefersFound = prefers.find((item) => item.id === paleteId);
    console.log(prefersFound);
    prefers.splice(prefersFound,1);
    
    setInLocalStorge();
  }
  paintFavIcon();
};

//paint favorite
const paintFavIcon = () => {
  const divContainer = document.querySelector(".js-container");
  const containerUl = document.querySelector(".list-container");
  //containerUl.firstChild.className = ".color__item fas fa-heart";
};

//busqueda del valor del input en data
function handlerSearch() {
  //obtengo el valor del input
  const inputElement = document.querySelector(".js-input");
  //creo una variable con el valor del value
  let userSearch = inputElement.value;
  //buscar en mi data
  const fillValue = data.filter((item) =>
    item.name.toLowerCase().includes(userSearch)
  );
  paintPaleta(fillValue);
  eventListener();
}

//listener palette
const eventListener = () => {
  const elementBtn = document.querySelectorAll(".list-container");
  for (const item of elementBtn) {
    item.addEventListener("click", handlerFavorite);
  }
};

//listener input
const eventSearch = () => {
  const inputElement = document.querySelector(".js-input");
  inputElement.addEventListener("keyup", handlerSearch);
};

//local Storage
//guardo en el local
const setInLocalStorge = () => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem("data", stringifyData);
};

// lo recupero
const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("data");
  if (localStorageData !== null) {
    data = JSON.parse(localStorageData);
  }
};

getData();
getFromLocalStorage();
//paintPaleta(data);
