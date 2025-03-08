const typeAPI = "https://pokeapi.co/api/v2/type/?limit=21";
const offset = 0;
const pokemonAPI =
  "https://pokeapi.co/api/v2/pokemon?limit=150&offset=" + offset;

let types = [];
let pokemons = [];
let finalData = [];

const select = document.querySelector("select");
const pokemonContainer = document.querySelector(".pokemon-container");
const search = document.querySelector("input");
const form = document.querySelector("form");
const resetButton = document.querySelector("#reset");

async function getData(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

getType();

getPokemons();
// getting types from API

async function getType() {
  const response = await getData(typeAPI);
  types = response.results;
  displayTypes(types);
}

// Diplay types

function displayTypes(arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj.name;
    option.innerText = obj.name[0].toUpperCase() + obj.name.slice(1);
    fragment.append(option);
  });
  select.append(fragment);
}

// to get the pokemons

async function getPokemons() {
  const response = await getData(pokemonAPI);
  pokemons = response.results;

  let promises = [];
  pokemons.forEach((obj) => {
    const data = getData(obj.url);
    promises.push(data);
  });
  //    console.log(promises);

  finalData = await Promise.all(promises);
  console.log(finalData);

  displayPokemons(finalData);
}

// display pokemns

function displayPokemons(arr) {
  pokemonContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  arr.forEach(async (obj, idx) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    // card front
    const id = document.createElement("p");
    id.classList.add("id");
    id.innerText = `#${idx + 1}`;

    const image = document.createElement("img");
    image.src = obj.sprites.other.dream_world.front_default;

    const name = document.createElement("p");
    name.innerText = obj.name[0].toUpperCase() + obj.name.slice(1);

    let pokemonType = [];
    // console.log(obj.types.type);

    obj.types.forEach((object) => {
      // object.types.type.name
      pokemonType.push(object.type.name);
    });

    pokemonType = pokemonType.join(", ");

    const type = document.createElement("p");
    type.innerText = pokemonType[0].toUpperCase() + pokemonType.slice(1);

    cardFront.append(id, image, name, type);

    // switch statements for card colors

    switch (true) {
      case pokemonType.includes("grass"):
        cardFront.style.backgroundColor = "#a0cf59";
        cardBack.style.backgroundColor = "#a0cf59";
        break;
      case pokemonType.includes("fire"):
        cardFront.style.backgroundColor = "#fd842f";
        cardBack.style.backgroundColor = "#fd842f";
        break;
      case pokemonType.includes("water"):
        cardFront.style.backgroundColor = "#4f98c7";
        cardBack.style.backgroundColor = "#4f98c7";
        break;
      case pokemonType.includes("bug"):
        cardFront.style.backgroundColor = "#79a449";
        cardBack.style.backgroundColor = "#79a449";
        break;
      case pokemonType.includes("normal"):
        cardFront.style.backgroundColor = "#a9b0b3";
        cardBack.style.backgroundColor = "#a9b0b3";
        break;
      case pokemonType.includes("poison"):
        cardFront.style.backgroundColor = "#bd86cc";
        cardBack.style.backgroundColor = "#bd86cc";
        break;
      case pokemonType.includes("electric"):
        cardFront.style.backgroundColor = "#efd73f";
        cardBack.style.backgroundColor = "#efd73f";
        break;
      case pokemonType.includes("ground"):
        cardFront.style.backgroundColor = "#f7e049";
        cardBack.style.backgroundColor = "#f7e049";
        break;
      case pokemonType.includes("fairy"):
        cardFront.style.backgroundColor = "#fdbdea";
        cardBack.style.backgroundColor = "#fdbdea";
        break;
      case pokemonType.includes("psychic"):
        cardFront.style.backgroundColor = "#f46ebd";
        cardBack.style.backgroundColor = "#f46ebd";
        break;
      case pokemonType.includes("rock"):
        cardFront.style.backgroundColor = "#a8922c";
        cardBack.style.backgroundColor = "#a8922c";
        break;
      case pokemonType.includes("ghost"):
        cardFront.style.backgroundColor = "#826aa8";
        cardBack.style.backgroundColor = "#826aa8";
        break;
      case pokemonType.includes("fighiting"):
        cardFront.style.backgroundColor = "#d76f2e";
        cardBack.style.backgroundColor = "#d76f2e";
        break;
      case pokemonType.includes("ice"):
        cardFront.style.backgroundColor = "#5ac7e8";
        cardBack.style.backgroundColor = "#5ac7e8";
        break;
    }

    // card back

    let backName = name.innerText;

    cardBack.append(backName);

    let abilities = [];

    obj.abilities.forEach((object) => {
      abilities.push(object.ability.name);
    });

    abilities = abilities.join(",");

    const ability = document.createElement("p");
    ability.innerText = abilities;

    cardBack.append(ability);

    cardInner.append(cardFront, cardBack);
    card.append(cardInner);
    fragment.append(card);
  });
  pokemonContainer.append(fragment);
  // console.log(pokemonContainer);
}

// Searching with input

search.addEventListener("keyup", (e) => {
  let filteredData = [];
  let input = e.target.value;
  input = input.toLowerCase();

  filteredData = finalData.filter((obj) => {
    return obj.name.includes(input);
  });
  displayPokemons(filteredData);
});

// searching with select

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (select.value === "all") {
    displayPokemons(finalData);
    return;
  }
  let filteredData = [];

  filteredData = finalData.filter((obj) => {
    let pokemonType = [];
    obj.types.forEach((object) => {
      pokemonType.push(object.type.name);
    });
    // console.log(pokemonType,select.value);

    return pokemonType.includes(select.value);
  });
  //   console.log(filteredData);

  displayPokemons(filteredData);
});

// reset button

resetButton.addEventListener("click", () => {
  search.value = "";
  search.innerText = "";
  displayPokemons(finalData);
});
