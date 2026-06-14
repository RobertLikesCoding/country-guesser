import { countriesList } from "./countries.js";

const scoreDisplay = document.getElementById("score");
const nextRound = document.getElementById("next-round-btn");
const flagElement = document.getElementById("flag");
const restartButton = document.getElementById("next-round-btn");
const countryChoices = document.getElementById("country-choices");
const optionButtons = [...document.getElementsByClassName("option")];

let score = 0;
let remainingCountries = { ...countriesList };
let randomCountry;
let currentContinent;
let countryToGuessIndex;
let countryOptions = [];

optionButtons.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    handleCountrySelection(event, countryOptions);
  });
});
restartButton.addEventListener("click", () => {
  startNewRound();
});

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
  while (countries.length < 3) {
    currentContinent = Object.keys(remainingCountries)[getRandomInt(5)];

    const randomCountry =
      remainingCountries[currentContinent][
        getRandomInt(currentContinent.length)
      ];

    if (countries.some((c) => c.country === randomCountry)) {
      return;
    } else {
      countries.push({
        continent: currentContinent,
        country: randomCountry,
      });
    }
  }
  return countries;
}

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

function startNewRound() {
  optionButtons.forEach((btn) => {
    btn.classList.remove("disabled", "solution");
  });
  initializeRound();

  flagElement.classList.add("fade-in");
  nextRound.hidden = true;
}

function increaseScore() {
  score = score + 5;
  scoreDisplay.textContent = score;
}

function decreaseScore() {
  if (score == 0) return;

  score = score - 2;
  if (score < 0) {
    score = 0;
  }

  scoreDisplay.textContent = score;
}

function initializeRound() {
  countryOptions[countryToGuessIndex] &&
    updateRemainingCountries(countryOptions[countryToGuessIndex]);
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
    console.log("correct");

    increaseScore();
    // highlight correct answer

    revealSolution(countryToGuessIndex);
  } else {
    console.log("false");
    decreaseScore();
    // highlight correct answer
    revealSolution(countryToGuessIndex);
    // start reset score to 0
  }
}

function updateRemainingCountries(solution) {
  console.log("before", remainingCountries, solution);
  if (!countryOptions || !currentContinent) return;

  const countryIndex = remainingCountries[solution.continent].findIndex(
    (c) => c === solution.country,
  );

  remainingCountries[solution.continent].splice(countryIndex, 1);
  console.log("after", remainingCountries);
}
