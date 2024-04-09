const form = document.getElementById("form");
const btnDelete = document.getElementById("btn-delete");
const nameInput = document.getElementById("name");
const main = document.querySelector("main");
const counterDisplay = document.getElementById("counter");

const NAME_INPUT_MEMORY = "yourName";
let dateName = [];

class Utente {
  constructor(name) {
    this.name = name;
  }
}
const formEvent = form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUtente = new Utente(nameInput.value);
  dateName.push(newUtente);
  localStorage.setItem(NAME_INPUT_MEMORY, JSON.stringify(dateName));
  console.log("salvato");
  createCard(newUtente);
  form.reset();
});

btnDelete.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
  localStorage.removeItem(NAME_INPUT_MEMORY);
  dateName = [];
  console.log("eliminate tutte le card");
});

const createCard = (newUtente) => {
  const card = document.createElement("div");
  card.classList.add("card", "mt-3");
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card-body", "text-center");
  let textCard = document.createElement("p");
  textCard.innerText = newUtente.name;
  card.appendChild(cardDiv);
  cardDiv.appendChild(textCard);
  main.appendChild(card);
};
let sessionContinue = () => {
  const cardStorage = localStorage.getItem("yourName");
  if (cardStorage) {
    const cardSessione = JSON.parse(cardStorage);
    dateName = cardSessione;
    dateName.forEach((cardGenerate) => createCard(cardGenerate));
  }
};
let counterValue = 0;
const COUNTER_MEMORY = "counter";

let createCounter = () => {
  counterValue++;
  counterDisplay.textContent = counterValue;
  sessionStorage.setItem(COUNTER_MEMORY, counterValue);
};

let continueCounter = () => {
  const storedCounter = sessionStorage.getItem(COUNTER_MEMORY);
  if (storedCounter !== null) {
    counterValue = JSON.parse(storedCounter);
    counterDisplay.textContent = counterValue;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  setInterval(createCounter, 1000);
  continueCounter();
  sessionContinue();
});
