import { countryFlags } from "./countries.js";

let randomCountry;
let continentForCountry;
const flagElement = document.getElementById("flag");
const revealButton = document.getElementById("solution-btn");
const restartButton = document.getElementById("restart-btn");
const hintButton = document.getElementById("hint-btn");
const solutionText = document.getElementById("solution");
const hint = document.getElementById("hint");
revealButton.addEventListener("click", () => {
  revealSolution();
});
restartButton.addEventListener("click", () => {
  startNewRound();
});
hintButton.addEventListener("click", () => {
  revealHint();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setRandomCountry() {
  continentForCountry = Object.keys(countryFlags)[getRandomInt(5)];
  randomCountry =
    countryFlags[continentForCountry][getRandomInt(continentForCountry.length)];
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

function revealHint() {
  hint.textContent = continentForCountry;
}

function startNewRound() {
  setRandomCountry();

  solutionText.classList.remove("fade-in");
  solutionText.textContent = "";
  flagElement.classList.add("fade-in");
  flagElement.textContent = randomCountry.flag;
  hint.textContent = "";
  revealButton.hidden = false;
  restartButton.hidden = true;
}
