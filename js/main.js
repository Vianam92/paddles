"use strict";

let data = [];
let prefers = [];

//me traje los datos y lo meti en un array
const getData = () => {
  fetch("./data/palettes.json")
    .then((response) => response.json())
    .then((paleta) => {
      data = paleta.palettes;
      console.log(data);
      paintPaleta(data);
    });
};

//Pinto mis paletas
const paintPaleta = (paletes) => {
  let html = "";
  for (const palete of paletes) {
    html += `<div class="js-section-text">
    <h3 class="texto">${palete.name} from ${palete.from}</h3>
    <input type="checkbox" class="js-mark mark" data-id ="${palete.id}"></div>`;
    for (const color of palete.colors) {
      html += `<div class="color__item js-div-btn" style="background-color:#${color}" data-id ="${palete.id}"></div>`;
    }
  }
  document.querySelector(".js-container").innerHTML = html;
  setInLocalStorge();
  eventListener();
  eventSearch();
};

//handler

const handlerFavorite = (eve) => {
  const paleteId = eve.target.dataset.id;
  //buscar en favorite para encontrar si esta la paleta
  let foundId = prefers.find((item) => item.id === paleteId);
  if (foundId === undefined) {
    //busco en data para econtrar la paleta
    let foundOtherId = data.find((item) => item.id === paleteId);
    //si no esta la agrego
    prefers.push({
      id: foundOtherId.id,
      name: foundOtherId.name,
      colors: foundOtherId.colors,
    });
    //y si esta no hago nada
  } else {
    foundId;
  }
};

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
  const elementBtn = document.querySelectorAll(".js-mark");
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

//
const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("data");
  if (localStorageData !== null) {
    cart = JSON.parse(localStorageData);
    paintPaleta();
  }
};

getData();
paintPaleta(data);
