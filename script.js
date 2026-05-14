import { countryFlags } from "./countries.js";

const countriesEurope = countryFlags.europe;
const countriesAmerica = countryFlags.americas;
const countriesAsia = countryFlags.asia;
const countriesAfrica = countryFlags.africa;
const countriesOceana = countryFlags.oceania;
const countryCount =
  countriesAfrica.length +
  countriesAmerica.length +
  countriesAsia.length +
  countriesEurope.length +
  countriesOceana.length;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomCountry;
const flagElement = document.getElementById("flag");
const revealButton = document.getElementById("reveal-btn");
const restartButton = document.getElementById("restart-btn");
revealButton.addEventListener("click", () => {
  revealSolution();
});
restartButton.addEventListener("click", () => {
  startNewRound();
});
const solutionText = document.getElementById("solution");

function getRandomCountry() {
  const randomContinent = Object.keys(countryFlags)[getRandomInt(5)];
  console.log("continent", randomContinent);

  randomCountry =
    countryFlags[randomContinent][getRandomInt(randomContinent.length)];
  console.log(randomCountry);
}

getRandomCountry();
flagElement.textContent = randomCountry.flag;
console.log(randomCountry);

function revealSolution() {
  solutionText.textContent = randomCountry.name;
  revealButton.hidden = true;
  restartButton.hidden = false;
}

function startNewRound() {
  getRandomCountry();
  console.log("random new", randomCountry);

  solutionText.textContent = "";
  flagElement.textContent = randomCountry.flag;
  revealButton.hidden = false;
  restartButton.hidden = true;
}
