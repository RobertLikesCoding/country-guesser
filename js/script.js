import { countriesList } from "./countries.js";
import { useCountries } from "./gameFunctions.js";
import { getRandomInt } from "./utils.js";

const { getCountryOptions, updateRemainingCountries, resetRemainingCountries } =
  useCountries();

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const flagElement = document.getElementById("flag");
const startButton = document.getElementById("start-btn");
const nextRoundButton = document.getElementById("next-round-btn");
const countryChoices = document.getElementById("country-choices");
const optionButtons = [...document.getElementsByClassName("option")];
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const scoreSection = document.getElementById("score-section");

let score = 0;
let lives = 3;
let randomCountry;
let currentContinent;
let countryToGuessIndex;
let countryOptions = [];

optionButtons.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    handleCountrySelection(event, countryOptions);
  });
});
nextRoundButton.addEventListener("click", () => {
  startNextRound();
});
startButton.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  nextRound.hidden = true;
  optionButtons.forEach((btn) => {
    btn.classList.remove("disabled", "solution");
  });

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  scoreSection.classList.replace("hidden", "flex-between");
  scoreDisplay.classList.add("fade-in");
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.classList.add("fade-in");
  livesDisplay.textContent = `Lives: ${lives}`;

  initializeRound();
});

initializeRound();

function revealSolution(solutionIndex) {
  const solutionButton = optionButtons[solutionIndex];

  // disable button interaction for optionButtons
  optionButtons.forEach((opt) => {
    if (opt === solutionButton) return;

    opt.classList.add("disabled");
  });

  // highlight solution
  solutionButton.classList.add("solution");

  flagElement.classList.remove("fade-in");
  nextRound.hidden = false;
}

function startNextRound() {
  optionButtons.forEach((btn) => {
    btn.classList.remove("disabled", "solution");
  });
  initializeRound();

  flagElement.classList.add("fade-in");
  nextRound.hidden = true;
}

function increaseScore() {
  score += 5;
  scoreDisplay.textContent = `Score: ${score}`;
}

function decreaseScore() {
  if (score == 0) return;

  score -= 2;
  if (score < 0) {
    score = 0;
  }

  scoreDisplay.textContent = `Score: ${score}`;
}

function decreaseLives() {
  lives--;
  livesDisplay.textContent = `Lives: ${lives}`;

  if (lives <= 0) {
    gameOver();
  }
}

function gameOver() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  scoreSection.classList.replace("flex-between", "hidden");
  endScreen.append(startButton);

  score = 0;
  lives = 3;
  resetRemainingCountries();
  countryOptions = [];
}

function initializeRound() {
  const solution = countryOptions[countryToGuessIndex];
  solution && updateRemainingCountries(solution);
  countryOptions = getCountryOptions();

  countryToGuessIndex = getRandomInt(3);

  optionButtons.forEach((btn, index) => {
    const country = countryOptions[index].country;
    btn.textContent = country.name;
  });

  flagElement.textContent = countryOptions[countryToGuessIndex].country.flag;
}

function handleCountrySelection(event, countryOptions) {
  const selectedCountry = event.target.textContent;

  if (selectedCountry === countryOptions[countryToGuessIndex].country.name) {
    increaseScore();

    revealSolution(countryToGuessIndex);
  } else {
    decreaseScore();
    decreaseLives();
    // highlight correct answer
    revealSolution(countryToGuessIndex);
  }
}
