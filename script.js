import { countryFlags } from "./countries.js";

// const countriesEurope = countryFlags.europe;
// const countriesAmerica = countryFlags.americas;
// const countriesAsia = countryFlags.asia;
// const countriesAfrica = countryFlags.africa;
// const countriesOceana = countryFlags.oceania;
// const countryCount =
//   countriesAfrica.length +
//   countriesAmerica.length +
//   countriesAsia.length +
//   countriesEurope.length +
//   countriesOceana.length;

let randomCountry;
const flagElement = document.getElementById("flag");
const revealButton = document.getElementById("reveal-btn");
const restartButton = document.getElementById("restart-btn");
const solutionText = document.getElementById("solution");
revealButton.addEventListener("click", () => {
  revealSolution();
});
restartButton.addEventListener("click", () => {
  startNewRound();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setRandomCountry() {
  const randomContinent = Object.keys(countryFlags)[getRandomInt(5)];

  randomCountry =
    countryFlags[randomContinent][getRandomInt(randomContinent.length)];
}

setRandomCountry();
flagElement.textContent = randomCountry.flag;

function revealSolution() {
  solutionText.classList.add("fade-in");
  flagElement.classList.remove("fade-in");
  solutionText.textContent = randomCountry.name;
  revealButton.hidden = true;
  restartButton.hidden = false;
}

function startNewRound() {
  setRandomCountry();

  solutionText.classList.remove("fade-in");
  solutionText.textContent = "";
  flagElement.classList.add("fade-in");
  flagElement.textContent = randomCountry.flag;
  revealButton.hidden = false;
  restartButton.hidden = true;
}
