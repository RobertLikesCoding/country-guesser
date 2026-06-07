import { countriesList } from "./countries.js";

const scoreDisplay = document.getElementById("score");
const nextRound = document.getElementById("next-round-btn");
const flagElement = document.getElementById("flag");
const restartButton = document.getElementById("next-round-btn");
const countryChoices = document.getElementById("country-choices");
restartButton.addEventListener("click", () => {
  startNewRound();
});

let score = 0;
let randomCountry;
let continentForCountry;
let countryToGuessIndex;

startGame();

export function startGame() {
  const startButton = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const scoreSection = document.getElementById("score-section");
  startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    scoreSection.classList.remove("hidden");
    scoreDisplay.textContent = score;
  });

  initializeRound();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCountryOptions() {
  const countries = [];
  // NO DUPLICATES!
  for (let step = 0; step < 3; step++) {
    const continent = Object.keys(countriesList)[getRandomInt(5)];
    const randomCountry =
      countriesList[continent][getRandomInt(continent.length)];
    countries.push(randomCountry);
  }
  return countries;
}

function revealSolution(solutionIndex) {
  // getElements... returns a HTMLCollection so I turn it into an Array
  const options = [...document.getElementsByClassName("option")];
  const solutionButton = options[solutionIndex];

  // disable button interaction for options
  options.forEach((opt) => {
    if (opt === solutionButton) return;

    opt.classList.add("disabled");
  });

  // highlight solution
  solutionButton.classList.add("solution");

  flagElement.classList.remove("fade-in");
  solutionButton.classList.add("correct");
  nextRound.hidden = false;
}

function startNewRound() {
  initializeRound();

  flagElement.classList.add("fade-in");
  flagElement.textContent = randomCountry.flag;
  nextRound.hidden = true;
}

function increaseScore() {
  score = score + 5;
  scoreDisplay.textContent = score;
}

function decreaseScore() {
  if (score == 0) return;

  score = score - 2;
  scoreDisplay.textContent = score;
}

function initializeRound() {
  const options = getCountryOptions();
  const optionButtons = [...document.getElementsByClassName("option")];
  countryToGuessIndex = getRandomInt(3);

  optionButtons.forEach((btn, index) => {
    const country = options[index];
    btn.textContent = country.name;
    btn.addEventListener("click", (event) => {
      handleCountrySelection(event, options);
    });
  });

  flagElement.textContent = options[countryToGuessIndex].flag;
}

function handleCountrySelection(event, options) {
  const selectedCountry = event.target.textContent;

  if (selectedCountry === options[countryToGuessIndex].name) {
    increaseScore();
    // highlight correct answer

    revealSolution(countryToGuessIndex);
  } else {
    decreaseScore();
    // highlight correct answer
    revealSolution();
    // start reset score to 0
    // show restart game button
  }
}
